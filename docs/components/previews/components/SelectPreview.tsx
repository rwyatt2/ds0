'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const options = ['React', 'Vue', 'Angular', 'Svelte'];

export function SelectPreview(): React.ReactElement {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('');

    return (
        <div className="w-full max-w-sm space-y-1.5">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Framework</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 hover:bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                    <span className={selected ? '' : 'text-gray-400 dark:text-gray-500'}>
                        {selected || 'Select framework...'}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && (
                    <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:bg-gray-900 dark:border-gray-700">
                        {options.map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => { setSelected(opt); setOpen(false); }}
                                className={`flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${selected === opt ? 'text-blue-600 font-medium dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
