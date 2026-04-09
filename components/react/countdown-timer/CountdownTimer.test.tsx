import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CountdownTimer } from './CountdownTimer';
expect.extend(toHaveNoViolations);

describe('CountdownTimer (Styled)', () => {
    const future = new Date(Date.now() + 90061000);
    it('renders with role="timer"', () => { render(<CountdownTimer targetDate={future} />); expect(screen.getByRole('timer')).toBeInTheDocument(); });
    it('merges className', () => { render(<CountdownTimer targetDate={future} className="custom" />); expect(screen.getByRole('timer')).toHaveClass('custom'); });
    it('has no axe violations', async () => { const { container } = render(<CountdownTimer targetDate={future} />); expect(await axe(container)).toHaveNoViolations(); });
});
