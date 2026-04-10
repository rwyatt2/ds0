'use client';

import React from 'react';

export function DataDisplayPatternPreview(): React.ReactElement {
    const cards = [
        { title: 'Total Users', value: '12,847', change: '+12%' },
        { title: 'Revenue', value: '$48.2k', change: '+8.3%' },
        { title: 'Active Sessions', value: '1,429', change: '-2.1%' },
    ];

    return (
        <div className="w-full max-w-2xl grid grid-cols-3 gap-3">
            {cards.map(c => (
                <div key={c.title} className="rounded-lg border bg-card p-4">
                    <p className="text-xs text-muted-foreground mb-1">{c.title}</p>
                    <p className="text-xl font-bold">{c.value}</p>
                    <p className={`text-xs mt-1 ${c.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{c.change} from last month</p>
                </div>
            ))}
        </div>
    );
}
