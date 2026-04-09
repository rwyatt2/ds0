import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { RichTextPrimitive } from './RichText';
expect.extend(toHaveNoViolations);
describe('RichTextPrimitive', () => {
    it('renders editor', () => { render(<RichTextPrimitive />); expect(screen.getByRole('textbox')).toBeInTheDocument(); });
    it('has correct aria-multiline', () => { render(<RichTextPrimitive />); expect(screen.getByRole('textbox')).toHaveAttribute('aria-multiline', 'true'); });
    it('renders toolbar', () => { render(<RichTextPrimitive><button>Bold</button></RichTextPrimitive>); expect(screen.getByRole('toolbar')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<RichTextPrimitive />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<RichTextPrimitive ref={ref} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
