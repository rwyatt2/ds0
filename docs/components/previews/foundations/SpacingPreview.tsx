'use client';

import React from 'react';

const spacings = [
    { name: '1', px: '4px', cls: 'w-1' },
    { name: '2', px: '8px', cls: 'w-2' },
    { name: '3', px: '12px', cls: 'w-3' },
    { name: '4', px: '16px', cls: 'w-4' },
    { name: '6', px: '24px', cls: 'w-6' },
    { name: '8', px: '32px', cls: 'w-8' },
    { name: '12', px: '48px', cls: 'w-12' },
    { name: '16', px: '64px', cls: 'w-16' },
];

export function SpacingPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md space-y-1.5">
            {spacings.map(s => (
                <div key={s.name} className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground w-6 text-right">{s.name}</span>
                    <div className={`h-4 bg-primary/70 rounded-sm ${s.cls}`} />
                    <span className="text-[10px] text-muted-foreground">{s.px}</span>
                </div>
            ))}
        </div>
    );
}
