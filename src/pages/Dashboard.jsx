import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useStore } from '../context/StoreContext';
import { DollarSign, ShoppingBag, Package, TrendingUp, AlertTriangle } from 'lucide-react';

export function Dashboard() {
    const { products, sales } = useStore();

    // Calculate statistics
    const todaySales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        const today = new Date();
        return saleDate.toDateString() === today.toDateString();
    });

    const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.total, 0);
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
    const lowStockProducts = products.filter(p => p.stock < 10);

    const stats = [
        {
            title: 'Vendas Hoje',
            value: todaySales.length,
            icon: ShoppingBag,
            color: 'primary',
        },
        {
            title: 'Receita Hoje',
            value: `R$ ${todayRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: 'success',
        },
        {
            title: 'Total de Produtos',
            value: products.length,
            icon: Package,
            color: 'primary',
        },
        {
            title: 'Estoque Baixo',
            value: lowStockProducts.length,
            icon: AlertTriangle,
            color: 'warning',
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
                <p className="text-slate-400">Visão geral do seu negócio</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:scale-105 transition-transform duration-200">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                                <stat.icon className={`text-${stat.color}-400`} size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">{stat.title}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Sales */}
            <Card>
                <CardHeader>
                    <CardTitle>Vendas Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                    {sales.length === 0 ? (
                        <p className="text-slate-400 text-center py-8">Nenhuma venda realizada ainda</p>
                    ) : (
                        <div className="space-y-4">
                            {sales.slice(0, 5).map((sale) => (
                                <div key={sale.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-white">
                                            {sale.items.length} {sale.items.length === 1 ? 'item' : 'itens'}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            {new Date(sale.date).toLocaleString('pt-BR')}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-emerald-400">R$ {sale.total.toFixed(2)}</p>
                                        <p className="text-xs text-slate-400">{sale.paymentMethod}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && (
                <Card className="border-amber-500/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-400">
                            <AlertTriangle size={20} />
                            Produtos com Estoque Baixo
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {lowStockProducts.map((product) => (
                                <div key={product.id} className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                                    <span className="text-slate-200">{product.name}</span>
                                    <span className="text-amber-400 font-medium">{product.stock} unidades</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
