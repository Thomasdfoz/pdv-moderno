import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Search, Plus, Minus, Trash2, ShoppingCart, CreditCard, Wallet, Smartphone } from 'lucide-react';

export function PDV() {
    const { products, cart, addToCart, updateCartQuantity, removeFromCart, getCartTotal, completeSale } = useStore();
    const [search, setSearch] = useState('');
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Dinheiro');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode.includes(search)
    );

    const handleCheckout = () => {
        if (cart.length === 0) return;
        setIsCheckoutOpen(true);
    };

    const handleCompleteSale = () => {
        completeSale(paymentMethod);
        setIsCheckoutOpen(false);
        setPaymentMethod('Dinheiro');
    };

    const paymentMethods = [
        { name: 'Dinheiro', icon: Wallet },
        { name: 'Cartão', icon: CreditCard },
        { name: 'Pix', icon: Smartphone },
    ];

    return (
        <div className="h-full flex gap-6">
            {/* Products Section */}
            <div className="flex-1 space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Ponto de Venda</h2>
                    <p className="text-slate-400">Adicione produtos ao carrinho</p>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <Input
                                placeholder="Buscar produto por nome ou código..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
                    {filteredProducts.map((product) => (
                        <Card
                            key={product.id}
                            className="hover:scale-105 transition-transform duration-200 cursor-pointer"
                            onClick={() => addToCart(product)}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white mb-1">{product.name}</h3>
                                        <Badge variant="primary" className="text-xs">{product.category}</Badge>
                                    </div>
                                    <div className="bg-primary-500/20 p-2 rounded-lg">
                                        <Plus className="text-primary-400" size={20} />
                                    </div>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-white">R$ {product.price.toFixed(2)}</p>
                                        <p className="text-sm text-slate-400">{product.stock} em estoque</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Cart Sidebar */}
            <div className="w-96 space-y-6">
                <Card className="sticky top-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShoppingCart size={24} />
                            Carrinho
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {cart.length === 0 ? (
                            <div className="text-center py-12 text-slate-400">
                                <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Carrinho vazio</p>
                            </div>
                        ) : (
                            <>
                                {/* Cart Items */}
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {cart.map((item) => (
                                        <div key={item.id} className="bg-slate-800/50 rounded-lg p-3">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <p className="font-medium text-white">{item.name}</p>
                                                    <p className="text-sm text-slate-400">R$ {item.price.toFixed(2)}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 p-0"
                                                >
                                                    <Minus size={14} />
                                                </Button>
                                                <span className="flex-1 text-center font-medium text-white">{item.quantity}</span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 p-0"
                                                >
                                                    <Plus size={14} />
                                                </Button>
                                                <div className="ml-2 font-bold text-white">
                                                    R$ {(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Total */}
                                <div className="border-t border-slate-800 pt-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-lg text-slate-300">Total:</span>
                                        <span className="text-3xl font-bold text-primary-400">
                                            R$ {getCartTotal().toFixed(2)}
                                        </span>
                                    </div>
                                    <Button
                                        variant="success"
                                        className="w-full py-3 text-lg"
                                        onClick={handleCheckout}
                                    >
                                        Finalizar Venda
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Checkout Modal */}
            <Modal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} title="Finalizar Venda">
                <div className="space-y-6">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-sm text-slate-400 mb-1">Total da Venda</p>
                        <p className="text-3xl font-bold text-primary-400">R$ {getCartTotal().toFixed(2)}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-300 mb-3">Forma de Pagamento</p>
                        <div className="grid grid-cols-3 gap-3">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.name}
                                    onClick={() => setPaymentMethod(method.name)}
                                    className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === method.name
                                            ? 'border-primary-500 bg-primary-500/20'
                                            : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                                        }`}
                                >
                                    <method.icon
                                        size={24}
                                        className={`mx-auto mb-2 ${paymentMethod === method.name ? 'text-primary-400' : 'text-slate-400'
                                            }`}
                                    />
                                    <p className={`text-sm font-medium ${paymentMethod === method.name ? 'text-white' : 'text-slate-400'
                                        }`}>
                                        {method.name}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button variant="success" onClick={handleCompleteSale} className="flex-1">
                            Confirmar Venda
                        </Button>
                        <Button variant="outline" onClick={() => setIsCheckoutOpen(false)} className="flex-1">
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
