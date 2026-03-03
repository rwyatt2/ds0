import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AvatarPrimitive } from './Avatar';

expect.extend(toHaveNoViolations);

describe('AvatarPrimitive', () => {
    it('renders fallback when no src', () => {
        render(<AvatarPrimitive alt="John Doe" />);
        expect(screen.getByText('JO')).toBeInTheDocument();
    });

    it('renders string fallback with initials', () => {
        render(<AvatarPrimitive alt="John Doe" fallback="JD" />);
        expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('has role="img" and aria-label when showing fallback', () => {
        render(<AvatarPrimitive alt="John Doe" />);
        expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'John Doe');
    });

    it('has no axe violations with fallback', async () => {
        const { container } = render(<AvatarPrimitive alt="John Doe" fallback="JD" />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
