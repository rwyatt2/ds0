import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CommandPalette } from './CommandPalette';

expect.extend(toHaveNoViolations);

const commands = [
    { id: '1', label: 'Go to Dashboard', group: 'Navigation', onSelect: vi.fn() },
    { id: '2', label: 'Go to Settings', group: 'Navigation', onSelect: vi.fn() },
    { id: '3', label: 'Create Project', group: 'Actions', onSelect: vi.fn() },
    { id: '4', label: 'Disabled Command', group: 'Actions', onSelect: vi.fn(), disabled: true },
];

describe('CommandPalette', () => {
    describe('rendering', () => {
        it('renders search input when open', () => {
            render(<CommandPalette commands={commands} open onOpenChange={vi.fn()} />);
            expect(screen.getByRole('combobox')).toBeInTheDocument();
        });

        it('renders all commands when no search', () => {
            render(<CommandPalette commands={commands} open onOpenChange={vi.fn()} />);
            expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
            expect(screen.getByText('Create Project')).toBeInTheDocument();
        });

        it('renders group labels', () => {
            render(<CommandPalette commands={commands} open onOpenChange={vi.fn()} />);
            expect(screen.getByText('Navigation')).toBeInTheDocument();
            expect(screen.getByText('Actions')).toBeInTheDocument();
        });

        it('does not render when closed', () => {
            render(<CommandPalette commands={commands} open={false} onOpenChange={vi.fn()} />);
            expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('filters commands on search input', async () => {
            const user = userEvent.setup();
            render(<CommandPalette commands={commands} open onOpenChange={vi.fn()} />);
            await user.type(screen.getByRole('combobox'), 'dashboard');
            expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
            expect(screen.queryByText('Create Project')).not.toBeInTheDocument();
        });

        it('shows no results message when nothing matches', async () => {
            const user = userEvent.setup();
            render(<CommandPalette commands={commands} open onOpenChange={vi.fn()} />);
            await user.type(screen.getByRole('combobox'), 'zzzzzzz');
            expect(screen.getByText('No results found.')).toBeInTheDocument();
        });

        it('calls onSelect and closes when command clicked', async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            const onOpenChange = vi.fn();
            render(
                <CommandPalette
                    commands={[{ id: '1', label: 'Test', onSelect }]}
                    open
                    onOpenChange={onOpenChange}
                />,
            );
            await user.click(screen.getByText('Test'));
            expect(onSelect).toHaveBeenCalledOnce();
            expect(onOpenChange).toHaveBeenCalledWith(false);
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <CommandPalette commands={commands} open onOpenChange={vi.fn()} />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
