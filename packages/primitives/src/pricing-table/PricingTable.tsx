import { forwardRef } from 'react';
import type { PricingTableProps } from './PricingTable.types';
import { usePricingTable } from './usePricingTable';

const PricingTablePrimitive = forwardRef<HTMLDivElement, PricingTableProps>(
    ({ tiers, onSelect, title, ...rest }, ref) => {
        const { pricingTableProps } = usePricingTable({ tiers, onSelect });
        return (
            <div ref={ref} {...rest} {...pricingTableProps}>
                {title && <h2>{title}</h2>}
                <div style={{ display: 'flex', gap: 16 }}>
                    {tiers.map(tier => (
                        <div key={tier.id} style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: 8, padding: 24 }}>
                            <h3>{tier.name}</h3>
                            <p style={{ fontSize: 32, fontWeight: 700 }}>{typeof tier.price === 'number' ? `$${tier.price}` : tier.price}{tier.period && <span style={{ fontSize: 14, fontWeight: 400 }}>/{tier.period}</span>}</p>
                            {tier.description && <p>{tier.description}</p>}
                            <ul>{tier.features.map((f, i) => <li key={i}>✓ {f}</li>)}</ul>
                            <button onClick={() => onSelect?.(tier)}>{tier.cta || 'Get Started'}</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
);
PricingTablePrimitive.displayName = 'PricingTablePrimitive';
export { PricingTablePrimitive };
