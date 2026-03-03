import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SidebarNavigation } from './SidebarNavigation';

expect.extend(toHaveNoViolations);

const groups = [
    {
        label: 'Main', items: [
            { label: 'Dashboard', href: '/' },
            { label: 'Projects', href: '/projects', badge: 3 },
        ]
    },
    {
        label: 'Settings', items: [
            { label: 'Profile', href: '/settings/profile' },
            { label: 'Team', href: '/settings/team', disabled: true },
        ]
    },
];

describe('SidebarNavigation', () => {
    describe('rendering', () => {
        it('renders navigation landmark', () => {
            render(<SidebarNavigation groups={groups} currentPath="/" />);
            expect(screen.getByRole('navigation')).toBeInTheDocument();
        });

        it('renders all nav items', () => {
            render(<SidebarNavigation groups={groups} currentPath="/" />);
            expect(screen.getByText('Dashboard')).toBeInTheDocument();
            expect(screen.getByText('Projects')).toBeInTheDocument();
            expect(screen.getByText('Profile')).toBeInTheDocument();
        });

        it('renders group labels', () => {
            render(<SidebarNavigation groups={groups} currentPath="/" />);
            expect(screen.getByText('Main')).toBeInTheDocument();
            expect(screen.getByText('Settings')).toBeInTheDocument();
        });

        it('marks active item with aria-current', () => {
            render(<SidebarNavigation groups={groups} currentPath="/" />);
            expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('aria-current', 'page');
        });

        it('renders badge when provided', () => {
            render(<SidebarNavigation groups={groups} currentPath="/" />);
            expect(screen.getByText('3')).toBeInTheDocument();
        });

        it('renders header when provided', () => {
            render(<SidebarNavigation groups={groups} currentPath="/" header={<div data-testid="header">Header</div>} />);
            expect(screen.getByTestId('header')).toBeInTheDocument();
        });

        it('renders footer when provided', () => {
            render(<SidebarNavigation groups={groups} currentPath="/" footer={<div data-testid="footer">Footer</div>} />);
            expect(screen.getByTestId('footer')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<SidebarNavigation groups={groups} currentPath="/" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
