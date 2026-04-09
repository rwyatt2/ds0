import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CookieConsentPrimitive } from './CookieConsent';
expect.extend(toHaveNoViolations);
describe('CookieConsentPrimitive', () => {
    it('renders', () => { render(<CookieConsentPrimitive />); expect(screen.getByRole('dialog')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<CookieConsentPrimitive />); expect(await axe(container)).toHaveNoViolations(); });
});
