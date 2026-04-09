import { render } from '@testing-library/react-native';
import { CookieConsent } from './CookieConsent';
describe('CookieConsent (Native)', () => { it('renders', () => { const { toJSON } = render(<CookieConsent />); expect(toJSON()).not.toBeNull(); }); });
