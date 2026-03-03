import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadioGroupPrimitive } from './RadioGroup';
import { RadioGroupItemPrimitive } from './RadioGroupItem';

expect.extend(toHaveNoViolations);

function renderRadioGroup(props = {}) {
    return render(
        <RadioGroupPrimitive label="Favorite fruit" {...props}>
            <RadioGroupItemPrimitive value="apple" label="Apple" />
            <RadioGroupItemPrimitive value="banana" label="Banana" />
            <RadioGroupItemPrimitive value="cherry" label="Cherry" />
        </RadioGroupPrimitive>,
    );
}

describe('RadioGroupPrimitive', () => {
    describe('rendering', () => {
        it('renders with radiogroup role', () => {
            renderRadioGroup();
            expect(screen.getByRole('radiogroup')).toBeInTheDocument();
        });

        it('renders all radio items', () => {
            renderRadioGroup();
            expect(screen.getAllByRole('radio')).toHaveLength(3);
        });

        it('renders the group label', () => {
            renderRadioGroup();
            expect(screen.getByText('Favorite fruit')).toBeInTheDocument();
        });

        it('renders item labels', () => {
            renderRadioGroup();
            expect(screen.getByText('Apple')).toBeInTheDocument();
            expect(screen.getByText('Banana')).toBeInTheDocument();
            expect(screen.getByText('Cherry')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('selects an item on click', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();
            renderRadioGroup({ onValueChange });

            await user.click(screen.getByText('Banana'));
            expect(onValueChange).toHaveBeenCalledWith('banana');
        });

        it('does not select a disabled item', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();
            render(
                <RadioGroupPrimitive label="Test" onValueChange={onValueChange}>
                    <RadioGroupItemPrimitive value="a" label="A" />
                    <RadioGroupItemPrimitive value="b" label="B" isDisabled />
                </RadioGroupPrimitive>,
            );

            await user.click(screen.getByText('B'));
            expect(onValueChange).not.toHaveBeenCalled();
        });

        it('supports defaultValue', () => {
            renderRadioGroup({ defaultValue: 'banana' });
            const radios = screen.getAllByRole('radio');
            expect(radios[1]).toHaveAttribute('aria-checked', 'true');
        });

        it('supports controlled value', () => {
            renderRadioGroup({ value: 'cherry' });
            const radios = screen.getAllByRole('radio');
            expect(radios[2]).toHaveAttribute('aria-checked', 'true');
        });
    });

    describe('keyboard', () => {
        it('navigates with arrow keys', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();
            renderRadioGroup({ defaultValue: 'apple', onValueChange });

            const firstRadio = screen.getAllByRole('radio')[0]!;
            firstRadio.focus();

            await user.keyboard('{ArrowDown}');
            expect(onValueChange).toHaveBeenCalledWith('banana');
        });

        it('wraps around from last to first', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();
            renderRadioGroup({ defaultValue: 'cherry', onValueChange });

            const lastRadio = screen.getAllByRole('radio')[2]!;
            lastRadio.focus();

            await user.keyboard('{ArrowDown}');
            expect(onValueChange).toHaveBeenCalledWith('apple');
        });

        it('selects with Space on focused item', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();
            renderRadioGroup({ onValueChange });

            const firstRadio = screen.getAllByRole('radio')[0]!;
            firstRadio.focus();

            await user.keyboard(' ');
            expect(onValueChange).toHaveBeenCalledWith('apple');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = renderRadioGroup({ defaultValue: 'apple' });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has radiogroup role on container', () => {
            renderRadioGroup();
            expect(screen.getByRole('radiogroup')).toBeInTheDocument();
        });

        it('has radio role on items', () => {
            renderRadioGroup();
            const items = screen.getAllByRole('radio');
            items.forEach((item) => {
                expect(item).toHaveAttribute('role', 'radio');
            });
        });

        it('sets aria-checked correctly', () => {
            renderRadioGroup({ defaultValue: 'banana' });
            const radios = screen.getAllByRole('radio');
            expect(radios[0]).toHaveAttribute('aria-checked', 'false');
            expect(radios[1]).toHaveAttribute('aria-checked', 'true');
            expect(radios[2]).toHaveAttribute('aria-checked', 'false');
        });

        it('sets aria-disabled on disabled items', () => {
            render(
                <RadioGroupPrimitive label="Test">
                    <RadioGroupItemPrimitive value="a" label="A" isDisabled />
                </RadioGroupPrimitive>,
            );
            expect(screen.getByRole('radio')).toHaveAttribute('aria-disabled', 'true');
        });

        it('has aria-orientation', () => {
            renderRadioGroup({ orientation: 'horizontal' });
            expect(screen.getByRole('radiogroup')).toHaveAttribute(
                'aria-orientation',
                'horizontal',
            );
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to the group element', () => {
            const ref = vi.fn();
            render(
                <RadioGroupPrimitive label="Test" ref={ref}>
                    <RadioGroupItemPrimitive value="a" label="A" />
                </RadioGroupPrimitive>,
            );
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
        });
    });
});
