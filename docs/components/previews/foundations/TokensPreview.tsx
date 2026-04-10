'use client';

import React from 'react';

const layers = [
    { name: 'Core', desc: 'Raw values (gray-500, blue-600)', color: 'bg-blue-500/20 border-blue-500/30' },
    { name: 'Semantic', desc: 'Mapped meanings (primary, destructive)', color: 'bg-green-500/20 border-green-500/30' },
    { name: 'Component', desc: 'Per-component overrides (button-bg)', color: 'bg-purple-500/20 border-purple-500/30' },
];

export function TokensPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md space-y-2">
            {layers.map((l, i) => (
                <div key={l.name} className={`rounded-lg border p-3 ${l.color}`} style={{ marginLeft: i * 16 }}>
                    <p className="text-xs font-semibold">{l.name} Tokens</p>
                    <p className="text-[10px] text-muted-foreground">{l.desc}</p>
                </div>
            ))}
        </div>
    );
}
