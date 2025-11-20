import { cn } from '../../lib/utils';

export function Badge({ children, variant = 'default', className }) {
    const variants = {
        default: 'bg-slate-700 text-slate-200',
        primary: 'bg-primary-500/20 text-primary-300 border border-primary-500/30',
        success: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
        warning: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
        danger: 'bg-red-500/20 text-red-300 border border-red-500/30',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
