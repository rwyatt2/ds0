'use client';

import { DatePicker } from '../../../../components/react/date-picker';
import { Stack } from '../../../../components/react/stack';

export function DatePickerPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-sm">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Default</p>
                <DatePicker placeholder="Pick a date" />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Disabled</p>
                <DatePicker placeholder="Disabled" isDisabled />
            </div>
        </Stack>
    );
}
