'use client';

import { Divider } from '../../../../components/react/divider';
import { Text } from '../../../../components/react/text';
import { Stack } from '../../../../components/react/stack';

export function DividerPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg space-y-6">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Horizontal</p>
                <Stack gap="3">
                    <Text>Content above</Text>
                    <Divider />
                    <Text>Content below</Text>
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Vertical</p>
                <Stack direction="horizontal" gap="3" align="center" className="h-10">
                    <Text size="sm">Left</Text>
                    <Divider orientation="vertical" />
                    <Text size="sm">Right</Text>
                </Stack>
            </div>
        </div>
    );
}
