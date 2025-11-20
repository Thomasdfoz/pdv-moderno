import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Search, Calendar, DollarSign, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';

export function Sales() {
    const { sales } = useStore();
    const [search, setSearch] = useState('');
    const [expandedSale, setExpandedSale] = useState(null);

    const filteredSales = sales.filter(sale => {
        const searchLower = search.toLowerCase();
        return (
            sale.paymentMethod.toLowerCase().includes(searchLower) ||
            sale.items.some(item => item.name.toLowerCase().includes(searchLower)) ||
            new Date(sale.date).toLocaleDateString('pt-BR').includes(searchLower)
        );
    });

    const toggleExpand = (saleId) => {
        setExpandedSale(expandedSale === saleId ? null : saleId);
    };

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalSales = sales.length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Histórico de Vendas</h2>
                    <p className="text-slate-400">Visualize todas as transações</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:scale-105 transition-transform duration-200">
                    <CardContent className="flex items-center gap-4 p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                            <ShoppingBag className="text-primary-400" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Total de Vendas</p>
                            <p className="text-2xl font-bold text-white">{totalSales}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:scale-105 transition-transform duration-200">
                    <CardContent className="flex items-center gap-4 p-6">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <DollarSign className="text-emerald-400" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Receita Total</p>
                            <p className="text-2xl font-bold text-white">R$ {totalRevenue.toFixed(2)}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <Input
                            placeholder="Buscar por produto, data ou forma de pagamento..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Sales List */}
            <Card>
                <CardContent className="p-0">
                    {filteredSales.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            {sales.length === 0 ? 'Nenhuma venda realizada ainda' : 'Nenhuma venda encontrada'}
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-800">
                            {filteredSales.map((sale) => (
                                <div key={sale.id} className="hover:bg-slate-800/30 transition-colors">
                                    {/* Sale Header */}
                                    <div
                                        className="p-6 cursor-pointer"
                                        onClick={() => toggleExpand(sale.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                                                    <ShoppingBag className="text-primary-400" size={20} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <p className="font-semibold text-white">
                                                            Venda #{sale.id.toString().slice(-6)}
                                                        </p>
                                                        <Badge variant="primary">{sale.paymentMethod}</Badge>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-slate-400">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            {new Date(sale.date).toLocaleString('pt-BR')}
                                                        </span>
                                                        <span>{sale.items.length} {sale.items.length === 1 ? 'item' : 'itens'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-emerald-400">
                                                        R$ {sale.total.toFixed(2)}
                                                    </p>
                                                </div>
                                                {expandedSale === sale.id ? (
                                                    <ChevronUp className="text-slate-400" size={20} />
                                                ) : (
                                                    <ChevronDown className="text-slate-400" size={20} />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Items */}
                                    {expandedSale === sale.id && (
                                        <div className="px-6 pb-6">
                                            <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                                                <p className="text-sm font-medium text-slate-300 mb-3">Itens da Venda:</p>
                                                {sale.items.map((item, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                                                        <div className="flex-1">
                                                            <p className="font-medium text-white">{item.name}</p>
                                                            <p className="text-sm text-slate-400">
                                                                R$ {item.price.toFixed(2)} x {item.quantity}
                                                            </p>
                                                        </div>
                                                        <p className="font-bold text-white">
                                                            R$ {(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
