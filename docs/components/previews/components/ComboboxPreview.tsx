'use client';

import { Combobox } from '../../../../components/react/combobox';
import { Stack } from '../../../../components/react/stack';

const frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'SolidJS' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt' },
    { value: 'astro', label: 'Astro' },
];

export function ComboboxPreview(): React.ReactElement {
    return (
        <Stack gap="4" className="w-full max-w-sm">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Search frameworks</p>
                <Combobox
                    items={frameworks}
                    getLabel={(item: { value: string; label: string }) => item.label}
                    placeholder="Search frameworks..."
                />
            </div>
        </Stack>
    );
}
