import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Sparkline } from './Sparkline';
expect.extend(toHaveNoViolations);
describe('Sparkline (Styled)', () => {
    it('renders', () => { render(<Sparkline data={[1,2,3]} />); expect(screen.getByRole('img')).toBeInTheDocument(); });
    it('merges className', () => { render(<Sparkline data={[1,2]} className="custom" />); expect(screen.getByRole('img')).toHaveClass('custom'); });
    it('has no axe violations', async () => { const { container } = render(<Sparkline data={[1,2,3]} />); expect(await axe(container)).toHaveNoViolations(); });
});
