'use client';

import React, { useState } from 'react';

const durations = [
    { name: '75ms', cls: 'duration-75' },
    { name: '150ms', cls: 'duration-150' },
    { name: '300ms', cls: 'duration-300' },
    { name: '500ms', cls: 'duration-500' },
];

export function MotionPreview(): React.ReactElement {
    const [active, setActive] = useState(false);

    return (
        <div className="w-full max-w-md">
            <button onClick={() => setActive(!active)} className="mb-4 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
                Toggle Animation
            </button>
            <div className="grid grid-cols-4 gap-3">
                {durations.map(d => (
                    <div key={d.name} className="text-center">
                        <div className={`w-full h-12 rounded-lg bg-primary transition-all ${d.cls} ${active ? 'scale-110 opacity-100' : 'scale-100 opacity-60'}`} />
                        <span className="text-[10px] text-muted-foreground mt-1 block">{d.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
