'use client';

import { Input } from '../../../../components/react/input';
import { Stack } from '../../../../components/react/stack';

export function InputPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-lg">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Default</p>
                <Stack gap="2">
                    <Input placeholder="Enter text..." />
                    <Input type="email" placeholder="Email address" />
                    <Input type="password" placeholder="Password" />
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <Stack gap="2">
                    <Input size="sm" placeholder="Small input" />
                    <Input size="md" placeholder="Medium input" />
                    <Input size="lg" placeholder="Large input" />
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">States</p>
                <Stack gap="2">
                    <Input placeholder="Disabled" isDisabled />
                    <Input placeholder="Read only" isReadOnly defaultValue="Read only value" />
                    <Input placeholder="Invalid" isInvalid />
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Ghost Variant</p>
                <Input variant="ghost" placeholder="Ghost input — hover me" />
            </div>
        </Stack>
    );
}
