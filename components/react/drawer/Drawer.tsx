import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';

import { cn, DrawerContext, useDrawerContext, useDrawer, Portal, useFocusTrap, useScrollLock, useEscapeKey } from '@ds0/primitives';
import type { DrawerProps, DrawerTriggerProps, DrawerContentProps, DrawerTitleProps, DrawerDescriptionProps, DrawerCloseProps } from '@ds0/primitives';

// ─── Root ─────────────────────────────────────────────────────

function Drawer({ open, defaultOpen, onOpenChange, side = 'right', children }: DrawerProps): React.JSX.Element {
    const drawer = useDrawer({ open, defaultOpen, onOpenChange });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const contextValue = useMemo(() => ({
        isOpen: drawer.isOpen, open: drawer.open, close: drawer.close,
        side, ids: drawer.ids, triggerRef, contentRef,
    }), [drawer.isOpen, drawer.open, drawer.close, side, drawer.ids]);

    return <DrawerContext.Provider value={contextValue}>{children}</DrawerContext.Provider>;
}
Drawer.displayName = 'Drawer';

// ─── Trigger ──────────────────────────────────────────────────

const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const { open, isOpen, ids, triggerRef } = useDrawerContext();
        return (
            <button
                ref={(node) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                    (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }}
                type="button" className={className} aria-haspopup="dialog" aria-expanded={isOpen}
                aria-controls={isOpen ? ids.content : undefined}
                onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) open(); }}
                {...props}
            >{children}</button>
        );
    },
);
DrawerTrigger.displayName = 'DrawerTrigger';

// ─── Content ──────────────────────────────────────────────────

const sideClasses = {
    right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
    left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
    top: 'inset-x-0 top-0 w-full border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
    bottom: 'inset-x-0 bottom-0 w-full border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
} as const;

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
    ({ children, className, onEscapeKeyDown, ...props }, ref) => {
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
            <Portal>
                {/* Overlay */}
                <div
                    className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                    data-state={isOpen ? 'open' : 'closed'} aria-hidden="true" onClick={close}
                />
                {/* Panel */}
                <div
                    ref={(node) => {
                        if (typeof ref === 'function') ref(node);
                        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }}
                    id={ids.content} role="dialog" aria-modal={true}
                    aria-labelledby={ids.title} aria-describedby={ids.description}
                    data-state={isOpen ? 'open' : 'closed'} data-side={side}
                    className={cn(
                        'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out duration-300',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out',
                        sideClasses[side],
                        className,
                    )}
                    {...props}
                >{children}</div>
            </Portal>
        );
    },
);
DrawerContent.displayName = 'DrawerContent';

// ─── Title ────────────────────────────────────────────────────

const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
    ({ children, className, ...props }, ref) => {
        const { ids } = useDrawerContext();
        return <h2 ref={ref} id={ids.title} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props}>{children}</h2>;
    },
);
DrawerTitle.displayName = 'DrawerTitle';

// ─── Description ──────────────────────────────────────────────

const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
    ({ children, className, ...props }, ref) => {
        const { ids } = useDrawerContext();
        return <p ref={ref} id={ids.description} className={cn('text-sm text-muted-foreground', className)} {...props}>{children}</p>;
    },
);
DrawerDescription.displayName = 'DrawerDescription';

// ─── Close ────────────────────────────────────────────────────

const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const { close } = useDrawerContext();
        return (
            <button ref={ref} type="button" className={cn('absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100', className)}
                onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) close(); }}
                {...props}
            >{children}</button>
        );
    },
);
DrawerClose.displayName = 'DrawerClose';

// ─── Header & Footer ─────────────────────────────────────────

const DrawerHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
    ),
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0', className)} {...props} />
    ),
);
DrawerFooter.displayName = 'DrawerFooter';

// ─── Compound Export ──────────────────────────────────────────

const DrawerCompound = Object.assign(Drawer, {
    Trigger: DrawerTrigger, Content: DrawerContent,
    Title: DrawerTitle, Description: DrawerDescription, Close: DrawerClose,
    Header: DrawerHeader, Footer: DrawerFooter,
});

export { DrawerCompound as Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose, DrawerHeader, DrawerFooter };

