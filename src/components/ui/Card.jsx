import { cn } from '../../lib/utils';

export function Card({ children, className, ...props }) {
    return (
        <div
            className={cn(
                'bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 shadow-xl',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className }) {
    return (
        <div className={cn('mb-4', className)}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className }) {
    return (
        <h3 className={cn('text-xl font-semibold text-slate-100', className)}>
            {children}
        </h3>
    );
}

export function CardContent({ children, className }) {
    return (
        <div className={cn('', className)}>
            {children}
        </div>
    );
}
