import React, { useMemo, useRef, forwardRef, useCallback, useEffect, useState } from 'react';

import { Portal } from '../utils/Portal';
import { useClickOutside } from '../utils/useClickOutside';
import { useEscapeKey } from '../utils/useEscapeKey';
import { useSelect } from './useSelect';
import { SelectContext, useSelectContext } from './SelectContext';
import type {
    SelectProps, SelectTriggerProps, SelectContentProps, SelectItemProps,
    SelectLabelProps, SelectSeparatorProps, SelectGroupProps,
} from './Select.types';

// ─── Root ─────────────────────────────────────────────────────

function SelectPrimitive({ value, defaultValue, onValueChange, open, defaultOpen, onOpenChange, isDisabled = false, isRequired = false, placeholder, children }: SelectProps): React.JSX.Element {
    const selectState = useSelect({ value, defaultValue, onValueChange, open, defaultOpen, onOpenChange, isDisabled, isRequired, placeholder });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [highlightedValue, setHighlightedValue] = useState('');

    const contextValue = useMemo(() => ({
        isOpen: selectState.isOpen, selectedValue: selectState.selectedValue,
        selectedLabel: selectState.selectedLabel,
        open: selectState.open, close: selectState.close, select: selectState.select,
        ids: selectState.ids, isDisabled,
        triggerRef, contentRef,
        registerOption: selectState.registerOption, unregisterOption: selectState.unregisterOption,
        highlightedValue, setHighlightedValue,
    }), [selectState.isOpen, selectState.selectedValue, selectState.selectedLabel, selectState.open, selectState.close, selectState.select, selectState.ids, isDisabled, highlightedValue, selectState.registerOption, selectState.unregisterOption]);

    return <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>;
}
SelectPrimitive.displayName = 'SelectPrimitive';

// ─── Trigger ──────────────────────────────────────────────────

const SelectTriggerPrimitive = forwardRef<HTMLButtonElement, SelectTriggerProps>(
    ({ children, onClick, placeholder: _ph, ...props }, ref) => {
        const { isOpen, selectedLabel, open, close, ids, isDisabled, triggerRef } = useSelectContext();

        return (
            <button
                ref={(node) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                    (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }}
                id={ids.trigger} type="button" role="combobox"
                aria-expanded={isOpen} aria-haspopup="listbox"
                aria-controls={isOpen ? ids.content : undefined}
                aria-disabled={isDisabled || undefined}
                onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) { if (isOpen) { close(); } else { open(); } } }}
                onKeyDown={(e) => {
                    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
                        e.preventDefault();
                        if (!isOpen) open();
                    }
                }}
                {...props}
            >
                {children ?? selectedLabel}
            </button>
        );
    },
);
SelectTriggerPrimitive.displayName = 'SelectTriggerPrimitive';

// ─── Content ──────────────────────────────────────────────────

const SelectContentPrimitive = forwardRef<HTMLDivElement, SelectContentProps>(
    ({ children, ...props }, ref) => {
        const { isOpen, close, ids, triggerRef, contentRef } = useSelectContext();

        const handleEscape = useCallback(() => {
            close();
            triggerRef.current?.focus();
        }, [close, triggerRef]);

        useEscapeKey(handleEscape, isOpen);
        useClickOutside(contentRef, () => { if (isOpen) close(); });

        useEffect(() => {
            if (!isOpen && triggerRef.current) triggerRef.current.focus();
        }, [isOpen, triggerRef]);

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
                    {...props}
                >{children}</div>
            </Portal>
        );
    },
);
SelectContentPrimitive.displayName = 'SelectContentPrimitive';

// ─── Item ─────────────────────────────────────────────────────

const SelectItemPrimitive = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ value, label, children, isDisabled: itemDisabled = false, onClick, ...props }, ref) => {
        const { selectedValue, select, close, highlightedValue, setHighlightedValue, registerOption, unregisterOption } = useSelectContext();
        const isSelected = selectedValue === value;
        const isHighlighted = highlightedValue === value;
        const displayLabel = label ?? (typeof children === 'string' ? children : value);

        useEffect(() => {
            registerOption(value, displayLabel);
            return () => unregisterOption(value);
        }, [value, displayLabel, registerOption, unregisterOption]);

        return (
            <div
                ref={ref} role="option" aria-selected={isSelected}
                aria-disabled={itemDisabled || undefined}
                data-highlighted={isHighlighted || undefined}
                data-state={isSelected ? 'checked' : 'unchecked'}
                onMouseEnter={() => setHighlightedValue(value)}
                onClick={(e) => {
                    onClick?.(e);
                    if (!e.defaultPrevented && !itemDisabled) {
                        select(value, displayLabel);
                        close();
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (!itemDisabled) { select(value, displayLabel); close(); }
                    }
                }}
                tabIndex={isHighlighted ? 0 : -1}
                {...props}
            >{children}</div>
        );
    },
);
SelectItemPrimitive.displayName = 'SelectItemPrimitive';

// ─── Label ────────────────────────────────────────────────────

const SelectLabelPrimitive = forwardRef<HTMLSpanElement, SelectLabelProps>(
    ({ children, ...props }, ref) => <span ref={ref} {...props}>{children}</span>,
);
SelectLabelPrimitive.displayName = 'SelectLabelPrimitive';

// ─── Separator ────────────────────────────────────────────────

const SelectSeparatorPrimitive = forwardRef<HTMLDivElement, SelectSeparatorProps>(
    (props, ref) => <div ref={ref} role="separator" aria-orientation="horizontal" {...props} />,
);
SelectSeparatorPrimitive.displayName = 'SelectSeparatorPrimitive';

// ─── Group ────────────────────────────────────────────────────

function SelectGroupPrimitive({ label, children, ...props }: SelectGroupProps): React.JSX.Element {
    return (
        <div role="group" aria-label={label} {...props}>
            {label && <span aria-hidden="true">{label}</span>}
            {children}
        </div>
    );
}
SelectGroupPrimitive.displayName = 'SelectGroupPrimitive';

export {
    SelectPrimitive, SelectTriggerPrimitive, SelectContentPrimitive,
    SelectItemPrimitive, SelectLabelPrimitive, SelectSeparatorPrimitive,
    SelectGroupPrimitive,
};
