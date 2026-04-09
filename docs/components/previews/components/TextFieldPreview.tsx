'use client';

import { useState } from 'react';
import { TextField } from '../../../../components/react/text-field';
import { Stack } from '../../../../components/react/stack';

export function TextFieldPreview(): React.ReactElement {
    const [value, setValue] = useState('');

    return (
        <Stack gap="4" className="w-full max-w-sm">
            <TextField
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                placeholder="••••••••"
            />
            <TextField
                label="With helper text"
                helperText="This is some helpful text."
                placeholder="Type here..."
            />
            <TextField
                label="Error state"
                errorMessage="This field is required."
                isRequired
            />
            <TextField
                label="Disabled"
                value="Can't edit this"
                isDisabled
            />
        </Stack>
    );
}
