import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DividerPrimitive } from './Divider';

expect.extend(toHaveNoViolations);

describe('DividerPrimitive', () => {
    it('renders with role="none" when decorative (default)', () => {
        const { container } = render(<DividerPrimitive />);
        expect(container.firstChild).toHaveAttribute('role', 'none');
    });
    it('renders with role="separator" when not decorative', () => {
        render(<DividerPrimitive decorative={false} />);
        expect(screen.getByRole('separator')).toBeInTheDocument();
    });
    it('sets aria-orientation when semantic', () => {
        render(<DividerPrimitive decorative={false} orientation="vertical" />);
        expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
    });
    it('has no axe violations', async () => {
        const { container } = render(<DividerPrimitive />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
