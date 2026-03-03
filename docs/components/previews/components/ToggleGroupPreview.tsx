'use client';

import { useState } from 'react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

const options = [
    { icon: AlignLeft, label: 'Left' },
    { icon: AlignCenter, label: 'Center' },
    { icon: AlignRight, label: 'Right' },
    { icon: AlignJustify, label: 'Justify' },
];

export function ToggleGroupPreview(): React.ReactElement {
    const [selected, setSelected] = useState('Left');

    return (
        <div className="w-full max-w-sm">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Text Alignment</p>
            <div className="inline-flex rounded-lg border border-gray-200 p-1 dark:border-gray-700">
                {options.map((opt) => {
                    const Icon = opt.icon;
                    const active = selected === opt.label;
                    return (
                        <button
                            key={opt.label}
                            type="button"
                            onClick={() => setSelected(opt.label)}
                            className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors ${active
                                    ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'
                                }`}
                            aria-label={opt.label}
                        >
                            <Icon className="h-4 w-4" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
