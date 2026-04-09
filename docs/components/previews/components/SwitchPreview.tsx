'use client';

import { useState } from 'react';
import { Switch } from '../../../../components/react/switch';
import { Stack } from '../../../../components/react/stack';

export function SwitchPreview(): React.ReactElement {
    const [enabled, setEnabled] = useState(false);
    const [dark, setDark] = useState(true);

    return (
        <Stack gap="4" className="w-full max-w-sm">
            <Switch
                label="Enable notifications"
                checked={enabled}
                onCheckedChange={setEnabled}
            />
            <Switch
                label="Dark mode"
                checked={dark}
                onCheckedChange={setDark}
            />
            <Switch label="Disabled (off)" isDisabled />
            <Switch label="Disabled (on)" isDisabled checked />
        </Stack>
    );
}
