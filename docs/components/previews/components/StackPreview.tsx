'use client';

import { Stack } from '../../../../components/react/stack';
import { Button } from '../../../../components/react/button';

export function StackPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg space-y-6">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Vertical (default)</p>
                <Stack gap="3">
                    <div className="h-10 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm">Item 1</div>
                    <div className="h-10 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm">Item 2</div>
                    <div className="h-10 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm">Item 3</div>
                </Stack>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Horizontal</p>
                <Stack direction="horizontal" gap="3" align="center">
                    <Button variant="primary">Save</Button>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="ghost">Reset</Button>
                </Stack>
            </div>
        </div>
    );
}
