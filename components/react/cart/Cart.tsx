import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useCart } from '@ds0/primitives';
import type { StyledCartProps } from '@ds0/primitives';
const Cart = forwardRef<HTMLDivElement, StyledCartProps>(({ className, variant = 'default', items, onUpdateQuantity, onRemove, onCheckout, title, ...props }, ref) => {
    const { cartProps, total, itemCount } = useCart({ items, onUpdateQuantity, onRemove, onCheckout });
    return (
        <div ref={ref} className={cn('rounded-xl border bg-card', variant === 'sidebar' ? 'w-80' : 'w-full max-w-md', className)} {...props} {...cartProps}>
            <div className="flex items-center justify-between p-4 border-b"><h3 className="font-semibold">{title || 'Cart'}</h3><span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{itemCount}</span></div>
            <div className="divide-y max-h-80 overflow-y-auto">{items.length === 0 ? <div className="p-8 text-center text-sm text-muted-foreground">Your cart is empty</div> : items.map(i => (
                <div key={i.id} className="flex items-center gap-3 p-4">
                    {i.image && <img src={i.image} alt={i.name} className="w-12 h-12 rounded-md object-cover shrink-0" />}
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{i.name}</p><p className="text-xs text-muted-foreground">${i.price.toFixed(2)} × {i.quantity}</p></div>
                    <div className="flex items-center gap-1">{onUpdateQuantity && <><button onClick={() => onUpdateQuantity(i.id, Math.max(0, i.quantity - 1))} className="w-6 h-6 rounded border text-xs hover:bg-accent">−</button><span className="w-6 text-center text-xs">{i.quantity}</span><button onClick={() => onUpdateQuantity(i.id, i.quantity + 1)} className="w-6 h-6 rounded border text-xs hover:bg-accent">+</button></>}</div>
                    <span className="text-sm font-medium w-16 text-right">${(i.price * i.quantity).toFixed(2)}</span>
                    {onRemove && <button onClick={() => onRemove(i.id)} className="text-muted-foreground hover:text-destructive transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
                </div>
            ))}</div>
            <div className="border-t p-4 space-y-3"><div className="flex justify-between font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>{onCheckout && <button onClick={onCheckout} className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors">Checkout</button>}</div>
        </div>
    );
});
Cart.displayName = 'Cart';
export { Cart };
export type { StyledCartProps as CartProps };
