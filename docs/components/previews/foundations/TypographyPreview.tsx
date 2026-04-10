'use client';

import React from 'react';

const typeScale = [
    { name: 'xs', cls: 'text-xs', sample: 'The quick brown fox' },
    { name: 'sm', cls: 'text-sm', sample: 'The quick brown fox' },
    { name: 'base', cls: 'text-base', sample: 'The quick brown fox' },
    { name: 'lg', cls: 'text-lg', sample: 'The quick brown fox' },
    { name: 'xl', cls: 'text-xl', sample: 'The quick brown fox' },
    { name: '2xl', cls: 'text-2xl', sample: 'The quick brown fox' },
    { name: '3xl', cls: 'text-3xl font-bold', sample: 'Heading' },
];

export function TypographyPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md space-y-3">
            {typeScale.map(t => (
                <div key={t.name} className="flex items-baseline gap-3">
                    <span className="text-[10px] text-muted-foreground w-8 shrink-0 text-right">{t.name}</span>
                    <span className={t.cls}>{t.sample}</span>
                </div>
            ))}
        </div>
    );
}
