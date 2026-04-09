import React, { forwardRef, useRef, useEffect } from 'react';
import { cn } from '@ds0/primitives';
import { useCombobox } from '@ds0/primitives';
import type { StyledComboboxProps } from '@ds0/primitives';

const Combobox = forwardRef<HTMLDivElement, StyledComboboxProps>(
    ({ items, value, defaultValue, onValueChange, filterFn, getLabel, placeholder, className, ...props }, ref) => {
        const combobox = useCombobox({ items, value, defaultValue, onValueChange, filterFn, getLabel });
        const containerRef = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
            if (!combobox.isOpen) return;
            const handle = (e: MouseEvent) => { if (containerRef.current && !containerRef.current.contains(e.target as Node)) combobox.closePopover(); };
            document.addEventListener('mousedown', handle);
            return () => document.removeEventListener('mousedown', handle);
        }, [combobox.isOpen, combobox.closePopover]);

        return (
            <div ref={(el) => { (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el; if (typeof ref === 'function') ref(el); else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el; }} className={cn('relative', className)} {...props}>
                <input {...combobox.inputProps} placeholder={placeholder} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                {combobox.isOpen && combobox.filteredItems.length > 0 && (
                    <ul {...combobox.listProps} className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                        {combobox.filteredItems.map((item, i) => {
                            const label = (getLabel ?? String)(item);
                            return <li key={i} {...combobox.getItemProps(item)} className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground', item === combobox.selectedValue && 'bg-accent text-accent-foreground')}>{label}</li>;
                        })}
                    </ul>
                )}
                {combobox.isOpen && combobox.filteredItems.length === 0 && combobox.query && (
                    <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-2 text-sm text-muted-foreground shadow-md">No results found.</div>
                )}
            </div>
        );
    },
);
Combobox.displayName = 'Combobox';
export { Combobox };
