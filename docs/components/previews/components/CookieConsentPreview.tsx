'use client';

import { CookieConsent } from '../../../../components/react/cookie-consent';

export function CookieConsentPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg relative">
            <div className="border rounded-lg p-4 bg-card">
                <CookieConsent
                    variant="banner"
                    message="We use cookies to improve your experience. By continuing, you agree to our cookie policy."
                    privacyUrl="#"
                    onAccept={() => {}}
                    onDecline={() => {}}
                    className="!fixed-none !static !p-0"
                />
            </div>
        </div>
    );
}
