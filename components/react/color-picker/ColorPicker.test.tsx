import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ColorPicker } from './ColorPicker';
expect.extend(toHaveNoViolations);
describe('ColorPicker (Styled)', () => {
    it('renders trigger', () => { render(<ColorPicker />); expect(screen.getByRole('button')).toBeInTheDocument(); });
    it('merges className', () => { const { container } = render(<ColorPicker className="custom" />); expect(container.firstChild).toHaveClass('custom'); });
    it('has no axe violations', async () => { const { container } = render(<ColorPicker />); expect(await axe(container)).toHaveNoViolations(); });
});
