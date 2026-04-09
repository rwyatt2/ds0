import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { usePricingTable } from '@ds0/primitives';
import type { StyledPricingTableProps } from '@ds0/primitives';

const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-emerald-500 shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>);

const PricingTable = forwardRef<HTMLDivElement, StyledPricingTableProps>(
    ({ className, variant = 'default', tiers, onSelect, title, ...props }, ref) => {
        const { pricingTableProps } = usePricingTable({ tiers, onSelect });
        return (
            <div ref={ref} className={cn('w-full', className)} {...props}>
                {title && <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>}
                <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 1fr))` }} {...pricingTableProps}>
                    {tiers.map(tier => (
                        <div key={tier.id} className={cn('relative rounded-xl p-6 flex flex-col transition-shadow',
                            variant === 'minimal' ? 'border' : 'border bg-card shadow-sm',
                            tier.highlighted && 'ring-2 ring-primary shadow-lg scale-[1.02]',
                        )}>
                            {tier.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Popular</div>}
                            <h3 className="text-lg font-semibold">{tier.name}</h3>
                            <div className="mt-3 mb-1">
                                <span className="text-4xl font-bold tracking-tight">{typeof tier.price === 'number' ? `$${tier.price}` : tier.price}</span>
                                {tier.period && <span className="text-sm text-muted-foreground ml-1">/{tier.period}</span>}
                            </div>
                            {tier.description && <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>}
                            <ul className="space-y-2.5 my-6 flex-1">{tier.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm"><CheckIcon />{f}</li>
                            ))}</ul>
                            <button onClick={() => onSelect?.(tier)} className={cn('w-full rounded-lg py-2.5 text-sm font-medium transition-colors',
                                tier.highlighted ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border hover:bg-accent'
                            )}>{tier.cta || 'Get Started'}</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
);
PricingTable.displayName = 'PricingTable';
export { PricingTable };
export type { StyledPricingTableProps as PricingTableProps };
