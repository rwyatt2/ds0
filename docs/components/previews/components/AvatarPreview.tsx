'use client';

import { Avatar } from '../../../../components/react/avatar';
import { Stack } from '../../../../components/react/stack';

export function AvatarPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-lg">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <Stack direction="horizontal" gap="3" align="center">
                    <Avatar size="sm" fallback="SM" alt="Small avatar" />
                    <Avatar size="md" fallback="MD" alt="Medium avatar" />
                    <Avatar size="lg" fallback="LG" alt="Large avatar" />
                    <Avatar size="xl" fallback="XL" alt="Extra large avatar" />
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Shapes</p>
                <Stack direction="horizontal" gap="3" align="center">
                    <Avatar shape="circle" fallback="CI" alt="Circle avatar" />
                    <Avatar shape="square" fallback="SQ" alt="Square avatar" />
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">With Image</p>
                <Stack direction="horizontal" gap="3" align="center">
                    <Avatar size="md" src="https://i.pravatar.cc/80?img=1" alt="User 1" fallback="U1" />
                    <Avatar size="md" src="https://i.pravatar.cc/80?img=2" alt="User 2" fallback="U2" />
                    <Avatar size="md" fallback="RW" alt="User with fallback" />
                </Stack>
            </div>
        </Stack>
    );
}
