import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';
import {
    DropdownMenuPrimitive,
    DropdownMenuTriggerPrimitive,
    DropdownMenuContentPrimitive,
    DropdownMenuItemPrimitive,
    DropdownMenuSeparatorPrimitive,
} from './DropdownMenu';

expect.extend(toHaveNoViolations);

const TestMenu = ({ defaultOpen }: { defaultOpen?: boolean }) => (
    <DropdownMenuPrimitive defaultOpen={defaultOpen}>
        <DropdownMenuTriggerPrimitive>Open</DropdownMenuTriggerPrimitive>
        <DropdownMenuContentPrimitive>
            <DropdownMenuItemPrimitive>Profile</DropdownMenuItemPrimitive>
            <DropdownMenuItemPrimitive>Settings</DropdownMenuItemPrimitive>
            <DropdownMenuSeparatorPrimitive />
            <DropdownMenuItemPrimitive isDisabled>Admin</DropdownMenuItemPrimitive>
            <DropdownMenuItemPrimitive>Sign out</DropdownMenuItemPrimitive>
        </DropdownMenuContentPrimitive>
    </DropdownMenuPrimitive>
);

describe('DropdownMenuPrimitive', () => {
    describe('rendering', () => {
        it('renders trigger', () => {
            render(<TestMenu />);
            expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
        });

        it('hides content by default', () => {
            render(<TestMenu />);
            expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        });

        it('shows content when defaultOpen', () => {
            render(<TestMenu defaultOpen />);
            expect(screen.getByRole('menu')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('opens menu on click', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);
            await user.click(screen.getByRole('button', { name: 'Open' }));
            expect(screen.getByRole('menu')).toBeInTheDocument();
        });

        it('closes menu when item is selected', async () => {
            const user = userEvent.setup();
            const onSelect = vi.fn();
            render(
                <DropdownMenuPrimitive defaultOpen>
                    <DropdownMenuTriggerPrimitive>Open</DropdownMenuTriggerPrimitive>
                    <DropdownMenuContentPrimitive>
                        <DropdownMenuItemPrimitive onSelect={onSelect}>Item</DropdownMenuItemPrimitive>
                    </DropdownMenuContentPrimitive>
                </DropdownMenuPrimitive>,
            );
            await user.click(screen.getByText('Item'));
            expect(onSelect).toHaveBeenCalledTimes(1);
        });

        it('does not trigger disabled items', async () => {
            const onSelect = vi.fn();
            const user = userEvent.setup();
            render(
                <DropdownMenuPrimitive defaultOpen>
                    <DropdownMenuTriggerPrimitive>Open</DropdownMenuTriggerPrimitive>
                    <DropdownMenuContentPrimitive>
                        <DropdownMenuItemPrimitive isDisabled onSelect={onSelect}>Disabled</DropdownMenuItemPrimitive>
                    </DropdownMenuContentPrimitive>
                </DropdownMenuPrimitive>,
            );
            await user.click(screen.getByText('Disabled'));
            expect(onSelect).not.toHaveBeenCalled();
        });
    });

    describe('keyboard', () => {
        it('opens on Enter key', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);
            screen.getByRole('button', { name: 'Open' }).focus();
            await user.keyboard('{Enter}');
            expect(screen.getByRole('menu')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations (closed)', async () => {
            const { container } = render(<TestMenu />);
            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no axe violations (open)', async () => {
            const { container } = render(<TestMenu defaultOpen />);
            expect(await axe(container)).toHaveNoViolations();
        });

        it('trigger has aria-haspopup="menu"', () => {
            render(<TestMenu />);
            expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute('aria-haspopup', 'menu');
        });

        it('trigger has aria-expanded when open', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);
            const trigger = screen.getByRole('button', { name: 'Open' });
            expect(trigger).toHaveAttribute('aria-expanded', 'false');
            await user.click(trigger);
            expect(trigger).toHaveAttribute('aria-expanded', 'true');
        });

        it('items have role="menuitem"', () => {
            render(<TestMenu defaultOpen />);
            expect(screen.getAllByRole('menuitem')).toHaveLength(4);
        });

        it('disabled item has aria-disabled', () => {
            render(<TestMenu defaultOpen />);
            expect(screen.getByText('Admin')).toHaveAttribute('aria-disabled', 'true');
        });

        it('separator has role="separator"', () => {
            render(<TestMenu defaultOpen />);
            expect(screen.getByRole('separator')).toBeInTheDocument();
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref on root', () => {
            const ref = createRef<HTMLDivElement>();
            render(
                <DropdownMenuPrimitive ref={ref}>
                    <DropdownMenuTriggerPrimitive>Open</DropdownMenuTriggerPrimitive>
                    <DropdownMenuContentPrimitive>
                        <DropdownMenuItemPrimitive>Item</DropdownMenuItemPrimitive>
                    </DropdownMenuContentPrimitive>
                </DropdownMenuPrimitive>,
            );
            expect(ref.current).toBeInstanceOf(HTMLDivElement);
        });
    });
});
