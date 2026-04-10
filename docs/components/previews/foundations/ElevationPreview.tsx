'use client';

import React from 'react';

const levels = [
    { name: 'None', shadow: 'shadow-none' },
    { name: 'SM', shadow: 'shadow-sm' },
    { name: 'MD', shadow: 'shadow-md' },
    { name: 'LG', shadow: 'shadow-lg' },
    { name: 'XL', shadow: 'shadow-xl' },
    { name: '2XL', shadow: 'shadow-2xl' },
];

export function ElevationPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg">
            <div className="grid grid-cols-3 gap-4">
                {levels.map(l => (
                    <div key={l.name} className={`rounded-lg border bg-card p-4 text-center ${l.shadow}`}>
                        <span className="text-xs font-medium">{l.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
