'use client';

import React from 'react';

const palette = [
    { name: 'Primary', shades: ['bg-primary/10', 'bg-primary/30', 'bg-primary/50', 'bg-primary/70', 'bg-primary'] },
    { name: 'Destructive', shades: ['bg-destructive/10', 'bg-destructive/30', 'bg-destructive/50', 'bg-destructive/70', 'bg-destructive'] },
    { name: 'Muted', shades: ['bg-muted/20', 'bg-muted/40', 'bg-muted/60', 'bg-muted/80', 'bg-muted'] },
];

const semantics = [
    { name: 'Background', cls: 'bg-background border' },
    { name: 'Card', cls: 'bg-card border' },
    { name: 'Accent', cls: 'bg-accent' },
    { name: 'Primary', cls: 'bg-primary' },
    { name: 'Destructive', cls: 'bg-destructive' },
    { name: 'Muted', cls: 'bg-muted' },
];

export function ColorsPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg space-y-5">
            <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Semantic Colors</p>
                <div className="grid grid-cols-6 gap-2">
                    {semantics.map(s => (
                        <div key={s.name} className="text-center">
                            <div className={`w-full aspect-square rounded-lg ${s.cls}`} />
                            <span className="text-[10px] text-muted-foreground mt-1 block">{s.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Opacity Scale</p>
                {palette.map(p => (
                    <div key={p.name} className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] text-muted-foreground w-16">{p.name}</span>
                        <div className="flex gap-1.5 flex-1">{p.shades.map((s, i) => <div key={i} className={`h-6 flex-1 rounded ${s}`} />)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
