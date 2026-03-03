'use client';

import { useState } from 'react';

export function SliderPreview(): React.ReactElement {
    const [value, setValue] = useState(50);

    return (
        <div className="w-full max-w-sm space-y-4">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Volume</label>
                    <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{value}%</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full accent-blue-600"
                />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Custom Styled</p>
                <div className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                        className="absolute h-2 rounded-full bg-blue-600"
                        style={{ width: `${value}%` }}
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-blue-600 shadow cursor-pointer"
                        style={{ left: `calc(${value}% - 10px)` }}
                    />
                </div>
            </div>
        </div>
    );
}
