import React, { useMemo, useRef, forwardRef, useCallback, useEffect } from 'react';
import { Portal } from '../utils/Portal';
import { useClickOutside } from '../utils/useClickOutside';
import { useEscapeKey } from '../utils/useEscapeKey';
import { usePopover } from './usePopover';
import { PopoverContext, usePopoverContext } from './PopoverContext';
import type { PopoverProps, PopoverTriggerProps, PopoverContentProps, PopoverCloseProps } from './Popover.types';

// ─── Root ─────────────────────────────────────────────────────

function PopoverPrimitive({ open, defaultOpen, onOpenChange, children }: PopoverProps): React.JSX.Element {
    const pop = usePopover({ open, defaultOpen, onOpenChange });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const ctx = useMemo(() => ({
        ...pop, triggerRef, contentRef, side: 'bottom' as const, align: 'center' as const,
    }), [pop]);

    return <PopoverContext.Provider value={ctx}>{children}</PopoverContext.Provider>;
}
PopoverPrimitive.displayName = 'PopoverPrimitive';

// ─── Trigger ──────────────────────────────────────────────────

const PopoverTriggerPrimitive = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
    ({ children, onClick, ...props }, ref) => {
        const { toggle, isOpen, ids, triggerRef } = usePopoverContext();
        return (
            <button
                ref={(node) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                    (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }}
                type="button" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={isOpen ? ids.content : undefined}
                onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) toggle(); }}
                {...props}
            >{children}</button>
        );
    },
);
PopoverTriggerPrimitive.displayName = 'PopoverTriggerPrimitive';

// ─── Content ──────────────────────────────────────────────────

const PopoverContentPrimitive = forwardRef<HTMLDivElement, PopoverContentProps>(
    ({ children, side: _side, align: _align, sideOffset: _sideOffset, ...props }, ref) => {
        const { isOpen, close, ids, triggerRef, contentRef } = usePopoverContext();

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
                    id={ids.content} data-state={isOpen ? 'open' : 'closed'}
                    {...props}
                >{children}</div>
            </Portal>
        );
    },
);
PopoverContentPrimitive.displayName = 'PopoverContentPrimitive';

// ─── Close ────────────────────────────────────────────────────

const PopoverClosePrimitive = forwardRef<HTMLButtonElement, PopoverCloseProps>(
    ({ children, onClick, ...props }, ref) => {
        const { close } = usePopoverContext();
        return (
            <button ref={ref} type="button"
                onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) close(); }}
                {...props}
            >{children}</button>
        );
    },
);
PopoverClosePrimitive.displayName = 'PopoverClosePrimitive';

export { PopoverPrimitive, PopoverTriggerPrimitive, PopoverContentPrimitive, PopoverClosePrimitive };
