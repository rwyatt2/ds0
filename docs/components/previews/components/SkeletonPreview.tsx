'use client';

import { Skeleton } from '../../../../components/react/skeleton';
import { Stack } from '../../../../components/react/stack';

export function SkeletonPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-sm">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Shapes</p>
                <Stack gap="3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Card skeleton</p>
                <Stack direction="horizontal" gap="3" align="start">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Stack gap="2" className="flex-1">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                    </Stack>
                </Stack>
            </div>
        </Stack>
    );
}
