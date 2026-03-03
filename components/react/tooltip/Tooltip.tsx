import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { cn, TooltipContext, useTooltipContext, useTooltip, Portal, useEscapeKey } from '@ds0/primitives';
import type { TooltipProps, TooltipTriggerProps, TooltipContentProps } from '@ds0/primitives';

function Tooltip({ open, defaultOpen, onOpenChange, delayDuration = 700, children }: TooltipProps): React.JSX.Element {
    const tip = useTooltip({ open, defaultOpen, onOpenChange });
    const triggerRef = useRef<HTMLElement>(null);
    const ctx = useMemo(() => ({ ...tip, triggerRef, delayDuration }), [tip, delayDuration]);
    return <TooltipContext.Provider value={ctx}>{children}</TooltipContext.Provider>;
}
Tooltip.displayName = 'Tooltip';

const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
    ({ children, className, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
        const { open, close, isOpen, ids, triggerRef, delayDuration } = useTooltipContext();
        const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
        const handleOpen = useCallback(() => { clearTimeout(timerRef.current); timerRef.current = setTimeout(open, delayDuration); }, [open, delayDuration]);
        const handleClose = useCallback(() => { clearTimeout(timerRef.current); close(); }, [close]);
        return (
            <span
                ref={(node) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
                    (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
                }}
                className={className} aria-describedby={isOpen ? ids.content : undefined}
                onMouseEnter={(e) => { onMouseEnter?.(e); handleOpen(); }}
                onMouseLeave={(e) => { onMouseLeave?.(e); handleClose(); }}
                onFocus={(e) => { onFocus?.(e); handleOpen(); }}
                onBlur={(e) => { onBlur?.(e); handleClose(); }}
                {...props}
            >{children}</span>
        );
    },
);
TooltipTrigger.displayName = 'TooltipTrigger';

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
    ({ children, className, side: _side, sideOffset: _offset, ...props }, ref) => {
        const { isOpen, close, ids } = useTooltipContext();
        const handleEscape = useCallback(() => close(), [close]);
        useEscapeKey(handleEscape, isOpen);
        if (!isOpen) return null;
        return (
            <Portal>
                <div
                    ref={ref} id={ids.content} role="tooltip" data-state={isOpen ? 'open' : 'closed'}
                    className={cn(
                        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
                        'animate-in fade-in-0 zoom-in-95',
                        className,
                    )}
                    {...props}
                >{children}</div>
            </Portal>
        );
    },
);
TooltipContent.displayName = 'TooltipContent';

const TooltipCompound = Object.assign(Tooltip, { Trigger: TooltipTrigger, Content: TooltipContent });
export { TooltipCompound as Tooltip, TooltipTrigger, TooltipContent };
