'use client';

import { Alert } from '../../../../components/react/alert';
import { Stack } from '../../../../components/react/stack';

export function AlertPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-lg">
            <Alert variant="default">
                <Alert.Title>Default Alert</Alert.Title>
                <Alert.Description>This is a default alert for general information.</Alert.Description>
            </Alert>
            <Alert variant="info">
                <Alert.Title>Info</Alert.Title>
                <Alert.Description>Your trial expires in 3 days.</Alert.Description>
            </Alert>
            <Alert variant="success">
                <Alert.Title>Success</Alert.Title>
                <Alert.Description>Your changes have been saved.</Alert.Description>
            </Alert>
            <Alert variant="warning">
                <Alert.Title>Warning</Alert.Title>
                <Alert.Description>This action cannot be undone easily.</Alert.Description>
            </Alert>
            <Alert variant="destructive">
                <Alert.Title>Error</Alert.Title>
                <Alert.Description>Failed to save. Please try again.</Alert.Description>
            </Alert>
            <Alert variant="info" isDismissible>
                <Alert.Title>Dismissible</Alert.Title>
                <Alert.Description>Click the X to dismiss this alert.</Alert.Description>
            </Alert>
        </Stack>
    );
}
