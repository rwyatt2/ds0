import { render, screen } from '@testing-library/react';
import { CookieConsent } from './CookieConsent';
describe('CookieConsent (Styled)', () => { it('renders', () => { render(<CookieConsent />); expect(screen.getByRole('dialog')).toBeInTheDocument(); }); });
