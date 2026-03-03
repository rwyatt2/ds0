import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { ToggleGroupPrimitive, ToggleGroupItemPrimitive } from './ToggleGroup';

expect.extend(toHaveNoViolations);

function renderToggleGroup(props = {}) {
    return render(
        <ToggleGroupPrimitive type="single" defaultValue="center" {...props}>
            <ToggleGroupItemPrimitive value="left">Left</ToggleGroupItemPrimitive>
            <ToggleGroupItemPrimitive value="center">Center</ToggleGroupItemPrimitive>
            <ToggleGroupItemPrimitive value="right">Right</ToggleGroupItemPrimitive>
        </ToggleGroupPrimitive>,
    );
}

describe('ToggleGroupPrimitive', () => {
    describe('rendering', () => {
        it('renders items', () => {
            renderToggleGroup();
            expect(screen.getByRole('radio', { name: 'Left' })).toBeInTheDocument();
            expect(screen.getByRole('radio', { name: 'Center' })).toBeInTheDocument();
            expect(screen.getByRole('radio', { name: 'Right' })).toBeInTheDocument();
        });

        it('renders group', () => {
            renderToggleGroup();
            expect(screen.getByRole('group')).toBeInTheDocument();
        });

        it('sets defaultValue', () => {
            renderToggleGroup();
            expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('data-state', 'on');
        });
    });

    describe('interactions — single mode', () => {
        it('selects on click', async () => {
            const user = userEvent.setup();
            renderToggleGroup();

            await user.click(screen.getByRole('radio', { name: 'Left' }));
            expect(screen.getByRole('radio', { name: 'Left' })).toHaveAttribute('data-state', 'on');
            // Previous selection should be deselected
            expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('data-state', 'off');
        });

        it('deselects on re-click (single mode)', async () => {
            const user = userEvent.setup();
            renderToggleGroup();

            await user.click(screen.getByRole('radio', { name: 'Center' }));
            expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('data-state', 'off');
        });

        it('calls onValueChange', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();
            renderToggleGroup({ onValueChange });

            await user.click(screen.getByRole('radio', { name: 'Left' }));
            expect(onValueChange).toHaveBeenCalledWith('left');
        });
    });

    describe('interactions — multiple mode', () => {
        it('selects multiple items', async () => {
            const user = userEvent.setup();
            renderToggleGroup({ type: 'multiple', defaultValue: ['center'] });

            await user.click(screen.getByRole('radio', { name: 'Left' }));
            expect(screen.getByRole('radio', { name: 'Left' })).toHaveAttribute('data-state', 'on');
            expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('data-state', 'on');
        });
    });

    describe('keyboard', () => {
        it('navigates with arrow keys', async () => {
            const user = userEvent.setup();
            renderToggleGroup();

            screen.getByRole('radio', { name: 'Center' }).focus();
            await user.keyboard('{ArrowRight}');
            expect(screen.getByRole('radio', { name: 'Right' })).toHaveFocus();
        });

        it('wraps around', async () => {
            const user = userEvent.setup();
            renderToggleGroup();

            screen.getByRole('radio', { name: 'Right' }).focus();
            await user.keyboard('{ArrowRight}');
            expect(screen.getByRole('radio', { name: 'Left' })).toHaveFocus();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = renderToggleGroup();
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has aria-checked on selected item', () => {
            renderToggleGroup();
            expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('aria-checked', 'true');
            expect(screen.getByRole('radio', { name: 'Left' })).toHaveAttribute('aria-checked', 'false');
        });

        it('has roving tabIndex', () => {
            renderToggleGroup();
            expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('tabindex', '0');
            expect(screen.getByRole('radio', { name: 'Left' })).toHaveAttribute('tabindex', '-1');
        });
    });
});
