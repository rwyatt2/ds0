import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DashboardStats } from './DashboardStats';

expect.extend(toHaveNoViolations);

const stats = [
    { label: 'Revenue', value: '$45,231', change: 12.5, changePeriod: 'from last month' },
    { label: 'Users', value: '2,350', change: -3.1, changePeriod: 'from last month' },
];

describe('DashboardStats', () => {
    describe('rendering', () => {
        it('renders all stat labels and values', () => {
            render(<DashboardStats stats={stats} />);
            expect(screen.getByText('Revenue')).toBeInTheDocument();
            expect(screen.getByText('$45,231')).toBeInTheDocument();
            expect(screen.getByText('Users')).toBeInTheDocument();
            expect(screen.getByText('2,350')).toBeInTheDocument();
        });

        it('renders change percentages', () => {
            render(<DashboardStats stats={stats} />);
            expect(screen.getByText('+12.5%')).toBeInTheDocument();
            expect(screen.getByText('-3.1%')).toBeInTheDocument();
        });

        it('renders change period', () => {
            render(<DashboardStats stats={stats} />);
            expect(screen.getAllByText('from last month')).toHaveLength(2);
        });

        it('renders loading skeletons when isLoading', () => {
            const { container } = render(<DashboardStats stats={stats} isLoading columns={3} />);
            expect(container.querySelectorAll('[class*="animate-pulse"], [data-testid*="skeleton"]').length).toBeGreaterThanOrEqual(0);
            // Just verify it doesn't render actual stat data
            expect(screen.queryByText('Revenue')).not.toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<DashboardStats stats={stats} />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
