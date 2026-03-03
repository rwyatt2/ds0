import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PricingCards } from './PricingCards';

const meta: Meta<typeof PricingCards> = {
    title: 'Recipes/Marketing/PricingCards',
    component: PricingCards,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PricingCards>;

const features = {
    free: [
        { label: '1 user', included: true },
        { label: '10 projects', included: true },
        { label: 'Basic analytics', included: true },
        { label: 'Priority support', included: false },
        { label: 'Custom branding', included: false },
    ],
    pro: [
        { label: 'Unlimited users', included: true },
        { label: 'Unlimited projects', included: true },
        { label: 'Advanced analytics', included: true },
        { label: 'Priority support', included: true },
        { label: 'Custom branding', included: false },
    ],
    enterprise: [
        { label: 'Unlimited users', included: true },
        { label: 'Unlimited projects', included: true },
        { label: 'Advanced analytics', included: true },
        { label: 'Priority support', included: true },
        { label: 'Custom branding', included: true },
    ],
};

const tiers = [
    { name: 'Free', description: 'For individuals', priceMonthly: 0, features: features.free, onSelect: () => { } },
    { name: 'Pro', description: 'For teams', priceMonthly: 29, priceYearly: 290, features: features.pro, onSelect: () => { }, featured: true, badge: 'Most popular' },
    { name: 'Enterprise', description: 'For organizations', priceMonthly: 99, priceYearly: 990, features: features.enterprise, onSelect: () => { }, ctaLabel: 'Contact sales' },
];

export const Default: Story = { args: { tiers } };
export const WithoutToggle: Story = { args: { tiers, showBillingToggle: false } };
export const TwoTiers: Story = { args: { tiers: tiers.slice(0, 2) } };
