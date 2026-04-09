'use client';

import { Badge } from '../../../../components/react/badge';
import { Stack } from '../../../../components/react/stack';

export function BadgePreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-lg">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Variants</p>
                <Stack direction="horizontal" gap="2" align="center">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <Stack direction="horizontal" gap="2" align="center">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="md">Large</Badge>
                </Stack>
            </div>
        </Stack>
    );
}
