'use client';

import { AvatarGroup } from '../../../../components/react/avatar-group';
import { Stack } from '../../../../components/react/stack';

const avatars = [
    { id: '1', name: 'Alice', src: 'https://i.pravatar.cc/80?u=alice' },
    { id: '2', name: 'Bob', src: 'https://i.pravatar.cc/80?u=bob' },
    { id: '3', name: 'Carol', src: 'https://i.pravatar.cc/80?u=carol' },
    { id: '4', name: 'Dan', src: 'https://i.pravatar.cc/80?u=dan' },
    { id: '5', name: 'Eve', src: 'https://i.pravatar.cc/80?u=eve' },
    { id: '6', name: 'Frank', src: 'https://i.pravatar.cc/80?u=frank' },
];

export function AvatarGroupPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-sm">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Default (max 4)</p>
                <AvatarGroup avatars={avatars} max={4} />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Large size (max 3)</p>
                <AvatarGroup avatars={avatars} max={3} size="lg" />
            </div>
        </Stack>
    );
}
