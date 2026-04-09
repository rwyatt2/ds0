import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CountdownTimerPrimitive } from './CountdownTimer';
expect.extend(toHaveNoViolations);

describe('CountdownTimerPrimitive', () => {
    const future = new Date(Date.now() + 90061000); // 1d 1h 1m 1s
    it('renders with role="timer"', () => { render(<CountdownTimerPrimitive targetDate={future} />); expect(screen.getByRole('timer')).toBeInTheDocument(); });
    it('renders formatted time', () => { render(<CountdownTimerPrimitive targetDate={future} />); expect(screen.getByRole('timer').textContent).toMatch(/\d{2}:\d{2}:\d{2}:\d{2}/); });
    it('supports render prop', () => { render(<CountdownTimerPrimitive targetDate={future}>{({ days }) => <span>{days} days left</span>}</CountdownTimerPrimitive>); expect(screen.getByText(/days left/)).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<CountdownTimerPrimitive targetDate={future} />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<CountdownTimerPrimitive ref={ref} targetDate={future} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
