import React, { useMemo, useRef, forwardRef, useCallback, useEffect } from 'react';

import { Portal } from '../utils/Portal';
import { useFocusTrap } from '../utils/useFocusTrap';
import { useScrollLock } from '../utils/useScrollLock';
import { useEscapeKey } from '../utils/useEscapeKey';
import { useDrawer } from './useDrawer';
import { DrawerContext, useDrawerContext } from './DrawerContext';
import type {
    DrawerProps, DrawerTriggerProps, DrawerPortalProps, DrawerOverlayProps,
    DrawerContentProps, DrawerTitleProps, DrawerDescriptionProps, DrawerCloseProps,
} from './Drawer.types';

// ─── Root ─────────────────────────────────────────────────────

function DrawerPrimitive({ open, defaultOpen, onOpenChange, side = 'right', children }: DrawerProps): React.JSX.Element {
    const drawer = useDrawer({ open, defaultOpen, onOpenChange });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const contextValue = useMemo(() => ({
        isOpen: drawer.isOpen, open: drawer.open, close: drawer.close,
        side, ids: drawer.ids, triggerRef, contentRef,
    }), [drawer.isOpen, drawer.open, drawer.close, side, drawer.ids]);

    return <DrawerContext.Provider value={contextValue}>{children}</DrawerContext.Provider>;
}
DrawerPrimitive.displayName = 'DrawerPrimitive';

// ─── Trigger ──────────────────────────────────────────────────

const DrawerTriggerPrimitive = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
    ({ children, onClick, ...props }, ref) => {
        const { open, isOpen, ids, triggerRef } = useDrawerContext();
        return (
            <button
                ref={(node) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                    (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }}
                type="button" aria-haspopup="dialog" aria-expanded={isOpen}
                aria-controls={isOpen ? ids.content : undefined}
                onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) open(); }}
                {...props}
            >{children}</button>
        );
    },
);
DrawerTriggerPrimitive.displayName = 'DrawerTriggerPrimitive';

// ─── Portal ───────────────────────────────────────────────────

function DrawerPortalPrimitive({ children, container }: DrawerPortalProps): React.JSX.Element | null {
    const { isOpen } = useDrawerContext();
    if (!isOpen) return null;
    return <Portal container={container}>{children}</Portal>;
}
DrawerPortalPrimitive.displayName = 'DrawerPortalPrimitive';

// ─── Overlay ──────────────────────────────────────────────────

const DrawerOverlayPrimitive = forwardRef<HTMLDivElement, DrawerOverlayProps>(
    ({ onClick, ...props }, ref) => {
        const { close, isOpen } = useDrawerContext();
        return (
            <div ref={ref} aria-hidden="true" data-state={isOpen ? 'open' : 'closed'}
                onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) close(); }}
                {...props}
            />
        );
    },
);
DrawerOverlayPrimitive.displayName = 'DrawerOverlayPrimitive';

// ─── Content ──────────────────────────────────────────────────

const DrawerContentPrimitive = forwardRef<HTMLDivElement, DrawerContentProps>(
    ({ onEscapeKeyDown, children, ...props }, ref) => {
        const { isOpen, close, side, ids, triggerRef, contentRef } = useDrawerContext();

        useFocusTrap(contentRef, isOpen);
        useScrollLock(isOpen);

        const handleEscape = useCallback((event: KeyboardEvent) => {
            onEscapeKeyDown?.(event);
            if (!event.defaultPrevented) close();
        }, [onEscapeKeyDown, close]);
        useEscapeKey(handleEscape, isOpen);

        useEffect(() => {
            if (!isOpen && triggerRef.current) triggerRef.current.focus();
        }, [isOpen, triggerRef]);

        if (!isOpen) return null;

        return (
            <div
                ref={(node) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }}
                id={ids.content} role="dialog" aria-modal={true}
                aria-labelledby={ids.title} aria-describedby={ids.description}
                data-state={isOpen ? 'open' : 'closed'} data-side={side}
                {...props}
            >{children}</div>
        );
    },
);
DrawerContentPrimitive.displayName = 'DrawerContentPrimitive';

// ─── Title ────────────────────────────────────────────────────

const DrawerTitlePrimitive = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
    ({ children, ...props }, ref) => {
        const { ids } = useDrawerContext();
        return <h2 ref={ref} id={ids.title} {...props}>{children}</h2>;
    },
);
DrawerTitlePrimitive.displayName = 'DrawerTitlePrimitive';

// ─── Description ──────────────────────────────────────────────

const DrawerDescriptionPrimitive = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
    ({ children, ...props }, ref) => {
        const { ids } = useDrawerContext();
        return <p ref={ref} id={ids.description} {...props}>{children}</p>;
    },
);
DrawerDescriptionPrimitive.displayName = 'DrawerDescriptionPrimitive';

// ─── Close ────────────────────────────────────────────────────

const DrawerClosePrimitive = forwardRef<HTMLButtonElement, DrawerCloseProps>(
    ({ children, onClick, ...props }, ref) => {
        const { close } = useDrawerContext();
        return (
            <button ref={ref} type="button"
                onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) close(); }}
                {...props}
            >{children}</button>
        );
    },
);
DrawerClosePrimitive.displayName = 'DrawerClosePrimitive';

export {
    DrawerPrimitive, DrawerTriggerPrimitive, DrawerPortalPrimitive,
    DrawerOverlayPrimitive, DrawerContentPrimitive, DrawerTitlePrimitive,
    DrawerDescriptionPrimitive, DrawerClosePrimitive,
};
