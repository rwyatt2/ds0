'use client';

import { Tag } from '../../../../components/react/tag';
import { Stack } from '../../../../components/react/stack';

export function TagPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-lg">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Variants</p>
                <Stack direction="horizontal" gap="2" align="center" className="flex-wrap">
                    <Tag>Default</Tag>
                    <Tag variant="primary">Primary</Tag>
                    <Tag variant="secondary">Secondary</Tag>
                    <Tag variant="destructive">Destructive</Tag>
                    <Tag variant="outline">Outline</Tag>
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <Stack direction="horizontal" gap="2" align="center">
                    <Tag size="sm">Small</Tag>
                    <Tag size="md">Medium</Tag>
                    <Tag size="lg">Large</Tag>
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Removable</p>
                <Stack direction="horizontal" gap="2" align="center" className="flex-wrap">
                    <Tag variant="primary" isRemovable onRemove={() => {}}>React</Tag>
                    <Tag variant="secondary" isRemovable onRemove={() => {}}>TypeScript</Tag>
                    <Tag variant="outline" isRemovable onRemove={() => {}}>Tailwind</Tag>
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Disabled</p>
                <Stack direction="horizontal" gap="2" align="center">
                    <Tag isDisabled>Disabled</Tag>
                    <Tag variant="primary" isDisabled isRemovable>Disabled Removable</Tag>
                </Stack>
            </div>
        </Stack>
    );
}
