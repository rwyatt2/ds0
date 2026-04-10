'use client';

import { StatusDot } from '../../../../components/react/status-dot';
import { Stack } from '../../../../components/react/stack';

export function StatusDotPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-sm">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Variants</p>
                <Stack direction="horizontal" gap="4" align="center">
                    <Stack direction="horizontal" gap="2" align="center"><StatusDot variant="online" /><span className="text-sm">Online</span></Stack>
                    <Stack direction="horizontal" gap="2" align="center"><StatusDot variant="offline" /><span className="text-sm">Offline</span></Stack>
                    <Stack direction="horizontal" gap="2" align="center"><StatusDot variant="busy" /><span className="text-sm">Busy</span></Stack>
                    <Stack direction="horizontal" gap="2" align="center"><StatusDot variant="away" /><span className="text-sm">Away</span></Stack>
                    <Stack direction="horizontal" gap="2" align="center"><StatusDot variant="neutral" /><span className="text-sm">Neutral</span></Stack>
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <Stack direction="horizontal" gap="4" align="center">
                    <StatusDot variant="online" size="sm" />
                    <StatusDot variant="online" size="md" />
                    <StatusDot variant="online" size="lg" />
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">With pulse animation</p>
                <Stack direction="horizontal" gap="4" align="center">
                    <Stack direction="horizontal" gap="2" align="center"><StatusDot variant="online" pulse /><span className="text-sm">Live</span></Stack>
                    <Stack direction="horizontal" gap="2" align="center"><StatusDot variant="busy" pulse /><span className="text-sm">Recording</span></Stack>
                </Stack>
            </div>
        </Stack>
    );
}
