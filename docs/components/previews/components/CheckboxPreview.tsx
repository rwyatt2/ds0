'use client';

import { useState } from 'react';
import { Checkbox } from '../../../../components/react/checkbox';
import { Stack } from '../../../../components/react/stack';

export function CheckboxPreview(): React.ReactElement {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);

    return (
        <Stack gap="4" className="w-full max-w-sm">
            <Checkbox
                label="Accept terms and conditions"
                checked={checked1}
                onCheckedChange={(c) => setChecked1(c === true)}
            />
            <Checkbox
                label="Send me marketing emails"
                checked={checked2}
                onCheckedChange={(c) => setChecked2(c === true)}
            />
            <Checkbox label="Disabled unchecked" isDisabled />
            <Checkbox label="Disabled checked" isDisabled checked />
        </Stack>
    );
}
