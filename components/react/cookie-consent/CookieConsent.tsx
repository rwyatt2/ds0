import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useCookieConsent } from '@ds0/primitives';
import type { StyledCookieConsentProps } from '@ds0/primitives';
const CookieConsent = forwardRef<HTMLDivElement, StyledCookieConsentProps>(({ className, variant = 'banner', position = 'bottom', onAccept, onDecline, onCustomize, message, privacyUrl, ...props }, ref) => {
    const { cookieConsentProps } = useCookieConsent({ onAccept, onDecline, onCustomize });
    return (
        <div ref={ref} className={cn('fixed left-0 right-0 z-50 p-4', position === 'bottom' ? 'bottom-0' : 'top-0', variant === 'popup' ? 'flex justify-center' : '', className)} {...props}>
            <div className={cn('flex items-center justify-between gap-4 rounded-lg border bg-card p-4 shadow-lg', variant === 'popup' ? 'max-w-lg flex-col text-center' : 'w-full')} {...cookieConsentProps}>
                <p className="text-sm text-muted-foreground flex-1">{message || 'We use cookies to improve your experience.'} {privacyUrl && <a href={privacyUrl} className="underline hover:text-foreground">Privacy Policy</a>}</p>
                <div className="flex items-center gap-2 shrink-0">
                    <button onClick={onDecline} className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent transition-colors">Decline</button>
                    {onCustomize && <button onClick={onCustomize} className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent transition-colors">Customize</button>}
                    <button onClick={onAccept} className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors">Accept All</button>
                </div>
            </div>
        </div>
    );
});
CookieConsent.displayName = 'CookieConsent';
export { CookieConsent };
export type { StyledCookieConsentProps as CookieConsentProps };
