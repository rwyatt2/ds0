import type { Meta, StoryObj } from '@storybook/react';
import { PricingTable } from './PricingTable';
const meta: Meta<typeof PricingTable> = { title: 'Recipes/Commerce/PricingTable', component: PricingTable, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof PricingTable>;
const tiers = [
    { id: 'free', name: 'Free', price: 0, period: 'mo', description: 'For personal projects', features: ['1 project', '100 API calls/day', 'Community support'], cta: 'Start Free' },
    { id: 'pro', name: 'Pro', price: 29, period: 'mo', description: 'For growing teams', features: ['Unlimited projects', '10,000 API calls/day', 'Priority support', 'Analytics dashboard', 'Custom domains'], highlighted: true, cta: 'Start Trial' },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'For large organizations', features: ['Everything in Pro', 'Unlimited API calls', 'Dedicated support', 'SLA guarantee', 'SSO & SAML', 'Custom integrations'], cta: 'Contact Sales' },
];
export const Default: Story = { args: { tiers, title: 'Choose Your Plan' } };
export const Minimal: Story = { args: { tiers, variant: 'minimal', title: 'Simple Pricing' } };
