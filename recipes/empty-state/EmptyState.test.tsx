import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { EmptyState } from './EmptyState';

expect.extend(toHaveNoViolations);

describe('EmptyState', () => {
    describe('rendering', () => {
        it('renders with title only', () => {
            render(<EmptyState title="No results found" />);
            expect(screen.getByText('No results found')).toBeInTheDocument();
        });

        it('renders with description', () => {
            render(
                <EmptyState
                    title="No results"
                    description="Try adjusting your search."
                />,
            );
            expect(screen.getByText('Try adjusting your search.')).toBeInTheDocument();
        });

        it('renders icon when provided', () => {
            render(
                <EmptyState
                    icon={<span data-testid="empty-icon">📭</span>}
                    title="No messages"
                />,
            );
            expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
        });

        it('renders primary action button', () => {
            const onClick = vi.fn();
            render(
                <EmptyState
                    title="No items"
                    action={{ label: 'Add item', onClick }}
                />,
            );
            expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
        });

        it('renders both action buttons', () => {
            render(
                <EmptyState
                    title="No items"
                    action={{ label: 'Create', onClick: vi.fn() }}
                    secondaryAction={{ label: 'Learn more', onClick: vi.fn() }}
                />,
            );
            expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Learn more' })).toBeInTheDocument();
        });

        it('does not render action buttons when none provided', () => {
            render(<EmptyState title="Empty" />);
            expect(screen.queryByRole('button')).not.toBeInTheDocument();
        });

        it('merges custom className', () => {
            const { container } = render(
                <EmptyState title="Test" className="custom-class" />,
            );
            expect(container.firstChild).toHaveClass('custom-class');
        });
    });

    describe('interactions', () => {
        it('calls action onClick when primary button clicked', async () => {
            const user = userEvent.setup();
            const onClick = vi.fn();
            render(
                <EmptyState
                    title="No items"
                    action={{ label: 'Add item', onClick }}
                />,
            );
            await user.click(screen.getByRole('button', { name: 'Add item' }));
            expect(onClick).toHaveBeenCalledOnce();
        });

        it('calls secondaryAction onClick when secondary button clicked', async () => {
            const user = userEvent.setup();
            const onClick = vi.fn();
            render(
                <EmptyState
                    title="No items"
                    secondaryAction={{ label: 'Help', onClick }}
                />,
            );
            await user.click(screen.getByRole('button', { name: 'Help' }));
            expect(onClick).toHaveBeenCalledOnce();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <EmptyState
                    title="No results found"
                    description="Try a different search."
                    action={{ label: 'Clear search', onClick: vi.fn() }}
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
