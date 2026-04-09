import { forwardRef } from 'react';
import type { CookieConsentProps } from './CookieConsent.types';
import { useCookieConsent } from './useCookieConsent';
const CookieConsentPrimitive = forwardRef<HTMLDivElement, CookieConsentProps>(({ onAccept, onDecline, onCustomize, message, privacyUrl, ...rest }, ref) => {
    const { cookieConsentProps } = useCookieConsent({ onAccept, onDecline, onCustomize });
    return (<div ref={ref} {...rest} {...cookieConsentProps}><p>{message || 'We use cookies to improve your experience.'}</p>{privacyUrl && <a href={privacyUrl}>Privacy Policy</a>}<div><button onClick={onDecline}>Decline</button>{onCustomize && <button onClick={onCustomize}>Customize</button>}<button onClick={onAccept}>Accept</button></div></div>);
});
CookieConsentPrimitive.displayName = 'CookieConsentPrimitive';
export { CookieConsentPrimitive };
