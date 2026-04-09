'use client';

import { Spinner } from '../../../../components/react/spinner';
import { Stack } from '../../../../components/react/stack';

export function SpinnerPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-lg">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <Stack direction="horizontal" gap="4" align="center">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                </Stack>
            </div>
        </Stack>
    );
}
