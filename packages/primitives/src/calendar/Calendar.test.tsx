import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CalendarPrimitive } from './Calendar';
expect.extend(toHaveNoViolations);
describe('CalendarPrimitive', () => {
    it('renders with role="grid"', () => { render(<CalendarPrimitive />); expect(screen.getByRole('grid')).toBeInTheDocument(); });
    it('shows month name', () => { render(<CalendarPrimitive />); expect(screen.getByRole('grid')).toHaveAttribute('aria-label', expect.stringMatching(/Calendar/)); });
    it('navigates months', async () => { const user = userEvent.setup(); render(<CalendarPrimitive />); await user.click(screen.getByLabelText('Next month')); expect(screen.getByRole('grid')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<CalendarPrimitive />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<CalendarPrimitive ref={ref} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
