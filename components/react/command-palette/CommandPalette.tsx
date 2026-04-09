import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useCommandPalette } from '@ds0/primitives';
import type { StyledCommandPaletteProps } from '@ds0/primitives';
const CommandPalette = forwardRef<HTMLDivElement, StyledCommandPaletteProps>(({ className, items, open, onOpenChange, onSelect, placeholder, ...props }, ref) => {
    const { commandPaletteProps, inputProps, filteredItems } = useCommandPalette({ items, open, onOpenChange, onSelect });
    if (open === false) return null;
    const groups = [...new Set(filteredItems.map(i => i.group || ''))];
    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50" onClick={() => onOpenChange?.(false)}>
            <div ref={ref} className={cn('w-full max-w-lg rounded-xl border bg-card shadow-2xl overflow-hidden', className)} onClick={e => e.stopPropagation()} {...props} {...commandPaletteProps}>
                <div className="flex items-center gap-2 border-b px-4 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input {...inputProps} placeholder={placeholder || 'Type a command or search...'} className="flex-1 bg-transparent outline-none text-sm" autoFocus />
                    <kbd className="hidden sm:inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] text-muted-foreground">ESC</kbd>
                </div>
                <ul role="listbox" className="max-h-72 overflow-y-auto p-1">
                    {groups.map(g => (<React.Fragment key={g}>{g && <li className="px-3 py-1.5 text-xs font-medium text-muted-foreground">{g}</li>}{filteredItems.filter(i => (i.group || '') === g).map(i => (
                        <li key={i.id} role="option" onClick={() => { onSelect?.(i); i.onSelect?.(); onOpenChange?.(false); }} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-accent transition-colors">
                            <span className="flex items-center gap-2">{i.icon}{i.label}</span>
                            {i.shortcut && <kbd className="text-[10px] text-muted-foreground border rounded px-1.5 py-0.5">{i.shortcut}</kbd>}
                        </li>
                    ))}</React.Fragment>))}
                    {filteredItems.length === 0 && <li className="text-center text-sm text-muted-foreground py-6">No results found.</li>}
                </ul>
            </div>
        </div>
    );
});
CommandPalette.displayName = 'CommandPalette';
export { CommandPalette };
export type { StyledCommandPaletteProps as CommandPaletteProps };
