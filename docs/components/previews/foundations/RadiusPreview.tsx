'use client';

import React from 'react';

const radii = [
    { name: 'none', cls: 'rounded-none' },
    { name: 'sm', cls: 'rounded-sm' },
    { name: 'md', cls: 'rounded-md' },
    { name: 'lg', cls: 'rounded-lg' },
    { name: 'xl', cls: 'rounded-xl' },
    { name: 'full', cls: 'rounded-full' },
];

export function RadiusPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md">
            <div className="grid grid-cols-6 gap-3">
                {radii.map(r => (
                    <div key={r.name} className="text-center">
                        <div className={`w-full aspect-square bg-primary/20 border-2 border-primary/40 ${r.cls}`} />
                        <span className="text-[10px] text-muted-foreground mt-1 block">{r.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
