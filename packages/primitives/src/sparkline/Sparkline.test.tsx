import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SparklinePrimitive } from './Sparkline';
expect.extend(toHaveNoViolations);
describe('SparklinePrimitive', () => {
    it('renders with role="img"', () => { render(<SparklinePrimitive data={[1,2,3]} />); expect(screen.getByRole('img')).toBeInTheDocument(); });
    it('renders nothing for empty data', () => { render(<SparklinePrimitive data={[]} />); expect(screen.getByRole('img')).toBeInTheDocument(); });
    it('has accessible label', () => { render(<SparklinePrimitive data={[1,2,3]} />); expect(screen.getByRole('img')).toHaveAttribute('aria-label', expect.stringMatching(/Sparkline/)); });
    it('has no axe violations', async () => { const { container } = render(<SparklinePrimitive data={[1,2,3]} />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<SparklinePrimitive ref={ref} data={[1]} />); expect(ref).toHaveBeenCalledWith(expect.any(Element)); });
});
