import { forwardRef } from 'react';
import type { CommandPaletteProps } from './CommandPalette.types';
import { useCommandPalette } from './useCommandPalette';
const CommandPalettePrimitive = forwardRef<HTMLDivElement, CommandPaletteProps>(({ items, open, onOpenChange, onSelect, placeholder, ...rest }, ref) => {
    const { commandPaletteProps, inputProps, filteredItems } = useCommandPalette({ items, open, onOpenChange, onSelect });
    if (open === false) return null;
    return (<div ref={ref} {...rest} {...commandPaletteProps}><input {...inputProps} placeholder={placeholder || 'Search...'} /><ul role="listbox">{filteredItems.map(i => <li key={i.id} role="option" onClick={() => { onSelect?.(i); i.onSelect?.(); }}>{i.label}{i.shortcut && <kbd>{i.shortcut}</kbd>}</li>)}</ul></div>);
});
CommandPalettePrimitive.displayName = 'CommandPalettePrimitive';
export { CommandPalettePrimitive };
