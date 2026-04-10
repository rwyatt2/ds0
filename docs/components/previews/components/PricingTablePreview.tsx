'use client';

import { PricingTable } from '../../../../components/react/pricing-table';

const tiers = [
    {
        name: 'Starter',
        price: '$0',
        period: '/month',
        description: 'For personal projects',
        features: ['5 components', '1 theme', 'Community support', 'MIT license'],
        cta: 'Get Started',
    },
    {
        name: 'Pro',
        price: '$29',
        period: '/month',
        description: 'For growing teams',
        features: ['All components', 'Custom themes', 'Priority support', 'Figma files', 'Updates for 1 year'],
        cta: 'Start Trial',
        highlighted: true,
    },
    {
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        description: 'For large organizations',
        features: ['Everything in Pro', 'SSO integration', 'SLA guarantee', 'Dedicated support', 'Custom development'],
        cta: 'Contact Sales',
    },
];

export function PricingTablePreview(): React.ReactElement {
    return (
        <div className="w-full max-w-3xl">
            <PricingTable tiers={tiers} onSelect={() => {}} />
        </div>
    );
}
