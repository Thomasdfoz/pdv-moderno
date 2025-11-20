import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, History, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
    { name: 'Dashboard', to: '/', icon: LayoutDashboard },
    { name: 'PDV', to: '/pdv', icon: ShoppingCart },
    { name: 'Produtos', to: '/produtos', icon: Package },
    { name: 'Vendas', to: '/vendas', icon: History },
];

export function Layout({ children }) {
    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30">
                                <BarChart3 className="text-white" size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">PDV Moderno</h1>
                                <p className="text-xs text-slate-400">Sistema de Vendas</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                                        'hover:bg-slate-800 group',
                                        isActive
                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                            : 'text-slate-400'
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon
                                            size={20}
                                            className={cn(
                                                'transition-colors',
                                                isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
                                            )}
                                        />
                                        <span className={cn('font-medium', isActive && 'text-white')}>
                                            {item.name}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
                        <p>v1.0.0 - PDV System</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="h-full p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
