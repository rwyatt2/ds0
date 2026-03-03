import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn, SelectContext, useSelectContext, useSelect, Portal, useClickOutside, useEscapeKey } from '@ds0/primitives';
import type { SelectProps, SelectTriggerProps, SelectContentProps, SelectItemProps, SelectGroupProps, SelectSeparatorProps } from '@ds0/primitives';

// ─── Root ─────────────────────────────────────────────────────

function Select({ value, defaultValue, onValueChange, open, defaultOpen, onOpenChange, isDisabled = false, isRequired = false, placeholder, children }: SelectProps): React.JSX.Element {
    const selectState = useSelect({ value, defaultValue, onValueChange, open, defaultOpen, onOpenChange, isDisabled, isRequired, placeholder });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [highlightedValue, setHighlightedValue] = useState('');

    const contextValue = useMemo(() => ({
        isOpen: selectState.isOpen, selectedValue: selectState.selectedValue, selectedLabel: selectState.selectedLabel,
        open: selectState.open, close: selectState.close, select: selectState.select,
        ids: selectState.ids, isDisabled, triggerRef, contentRef,
        registerOption: selectState.registerOption, unregisterOption: selectState.unregisterOption,
        highlightedValue, setHighlightedValue,
    }), [selectState, isDisabled, highlightedValue]);

    return <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>;
}
Select.displayName = 'Select';

// ─── Trigger ──────────────────────────────────────────────────

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const { isOpen, selectedLabel, open, close, ids, isDisabled, triggerRef } = useSelectContext();
        return (
            <button
                ref={(node) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                    (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }}
                id={ids.trigger} type="button" role="combobox"
                aria-expanded={isOpen} aria-haspopup="listbox" aria-controls={isOpen ? ids.content : undefined}
                aria-disabled={isDisabled || undefined}
                className={cn(
                    'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                    'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    isOpen && 'ring-2 ring-ring ring-offset-2',
                    className,
                )}
                onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) { if (isOpen) { close(); } else { open(); } } }}
                onKeyDown={(e) => {
                    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); if (!isOpen) open(); }
                }}
                {...props}
            >
                <span className="truncate">{children ?? selectedLabel}</span>
                <svg className={cn('ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform', isOpen && 'rotate-180')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
            </button>
        );
    },
);
SelectTrigger.displayName = 'SelectTrigger';

// ─── Content ──────────────────────────────────────────────────

const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
    ({ children, className, ...props }, ref) => {
        const { isOpen, close, ids, triggerRef, contentRef } = useSelectContext();

        const handleEscape = useCallback(() => { close(); triggerRef.current?.focus(); }, [close, triggerRef]);
        useEscapeKey(handleEscape, isOpen);
        useClickOutside(contentRef, () => { if (isOpen) close(); });

        useEffect(() => { if (!isOpen && triggerRef.current) triggerRef.current.focus(); }, [isOpen, triggerRef]);

        if (!isOpen) return null;

        return (
            <Portal>
                <div
                    ref={(node) => {
                        if (typeof ref === 'function') ref(node);
                        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }}
                    id={ids.content} role="listbox" aria-labelledby={ids.trigger}
                    data-state={isOpen ? 'open' : 'closed'}
                    className={cn(
                        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                        className,
                    )}
                    {...props}
                >
                    <div className="p-1">{children}</div>
                </div>
            </Portal>
        );
    },
);
SelectContent.displayName = 'SelectContent';

// ─── Item ─────────────────────────────────────────────────────

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ value, label, children, className, isDisabled: itemDisabled = false, onClick, ...props }, ref) => {
        const { selectedValue, select, close, highlightedValue, setHighlightedValue, registerOption, unregisterOption } = useSelectContext();
        const isSelected = selectedValue === value;
        const isHighlighted = highlightedValue === value;
        const displayLabel = label ?? (typeof children === 'string' ? children : value);

        useEffect(() => { registerOption(value, displayLabel); return () => unregisterOption(value); }, [value, displayLabel, registerOption, unregisterOption]);

        return (
            <div
                ref={ref} role="option" aria-selected={isSelected} aria-disabled={itemDisabled || undefined}
                data-highlighted={isHighlighted || undefined} data-state={isSelected ? 'checked' : 'unchecked'}
                tabIndex={isHighlighted ? 0 : -1}
                className={cn(
                    'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
                    isHighlighted && 'bg-accent text-accent-foreground',
                    itemDisabled && 'pointer-events-none opacity-50',
                    className,
                )}
                onMouseEnter={() => setHighlightedValue(value)}
                onClick={(e) => { onClick?.(e); if (!e.defaultPrevented && !itemDisabled) { select(value, displayLabel); close(); } }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!itemDisabled) { select(value, displayLabel); close(); } } }}
                {...props}
            >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {isSelected && <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>}
                </span>
                {children}
            </div>
        );
    },
);
SelectItem.displayName = 'SelectItem';

// ─── Separator ────────────────────────────────────────────────

function SelectSeparator({ className, ...props }: SelectSeparatorProps): React.JSX.Element {
    return <div role="separator" className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
}

// ─── Group ────────────────────────────────────────────────────

function SelectGroup({ label, children, className, ...props }: SelectGroupProps): React.JSX.Element {
    return (
        <div role="group" aria-label={label} className={className} {...props}>
            {label && <span className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{label}</span>}
            {children}
        </div>
    );
}

// ─── Compound Export ──────────────────────────────────────────

const SelectCompound = Object.assign(Select, {
    Trigger: SelectTrigger, Content: SelectContent, Item: SelectItem,
    Separator: SelectSeparator, Group: SelectGroup,
});

export { SelectCompound as Select, SelectTrigger, SelectContent, SelectItem, SelectSeparator, SelectGroup };
