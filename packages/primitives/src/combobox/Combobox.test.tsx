import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ComboboxPrimitive } from './Combobox';
expect.extend(toHaveNoViolations);
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
describe('ComboboxPrimitive', () => {
    it('renders input with combobox role', () => { render(<ComboboxPrimitive items={fruits} placeholder="Search..." />); expect(screen.getByRole('combobox')).toBeInTheDocument(); });
    it('shows filtered results on input', async () => { const user = userEvent.setup(); render(<ComboboxPrimitive items={fruits} />); await user.click(screen.getByRole('combobox')); await user.type(screen.getByRole('combobox'), 'App'); expect(screen.getByRole('listbox')).toBeInTheDocument(); expect(screen.getByText('Apple')).toBeInTheDocument(); });
    it('selects item on click', async () => { const onValueChange = vi.fn(); const user = userEvent.setup(); render(<ComboboxPrimitive items={fruits} onValueChange={onValueChange} />); await user.click(screen.getByRole('combobox')); await user.type(screen.getByRole('combobox'), 'Ban'); await user.click(screen.getByText('Banana')); expect(onValueChange).toHaveBeenCalledWith('Banana'); });
    it('has no axe violations', async () => { const { container } = render(<ComboboxPrimitive items={fruits} placeholder="Search" />); expect(await axe(container)).toHaveNoViolations(); });
});
