import React, { forwardRef, useRef, useEffect } from 'react';
import { useCombobox } from './useCombobox';
import type { ComboboxProps } from './Combobox.types';

const ComboboxPrimitive = forwardRef<HTMLDivElement, ComboboxProps>(
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
            <div ref={(el) => { (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el; if (typeof ref === 'function') ref(el); else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el; }} className={className} style={{ position: 'relative' }} {...props}>
                <input {...combobox.inputProps} placeholder={placeholder} />
                {combobox.isOpen && combobox.filteredItems.length > 0 && (
                    <ul {...combobox.listProps} style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, listStyle: 'none', margin: 0, padding: 0 }}>
                        {combobox.filteredItems.map((item, i) => {
                            const label = (getLabel ?? String)(item);
                            return <li key={i} {...combobox.getItemProps(item)}>{label}</li>;
                        })}
                    </ul>
                )}
            </div>
        );
    },
);
ComboboxPrimitive.displayName = 'ComboboxPrimitive';
export { ComboboxPrimitive };
