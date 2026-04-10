'use client';

import { Calendar } from '../../../../components/react/calendar';
import { Stack } from '../../../../components/react/stack';

export function CalendarPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-md" align="center">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Default</p>
                <Calendar />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Bordered variant</p>
                <Calendar variant="bordered" />
            </div>
        </Stack>
    );
}
