import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export function Modal({ isOpen, onClose, children, className, title }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                className={cn(
                    'relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto',
                    className
                )}
            >
                {title && (
                    <div className="flex items-center justify-between p-6 border-b border-slate-800">
                        <h2 className="text-2xl font-semibold text-slate-100">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-100 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                )}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
