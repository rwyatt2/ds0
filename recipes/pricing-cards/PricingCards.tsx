import React, { useState } from 'react';

import { cn } from '@ds0/primitives';

import { Card } from '@ds0/components/react/card';
import { Stack } from '@ds0/components/react/stack';
import { Heading } from '@ds0/components/react/heading';
import { Text } from '@ds0/components/react/text';
import { Button } from '@ds0/components/react/button';
import { Badge } from '@ds0/components/react/badge';
import { Divider } from '@ds0/components/react/divider';

/**
 * A single pricing feature item.
 */
interface PricingFeature {
    label: string;
    included: boolean;
}

/**
 * A pricing tier.
 */
interface PricingTier {
    /** Tier name */
    name: string;
    /** Description */
    description?: string;
    /** Monthly price (number or 'Custom') */
    priceMonthly: number | string;
    /** Yearly price (number or 'Custom') */
    priceYearly?: number | string;
    /** Currency symbol */
    currency?: string;
    /** CTA button label */
    ctaLabel?: string;
    /** CTA handler */
    onSelect: () => void;
    /** Whether this is the highlighted/recommended tier */
    featured?: boolean;
    /** Badge text (e.g., 'Most popular') */
    badge?: string;
    /** Feature list */
    features: PricingFeature[];
}

/**
 * Props for the PricingCards recipe component.
 */
interface PricingCardsProps {
    /** Pricing tiers */
    tiers: PricingTier[];
    /** Show billing period toggle */
    showBillingToggle?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Check icon for included features.
 */
function CheckIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-green-600 shrink-0">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

/**
 * X icon for excluded features.
 */
function XIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-muted-foreground/50 shrink-0">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    );
}

/**
 * PricingCards recipe.
 * Marketing pricing section with tier cards, feature comparison, and billing toggle.
 *
 * @example
 * ```tsx
 * <PricingCards
 *   tiers={[
 *     { name: 'Free', priceMonthly: 0, features: [...], onSelect: () => {} },
 *     { name: 'Pro', priceMonthly: 29, features: [...], onSelect: () => {}, featured: true },
 *   ]}
 * />
 * ```
 */
function PricingCards({
    tiers,
    showBillingToggle = true,
    className,
}: PricingCardsProps): React.ReactElement {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
    const hasYearlyPrices = tiers.some((t) => t.priceYearly !== undefined);

    const formatPrice = (price: number | string, currency = '$'): string => {
        if (typeof price === 'string') return price;
        if (price === 0) return 'Free';
        return `${currency}${price}`;
    };

    return (
        <Stack gap="8" align="center" className={className}>
            {/* Billing period toggle */}
            {showBillingToggle && hasYearlyPrices && (
                <div className="inline-flex items-center gap-2 rounded-full bg-muted p-1">
                    <button
                        type="button"
                        className={cn(
                            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                            billingPeriod === 'monthly' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground',
                        )}
                        onClick={() => setBillingPeriod('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        type="button"
                        className={cn(
                            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                            billingPeriod === 'yearly' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground',
                        )}
                        onClick={() => setBillingPeriod('yearly')}
                    >
                        Yearly
                    </button>
                </div>
            )}

            {/* Tier Cards */}
            <div className={cn('grid gap-6 w-full', tiers.length <= 3 ? `grid-cols-1 md:grid-cols-${tiers.length}` : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4')}>
                {tiers.map((tier) => {
                    const price = billingPeriod === 'yearly' && tier.priceYearly !== undefined
                        ? tier.priceYearly
                        : tier.priceMonthly;

                    return (
                        <Card
                            key={tier.name}
                            className={cn(
                                'relative flex flex-col',
                                tier.featured && 'border-primary shadow-lg scale-[1.02]',
                            )}
                        >
                            {tier.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <Badge>{tier.badge}</Badge>
                                </div>
                            )}
                            <Card.Header className="text-center">
                                <Card.Title>{tier.name}</Card.Title>
                                {tier.description && (
                                    <Card.Description>{tier.description}</Card.Description>
                                )}
                            </Card.Header>
                            <Card.Content className="flex-1">
                                <Stack gap="6">
                                    {/* Price */}
                                    <div className="text-center">
                                        <Heading as="h3" size="4xl" tracking="tight">
                                            {formatPrice(price, tier.currency)}
                                        </Heading>
                                        {typeof price === 'number' && price > 0 && (
                                            <Text size="sm" color="muted">
                                                per {billingPeriod === 'yearly' ? 'year' : 'month'}
                                            </Text>
                                        )}
                                    </div>

                                    <Divider />

                                    {/* Features */}
                                    <Stack gap="3">
                                        {tier.features.map((feature) => (
                                            <Stack
                                                key={feature.label}
                                                direction="horizontal"
                                                gap="3"
                                                align="center"
                                            >
                                                {feature.included ? <CheckIcon /> : <XIcon />}
                                                <Text
                                                    size="sm"
                                                    color={feature.included ? 'default' : 'muted'}
                                                >
                                                    {feature.label}
                                                </Text>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Card.Content>
                            <Card.Footer>
                                <Button
                                    className="w-full"
                                    variant={tier.featured ? 'primary' : 'outline'}
                                    onClick={tier.onSelect}
                                >
                                    {tier.ctaLabel ?? 'Get started'}
                                </Button>
                            </Card.Footer>
                        </Card>
                    );
                })}
            </div>
        </Stack>
    );
}

PricingCards.displayName = 'PricingCards';

export { PricingCards };
export type { PricingCardsProps, PricingTier, PricingFeature };
