'use client';

import { useState } from 'react';

export function SwitchPreview(): React.ReactElement {
    const [checks, setChecks] = useState([true, false, true]);
    const labels = ['Dark Mode', 'Notifications', 'Auto-save'];
    const switchSizes = ['sm', 'md', 'lg'] as const;

    return (
        <div className="w-full max-w-sm space-y-6">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Interactive</p>
                <div className="space-y-3">
                    {labels.map((label, i) => (
                        <label key={label} className="flex items-center justify-between cursor-pointer">
                            <span className="text-sm text-gray-900 dark:text-gray-100">{label}</span>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={checks[i]}
                                onClick={() => {
                                    const next = [...checks];
                                    next[i] = !next[i];
                                    setChecks(next);
                                }}
                                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${checks[i] ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform mt-0.5 ${checks[i] ? 'translate-x-[22px]' : 'translate-x-0.5'
                                        }`}
                                />
                            </button>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</p>
                <div className="flex items-center gap-4">
                    {switchSizes.map((s) => {
                        const dims = s === 'sm' ? 'h-5 w-9' : s === 'lg' ? 'h-7 w-[52px]' : 'h-6 w-11';
                        const thumb = s === 'sm' ? 'h-4 w-4' : s === 'lg' ? 'h-6 w-6' : 'h-5 w-5';
                        return (
                            <div key={s} className={`relative inline-flex ${dims} shrink-0 rounded-full bg-blue-600`}>
                                <span className={`inline-block ${thumb} rounded-full bg-white shadow mt-0.5 translate-x-[calc(100%-2px)]`} style={{ marginLeft: '2px' }} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
