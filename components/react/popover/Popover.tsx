import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import { cn, PopoverContext, usePopoverContext, usePopover, Portal, useClickOutside, useEscapeKey } from '@ds0/primitives';
import type { PopoverProps, PopoverTriggerProps, PopoverContentProps, PopoverCloseProps } from '@ds0/primitives';

function Popover({ open, defaultOpen, onOpenChange, children }: PopoverProps): React.JSX.Element {
    const pop = usePopover({ open, defaultOpen, onOpenChange });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const ctx = useMemo(() => ({ ...pop, triggerRef, contentRef, side: 'bottom' as const, align: 'center' as const }), [pop]);
    return <PopoverContext.Provider value={ctx}>{children}</PopoverContext.Provider>;
}
Popover.displayName = 'Popover';

const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const { toggle, isOpen, ids, triggerRef } = usePopoverContext();
        return (
            <button
                ref={(node) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                    (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }}
                type="button" className={className} aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={isOpen ? ids.content : undefined}
                onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) toggle(); }}
                {...props}
            >{children}</button>
        );
    },
);
PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
    ({ children, className, side: _side, align: _align, sideOffset: _offset, ...props }, ref) => {
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
                    className={cn(
                        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                        className,
                    )}
                    {...props}
                >{children}</div>
            </Portal>
        );
    },
);
PopoverContent.displayName = 'PopoverContent';

const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const { close } = usePopoverContext();
        return <button ref={ref} type="button" className={cn('absolute right-2 top-2', className)} onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) close(); }} {...props}>{children}</button>;
    },
);
PopoverClose.displayName = 'PopoverClose';

const PopoverCompound = Object.assign(Popover, { Trigger: PopoverTrigger, Content: PopoverContent, Close: PopoverClose });
export { PopoverCompound as Popover, PopoverTrigger, PopoverContent, PopoverClose };
