import type React from 'react';
export interface UseCookieConsentProps { onAccept?: () => void; onDecline?: () => void; onCustomize?: () => void; }
export interface UseCookieConsentReturn { cookieConsentProps: React.HTMLAttributes<HTMLDivElement>; }
export interface CookieConsentProps extends React.HTMLAttributes<HTMLDivElement>, UseCookieConsentProps { message?: string; privacyUrl?: string; }
export interface StyledCookieConsentProps extends CookieConsentProps { variant?: 'banner' | 'popup'; position?: 'bottom' | 'top'; className?: string; }
