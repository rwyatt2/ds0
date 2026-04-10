'use client';

import { Notification } from '../../../../components/react/notification';
import { Stack } from '../../../../components/react/stack';

export function NotificationPreview(): React.ReactElement {
    return (
        <Stack gap="3" className="w-full max-w-lg">
            <Notification variant="info" title="Update available">
                A new version of DS0 is available. Please update to get the latest features.
            </Notification>
            <Notification variant="success" title="Payment received">
                Your payment of $49.99 has been processed successfully.
            </Notification>
            <Notification variant="warning" title="Storage almost full" isDismissible>
                You have used 90% of your storage quota. Consider upgrading your plan.
            </Notification>
            <Notification variant="error" title="Upload failed" isDismissible>
                The file could not be uploaded. Please check your connection and try again.
            </Notification>
        </Stack>
    );
}
