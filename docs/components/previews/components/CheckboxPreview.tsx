'use client';

import { useState } from 'react';
import { Check, Minus } from 'lucide-react';

export function CheckboxPreview(): React.ReactElement {
    const [checks, setChecks] = useState([true, false, false]);

    return (
        <div className="w-full max-w-sm space-y-3">
            {['Checked', 'Unchecked', 'Indeterminate'].map((label, i) => (
                <label key={label} className="flex items-center gap-3 cursor-pointer">
                    <button
                        type="button"
                        role="checkbox"
                        aria-checked={i === 2 ? 'mixed' : checks[i]}
                        onClick={() => {
                            if (i < 2) {
                                const next = [...checks];
                                next[i] = !next[i];
                                setChecks(next);
                            }
                        }}
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${i === 2
                                ? 'border-blue-600 bg-blue-600'
                                : checks[i]
                                    ? 'border-blue-600 bg-blue-600'
                                    : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900'
                            }`}
                    >
                        {i === 2 && <Minus className="h-3 w-3 text-white" />}
                        {i < 2 && checks[i] && <Check className="h-3 w-3 text-white" />}
                    </button>
                    <span className="text-sm text-gray-900 dark:text-gray-100">{label}</span>
                </label>
            ))}
        </div>
    );
}
