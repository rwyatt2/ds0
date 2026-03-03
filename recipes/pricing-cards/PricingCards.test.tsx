import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PricingCards } from './PricingCards';

expect.extend(toHaveNoViolations);

const tiers = [
    {
        name: 'Free',
        priceMonthly: 0,
        onSelect: vi.fn(),
        features: [
            { label: '1 user', included: true },
            { label: '10 projects', included: true },
            { label: 'Priority support', included: false },
        ],
    },
    {
        name: 'Pro',
        priceMonthly: 29,
        priceYearly: 290,
        onSelect: vi.fn(),
        featured: true,
        badge: 'Most popular',
        features: [
            { label: 'Unlimited users', included: true },
            { label: 'Unlimited projects', included: true },
            { label: 'Priority support', included: true },
        ],
    },
];

describe('PricingCards', () => {
    describe('rendering', () => {
        it('renders all tier names', () => {
            render(<PricingCards tiers={tiers} />);
            expect(screen.getByText('Free')).toBeInTheDocument();
            expect(screen.getByText('Pro')).toBeInTheDocument();
        });

        it('renders prices', () => {
            render(<PricingCards tiers={tiers} />);
            expect(screen.getByText('Free')).toBeInTheDocument();
            expect(screen.getByText('$29')).toBeInTheDocument();
        });

        it('renders features', () => {
            render(<PricingCards tiers={tiers} />);
            expect(screen.getAllByText('Priority support')).toHaveLength(2);
        });

        it('renders badge on featured tier', () => {
            render(<PricingCards tiers={tiers} />);
            expect(screen.getByText('Most popular')).toBeInTheDocument();
        });

        it('renders billing toggle when yearly prices exist', () => {
            render(<PricingCards tiers={tiers} showBillingToggle />);
            expect(screen.getByText('Monthly')).toBeInTheDocument();
            expect(screen.getByText('Yearly')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('switches to yearly pricing', async () => {
            const user = userEvent.setup();
            render(<PricingCards tiers={tiers} showBillingToggle />);
            await user.click(screen.getByText('Yearly'));
            expect(screen.getByText('$290')).toBeInTheDocument();
        });

        it('calls onSelect when CTA clicked', async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            render(<PricingCards tiers={[{ ...tiers[0]!, onSelect }]} />);
            await user.click(screen.getByRole('button', { name: /get started/i }));
            expect(onSelect).toHaveBeenCalledOnce();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<PricingCards tiers={tiers} />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
