import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ChartPrimitive } from './Chart';
expect.extend(toHaveNoViolations);
const props = { labels: ['Jan', 'Feb'], datasets: [{ label: 'Revenue', data: [100, 200] }] };
describe('ChartPrimitive', () => {
    it('renders with role="img"', () => { render(<ChartPrimitive {...props} />); expect(screen.getByRole('img')).toBeInTheDocument(); });
    it('has accessible label', () => { render(<ChartPrimitive {...props} />); expect(screen.getByRole('img')).toHaveAttribute('aria-label', expect.stringMatching(/chart/)); });
    it('has no axe violations', async () => { const { container } = render(<ChartPrimitive {...props} />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<ChartPrimitive ref={ref} {...props} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
