'use client';

import { useState } from 'react';

const options = ['Small', 'Medium', 'Large'];

export function RadioGroupPreview(): React.ReactElement {
    const [selected, setSelected] = useState('Medium');

    return (
        <div className="w-full max-w-sm space-y-3">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Size</p>
            {options.map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <button
                        type="button"
                        role="radio"
                        aria-checked={selected === opt}
                        onClick={() => setSelected(opt)}
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${selected === opt
                                ? 'border-blue-600'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}
                    >
                        {selected === opt && (
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                        )}
                    </button>
                    <span className="text-sm text-gray-900 dark:text-gray-100">{opt}</span>
                </label>
            ))}
        </div>
    );
}
