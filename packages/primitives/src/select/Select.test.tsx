import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { SelectPrimitive, SelectTriggerPrimitive, SelectContentPrimitive, SelectItemPrimitive } from './Select';

expect.extend(toHaveNoViolations);

function renderSelect(props = {}) {
    return render(
        <SelectPrimitive placeholder="Choose..." {...props}>
            <SelectTriggerPrimitive data-testid="trigger" />
            <SelectContentPrimitive data-testid="content">
                <SelectItemPrimitive value="apple">Apple</SelectItemPrimitive>
                <SelectItemPrimitive value="banana">Banana</SelectItemPrimitive>
                <SelectItemPrimitive value="cherry">Cherry</SelectItemPrimitive>
            </SelectContentPrimitive>
        </SelectPrimitive>,
    );
}

describe('SelectPrimitive', () => {
    it('renders trigger with placeholder', () => {
        renderSelect();
        expect(screen.getByRole('combobox')).toHaveTextContent('Choose...');
    });

    it('opens on click', async () => {
        const user = userEvent.setup();
        renderSelect();
        await user.click(screen.getByRole('combobox'));
        expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('selects an option', async () => {
        const onValueChange = vi.fn();
        const user = userEvent.setup();
        renderSelect({ onValueChange });

        await user.click(screen.getByRole('combobox'));
        await user.click(screen.getByText('Apple'));

        expect(onValueChange).toHaveBeenCalledWith('apple');
    });

    it('closes after selection', async () => {
        const user = userEvent.setup();
        renderSelect();

        await user.click(screen.getByRole('combobox'));
        await user.click(screen.getByText('Banana'));
        await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    });

    it('closes on Escape', async () => {
        const user = userEvent.setup();
        renderSelect();
        await user.click(screen.getByRole('combobox'));
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    });

    it('has no axe violations', async () => {
        const { container } = render(
            <SelectPrimitive placeholder="Choose..." aria-label="Select">
                <SelectTriggerPrimitive data-testid="trigger" aria-label="Choose option" />
                <SelectContentPrimitive data-testid="content">
                    <SelectItemPrimitive value="apple">Apple</SelectItemPrimitive>
                    <SelectItemPrimitive value="banana">Banana</SelectItemPrimitive>
                    <SelectItemPrimitive value="cherry">Cherry</SelectItemPrimitive>
                </SelectContentPrimitive>
            </SelectPrimitive>,
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
