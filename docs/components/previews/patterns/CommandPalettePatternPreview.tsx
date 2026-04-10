'use client';

import React, { useState } from 'react';

export function CommandPalettePatternPreview(): React.ReactElement {
    const [open, setOpen] = useState(true);
    const commands = [
        { group: 'Pages', items: [{ label: 'Dashboard', shortcut: '⌘D' }, { label: 'Settings', shortcut: '⌘,' }] },
        { group: 'Actions', items: [{ label: 'New File', shortcut: '⌘N' }, { label: 'Search', shortcut: '⌘K' }] },
    ];

    return (
        <div className="w-full max-w-md">
            <div className="rounded-lg border bg-card shadow-lg overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 border-b">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" placeholder="Type a command or search..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                    <kbd className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono text-muted-foreground">ESC</kbd>
                </div>
                {commands.map(g => (
                    <div key={g.group}>
                        <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{g.group}</div>
                        {g.items.map((item, i) => (
                            <div key={item.label} className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer ${i === 0 && g.group === 'Pages' ? 'bg-accent' : 'hover:bg-accent/50'}`}>
                                <span>{item.label}</span>
                                <kbd className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono text-muted-foreground">{item.shortcut}</kbd>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
