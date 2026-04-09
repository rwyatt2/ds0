'use client';

import { useState } from 'react';
import { Button } from '../../../../components/react/button';
import { Stack } from '../../../../components/react/stack';

export function ButtonPreview(): React.ReactElement {
    const [loading, setLoading] = useState(false);

    return (
        <div className="w-full max-w-2xl space-y-6">
            {/* Variants */}
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Variants</p>
                <Stack direction="horizontal" gap="3" align="center">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="outline">Outline</Button>
                </Stack>
            </div>

            {/* Sizes */}
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <Stack direction="horizontal" gap="3" align="center">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                </Stack>
            </div>

            {/* States */}
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">States</p>
                <Stack direction="horizontal" gap="3" align="center">
                    <Button isDisabled>Disabled</Button>
                    <Button
                        isLoading={loading}
                        loadingText="Saving..."
                        onClick={() => {
                            setLoading(true);
                            setTimeout(() => setLoading(false), 2000);
                        }}
                    >
                        Click to Load
                    </Button>
                </Stack>
            </div>
        </div>
    );
}
