import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DashboardLayout } from './DashboardLayout';

expect.extend(toHaveNoViolations);

describe('DashboardLayout', () => {
    describe('rendering', () => {
        it('renders sidebar content', () => {
            render(
                <DashboardLayout sidebar={<nav data-testid="sidebar">Sidebar</nav>}>
                    Content
                </DashboardLayout>,
            );
            expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        });

        it('renders main content', () => {
            render(
                <DashboardLayout sidebar={<nav>Sidebar</nav>}>
                    <div data-testid="content">Dashboard content</div>
                </DashboardLayout>,
            );
            expect(screen.getByTestId('content')).toBeInTheDocument();
        });

        it('renders header when provided', () => {
            render(
                <DashboardLayout sidebar={<nav>Sidebar</nav>} header={<div data-testid="header">Header</div>}>
                    Content
                </DashboardLayout>,
            );
            expect(screen.getByTestId('header')).toBeInTheDocument();
        });

        it('renders mobile sidebar button', () => {
            render(
                <DashboardLayout sidebar={<nav>Sidebar</nav>}>Content</DashboardLayout>,
            );
            expect(screen.getByRole('button', { name: /open sidebar/i })).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <DashboardLayout sidebar={<nav aria-label="Sidebar">Sidebar</nav>} header={<header>Header</header>}>
                    <p>Content</p>
                </DashboardLayout>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
