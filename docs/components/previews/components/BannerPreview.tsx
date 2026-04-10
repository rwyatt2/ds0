'use client';

import { Banner } from '../../../../components/react/banner';
import { Stack } from '../../../../components/react/stack';

export function BannerPreview(): React.ReactElement {
    return (
        <Stack gap="3" className="w-full max-w-2xl">
            <Banner variant="info">
                📢 New feature available — check out the updated dashboard!
            </Banner>
            <Banner variant="success">
                ✅ Your changes have been saved successfully.
            </Banner>
            <Banner variant="warning" isDismissible>
                ⚠️ Scheduled maintenance tonight from 11 PM – 2 AM.
            </Banner>
            <Banner variant="error" isDismissible>
                🚨 Service disruption detected. Our team is investigating.
            </Banner>
        </Stack>
    );
}
