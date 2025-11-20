import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load products from Supabase on mount
    useEffect(() => {
        loadProducts();
        loadSales();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('produtos')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Map Supabase fields to our format
            const mappedProducts = data.map(p => ({
                id: p.id,
                name: p.nome,
                price: parseFloat(p.preco),
                cost: parseFloat(p.custo || 0),
                stock: p.estoque,
                category: p.categoria,
                barcode: p.barcode
            }));

            setProducts(mappedProducts);
        } catch (error) {
            console.error('Error loading products:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadSales = async () => {
        try {
            const { data, error } = await supabase
                .from('vendas')
                .select(`
          *,
          itens_venda (*)
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const mappedSales = data.map(s => ({
                id: s.id,
                date: s.created_at,
                total: parseFloat(s.total),
                paymentMethod: s.forma_pagamento,
                items: s.itens_venda.map(item => ({
                    id: item.produto_id,
                    name: item.produto_nome,
                    quantity: item.quantidade,
                    price: parseFloat(item.preco_unitario)
                }))
            }));

            setSales(mappedSales);
        } catch (error) {
            console.error('Error loading sales:', error.message);
        }
    };

    // Product Management
    const addProduct = async (product) => {
        try {
            const { data, error } = await supabase
                .from('produtos')
                .insert([{
                    nome: product.name,
                    barcode: product.barcode,
                    categoria: product.category,
                    preco: product.price,
                    custo: product.cost,
                    estoque: product.stock
                }])
                .select()
                .single();

            if (error) throw error;

            // Add to local state
            const newProduct = {
                id: data.id,
                name: data.nome,
                price: parseFloat(data.preco),
                cost: parseFloat(data.custo || 0),
                stock: data.estoque,
                category: data.categoria,
                barcode: data.barcode
            };

            setProducts([newProduct, ...products]);
            return newProduct;
        } catch (error) {
            console.error('Error adding product:', error.message);
            throw error;
        }
    };

    const updateProduct = async (id, updates) => {
        try {
            const updateData = {};
            if (updates.name !== undefined) updateData.nome = updates.name;
            if (updates.price !== undefined) updateData.preco = updates.price;
            if (updates.cost !== undefined) updateData.custo = updates.cost;
            if (updates.stock !== undefined) updateData.estoque = updates.stock;
            if (updates.category !== undefined) updateData.categoria = updates.category;
            if (updates.barcode !== undefined) updateData.barcode = updates.barcode;

            const { error } = await supabase
                .from('produtos')
                .update(updateData)
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setProducts(products.map(p =>
                p.id === id ? { ...p, ...updates } : p
            ));
        } catch (error) {
            console.error('Error updating product:', error.message);
            throw error;
        }
    };

    const deleteProduct = async (id) => {
        try {
            const { error } = await supabase
                .from('produtos')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error.message);
            throw error;
        }
    };

    const adjustStock = (id, quantity) => {
        updateProduct(id, { stock: quantity });
    };

    // Cart Management (local only - no need to save to DB)
    const addToCart = (product, quantity = 1) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateCartQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            ));
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Sales Management
    const completeSale = async (paymentMethod) => {
        try {
            const total = getCartTotal();

            // Insert sale
            const { data: saleData, error: saleError } = await supabase
                .from('vendas')
                .insert([{
                    total: total,
                    forma_pagamento: paymentMethod
                }])
                .select()
                .single();

            if (saleError) throw saleError;

            // Insert sale items
            const items = cart.map(item => ({
                venda_id: saleData.id,
                produto_id: item.id,
                produto_nome: item.name,
                quantidade: item.quantity,
                preco_unitario: item.price,
                subtotal: item.price * item.quantity
            }));

            const { error: itemsError } = await supabase
                .from('itens_venda')
                .insert(items);

            if (itemsError) throw itemsError;

            // Update stock for each product
            for (const item of cart) {
                const product = products.find(p => p.id === item.id);
                if (product) {
                    await updateProduct(item.id, { stock: product.stock - item.quantity });
                }
            }

            // Add to local sales state
            const newSale = {
                id: saleData.id,
                date: saleData.created_at,
                total: parseFloat(saleData.total),
                paymentMethod: saleData.forma_pagamento,
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            setSales([newSale, ...sales]);
            clearCart();

            return newSale;
        } catch (error) {
            console.error('Error completing sale:', error.message);
            throw error;
        }
    };

    const value = {
        products,
        sales,
        cart,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        completeSale,
        loadProducts,
        loadSales,
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within StoreProvider');
    }
    return context;
}
