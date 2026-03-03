import React, { useMemo, useRef, forwardRef, useCallback } from 'react';
import { Portal } from '../utils/Portal';
import { useEscapeKey } from '../utils/useEscapeKey';
import { useTooltip } from './useTooltip';
import { TooltipContext, useTooltipContext } from './TooltipContext';
import type { TooltipProps, TooltipTriggerProps, TooltipContentProps } from './Tooltip.types';

// ─── Root ─────────────────────────────────────────────────────

function TooltipPrimitive({ open, defaultOpen, onOpenChange, delayDuration = 700, children }: TooltipProps): React.JSX.Element {
    const tip = useTooltip({ open, defaultOpen, onOpenChange });
    const triggerRef = useRef<HTMLElement>(null);
    const ctx = useMemo(() => ({ ...tip, triggerRef, delayDuration }), [tip, delayDuration]);
    return <TooltipContext.Provider value={ctx}>{children}</TooltipContext.Provider>;
}
TooltipPrimitive.displayName = 'TooltipPrimitive';

// ─── Trigger ──────────────────────────────────────────────────

const TooltipTriggerPrimitive = forwardRef<HTMLElement, TooltipTriggerProps>(
    ({ children, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
        const { open, close, isOpen, ids, triggerRef, delayDuration } = useTooltipContext();
        const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

        const handleOpen = useCallback(() => {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(open, delayDuration);
        }, [open, delayDuration]);

        const handleClose = useCallback(() => {
            clearTimeout(timerRef.current);
            close();
        }, [close]);

        return (
            <span
                ref={(node) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
                    (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
                }}
                aria-describedby={isOpen ? ids.content : undefined}
                onMouseEnter={(e) => { onMouseEnter?.(e); handleOpen(); }}
                onMouseLeave={(e) => { onMouseLeave?.(e); handleClose(); }}
                onFocus={(e) => { onFocus?.(e); handleOpen(); }}
                onBlur={(e) => { onBlur?.(e); handleClose(); }}
                {...props}
            >{children}</span>
        );
    },
);
TooltipTriggerPrimitive.displayName = 'TooltipTriggerPrimitive';

// ─── Content ──────────────────────────────────────────────────

const TooltipContentPrimitive = forwardRef<HTMLDivElement, TooltipContentProps>(
    ({ children, side: _side, sideOffset: _offset, ...props }, ref) => {
        const { isOpen, close, ids } = useTooltipContext();

        const handleEscape = useCallback(() => close(), [close]);
        useEscapeKey(handleEscape, isOpen);

        if (!isOpen) return null;

        return (
            <Portal>
                <div
                    ref={ref} id={ids.content} role="tooltip" data-state={isOpen ? 'open' : 'closed'}
                    {...props}
                >{children}</div>
            </Portal>
        );
    },
);
TooltipContentPrimitive.displayName = 'TooltipContentPrimitive';

export { TooltipPrimitive, TooltipTriggerPrimitive, TooltipContentPrimitive };
