import type { UsePricingTableProps, UsePricingTableReturn } from './PricingTable.types';

export function usePricingTable(props: UsePricingTableProps): UsePricingTableReturn {
    const { tiers } = props;
    return {
        pricingTableProps: {
            role: 'region',
            'aria-label': `Pricing comparison with ${tiers.length} plans`,
        },
    };
}
