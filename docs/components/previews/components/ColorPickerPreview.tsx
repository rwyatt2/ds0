'use client';

import { ColorPicker } from '../../../../components/react/color-picker';
import { Stack } from '../../../../components/react/stack';

const swatches = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#000000'];

export function ColorPickerPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-lg">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Default (click swatch to open)</p>
                <ColorPicker defaultValue="#3b82f6" swatches={swatches} />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Inline variant</p>
                <ColorPicker variant="inline" defaultValue="#8b5cf6" swatches={swatches} />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Disabled</p>
                <ColorPicker defaultValue="#ef4444" isDisabled />
            </div>
        </Stack>
    );
}
