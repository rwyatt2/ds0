import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import type { StyledProductCardProps } from '@ds0/primitives';
const ProductCard = forwardRef<HTMLDivElement, StyledProductCardProps>(({ className, variant = 'default', name, price, image, description, badge, rating, onAddToCart, ...props }, ref) => (
    <div ref={ref} role="article" className={cn('group rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-lg',
        variant === 'horizontal' ? 'flex' : variant === 'compact' ? 'p-3' : '', className)} {...props}>
        {image && <div className={cn('relative overflow-hidden', variant === 'horizontal' ? 'w-40 shrink-0' : 'aspect-square')}>
            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            {badge && <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">{badge}</span>}
        </div>}
        <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-sm line-clamp-1">{name}</h3>
            {description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>}
            {rating !== undefined && <div className="flex items-center gap-0.5 mt-2">{Array.from({ length: 5 }, (_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={i < rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className={i < rating ? 'text-amber-400' : 'text-muted-foreground/30'}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>)}</div>}
            <div className="flex items-center justify-between mt-auto pt-3">
                <span className="text-lg font-bold">{typeof price === 'number' ? `$${price.toFixed(2)}` : price}</span>
                {onAddToCart && <button onClick={onAddToCart} className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium hover:bg-primary/90 transition-colors">Add to Cart</button>}
            </div>
        </div>
    </div>
));
ProductCard.displayName = 'ProductCard';
export { ProductCard };
export type { StyledProductCardProps as ProductCardProps };
