import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

// Initial sample data
const SAMPLE_PRODUCTS = [
    { id: 1, name: 'Coca-Cola 2L', price: 8.50, cost: 5.00, stock: 50, category: 'Bebidas', barcode: '7894900011111' },
    { id: 2, name: 'Pão Francês', price: 0.50, cost: 0.30, stock: 100, category: 'Padaria', barcode: '7894900022222' },
    { id: 3, name: 'Leite Integral 1L', price: 5.20, cost: 3.80, stock: 30, category: 'Laticínios', barcode: '7894900033333' },
    { id: 4, name: 'Arroz 5kg', price: 28.90, cost: 22.00, stock: 20, category: 'Grãos', barcode: '7894900044444' },
    { id: 5, name: 'Feijão Preto 1kg', price: 8.90, cost: 6.50, stock: 25, category: 'Grãos', barcode: '7894900055555' },
];

export function StoreProvider({ children }) {
    // Load from localStorage or use sample data
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('pdv_products');
        return saved ? JSON.parse(saved) : SAMPLE_PRODUCTS;
    });

    const [sales, setSales] = useState(() => {
        const saved = localStorage.getItem('pdv_sales');
        return saved ? JSON.parse(saved) : [];
    });

    const [cart, setCart] = useState([]);

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('pdv_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('pdv_sales', JSON.stringify(sales));
    }, [sales]);

    // Product Management
    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Date.now(),
        };
        setProducts([...products, newProduct]);
    };

    const updateProduct = (id, updates) => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const adjustStock = (id, quantity) => {
        updateProduct(id, { stock: quantity });
    };

    // Cart Management
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
    const completeSale = (paymentMethod) => {
        const sale = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: cart,
            total: getCartTotal(),
            paymentMethod,
        };

        // Update stock
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                updateProduct(item.id, { stock: product.stock - item.quantity });
            }
        });

        setSales([sale, ...sales]);
        clearCart();

        return sale;
    };

    const value = {
        products,
        sales,
        cart,
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
