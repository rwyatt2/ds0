import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LinkPrimitive } from './Link';

expect.extend(toHaveNoViolations);

describe('LinkPrimitive', () => {
    it('renders as anchor with href', () => {
        render(<LinkPrimitive href="/about">About</LinkPrimitive>);
        const link = screen.getByRole('link', { name: 'About' });
        expect(link).toHaveAttribute('href', '/about');
    });

    it('opens in new tab when external', () => {
        render(<LinkPrimitive href="https://example.com" isExternal>External</LinkPrimitive>);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('has screen reader text for external links', () => {
        render(<LinkPrimitive href="https://example.com" isExternal>Ext</LinkPrimitive>);
        expect(screen.getByText('(opens in new tab)')).toBeInTheDocument();
    });

    it('sets aria-disabled when disabled', () => {
        render(<LinkPrimitive href="/about" isDisabled>About</LinkPrimitive>);
        expect(screen.getByText('About')).toHaveAttribute('aria-disabled', 'true');
    });

    it('has no axe violations', async () => {
        const { container } = render(<LinkPrimitive href="/about">About</LinkPrimitive>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
