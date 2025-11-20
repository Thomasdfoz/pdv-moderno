import { cn } from '../../lib/utils';

export function Button({ children, className, variant = 'primary', size = 'md', ...props }) {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg shadow-primary-500/30',
        secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-500',
        success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-lg shadow-emerald-500/30',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg shadow-red-500/30',
        outline: 'border-2 border-slate-600 text-slate-100 hover:bg-slate-800 focus:ring-slate-500',
        ghost: 'text-slate-300 hover:bg-slate-800 hover:text-slate-100',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
