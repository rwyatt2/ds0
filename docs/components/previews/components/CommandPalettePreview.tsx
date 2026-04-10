'use client';

import React, { useState } from 'react';
import { CommandPalette } from '../../../../components/react/command-palette';

const commands = [
    { id: '1', label: 'Go to Dashboard', group: 'Navigation', shortcut: '⌘D' },
    { id: '2', label: 'Go to Settings', group: 'Navigation', shortcut: '⌘,' },
    { id: '3', label: 'Go to Profile', group: 'Navigation' },
    { id: '4', label: 'Create New File', group: 'Actions', shortcut: '⌘N' },
    { id: '5', label: 'Search Files', group: 'Actions', shortcut: '⌘P' },
    { id: '6', label: 'Toggle Dark Mode', group: 'Actions' },
    { id: '7', label: 'Sign Out', group: 'Account' },
    { id: '8', label: 'View Documentation', group: 'Help' },
];

export function CommandPalettePreview(): React.ReactElement {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col items-center gap-3 py-4">
            <button
                onClick={() => setOpen(true)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
            >
                Open Command Palette
                <kbd className="pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    ⌘K
                </kbd>
            </button>
            <CommandPalette
                items={commands}
                open={open}
                onOpenChange={setOpen}
                onSelect={() => setOpen(false)}
                placeholder="Type a command or search..."
            />
        </div>
    );
}
