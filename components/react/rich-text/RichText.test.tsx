import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { RichText } from './RichText';
expect.extend(toHaveNoViolations);
describe('RichText (Styled)', () => {
    it('renders editor', () => { render(<RichText />); expect(screen.getByRole('textbox')).toBeInTheDocument(); });
    it('renders toolbar', () => { render(<RichText />); expect(screen.getByRole('toolbar')).toBeInTheDocument(); });
    it('merges className', () => { const { container } = render(<RichText className="custom" />); expect(container.firstChild).toHaveClass('custom'); });
    it('has no axe violations', async () => { const { container } = render(<RichText />); expect(await axe(container)).toHaveNoViolations(); });
});
