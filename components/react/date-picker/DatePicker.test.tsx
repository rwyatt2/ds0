import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DatePicker } from './DatePicker';
expect.extend(toHaveNoViolations);
describe('DatePicker (Styled)', () => {
    it('renders input', () => { render(<DatePicker />); expect(screen.getByRole('textbox')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<DatePicker />); expect(await axe(container)).toHaveNoViolations(); });
    it('merges className', () => { const { container } = render(<DatePicker className="custom" />); expect(container.firstChild).toHaveClass('custom'); });
});
