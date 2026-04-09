import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DatePickerPrimitive } from './DatePicker';
expect.extend(toHaveNoViolations);
describe('DatePickerPrimitive', () => {
    it('renders input and trigger', () => { render(<DatePickerPrimitive />); expect(screen.getByRole('textbox')).toBeInTheDocument(); expect(screen.getByRole('button')).toBeInTheDocument(); });
    it('opens calendar on click', async () => { const user = userEvent.setup(); render(<DatePickerPrimitive><div>Calendar</div></DatePickerPrimitive>); await user.click(screen.getByRole('button')); expect(screen.getByText('Calendar')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<DatePickerPrimitive />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<DatePickerPrimitive ref={ref} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
