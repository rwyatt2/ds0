import type { UseCookieConsentProps, UseCookieConsentReturn } from './CookieConsent.types';
export function useCookieConsent(props: UseCookieConsentProps = {}): UseCookieConsentReturn {
    return { cookieConsentProps: { role: 'dialog', 'aria-label': 'Cookie consent', 'aria-modal': false } };
}
