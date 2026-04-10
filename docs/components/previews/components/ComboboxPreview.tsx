'use client';

import { Combobox } from '../../../../components/react/combobox';
import { Stack } from '../../../../components/react/stack';

const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'SolidJS', 'Next.js', 'Nuxt', 'Astro'];

export function ComboboxPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-sm">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Search frameworks</p>
                <Combobox
                    items={frameworks}
                    placeholder="Search frameworks..."
                />
            </div>
        </Stack>
    );
}
