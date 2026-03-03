import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';

import { cn, useDialog, DialogContext, useDialogContext, Portal, useFocusTrap, useScrollLock, useEscapeKey } from '@ds0/primitives';
import type { DialogProps, DialogContentProps, DialogTitleProps, DialogDescriptionProps, DialogCloseProps, DialogTriggerProps } from '@ds0/primitives';

// ─── Dialog Root ─────────────────────────────────────────────

function Dialog({ open, defaultOpen, onOpenChange, children }: DialogProps): React.JSX.Element {
    const dialog = useDialog({ open, defaultOpen, onOpenChange });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const contextValue = useMemo(
        () => ({
            isOpen: dialog.isOpen,
            open: dialog.open,
            close: dialog.close,
            ids: dialog.ids,
            triggerRef,
            contentRef,
        }),
        [dialog.isOpen, dialog.open, dialog.close, dialog.ids],
    );

    return (
        <DialogContext.Provider value={contextValue}>
            {children}
        </DialogContext.Provider>
    );
}

Dialog.displayName = 'Dialog';

// ─── Dialog Trigger ──────────────────────────────────────────

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const { open, isOpen, ids, triggerRef } = useDialogContext();

        return (
            <button
                ref={(node) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                    (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }}
                type="button"
                className={className}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls={isOpen ? ids.content : undefined}
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented) open();
                }}
                {...props}
            >
                {children}
            </button>
        );
    },
);

DialogTrigger.displayName = 'DialogTrigger';

// ─── Dialog Content ──────────────────────────────────────────

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps & { size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' }>(
    ({ children, className, size = 'md', onEscapeKeyDown, ...props }, ref) => {
        const { isOpen, close, ids, triggerRef, contentRef } = useDialogContext();

        useFocusTrap(contentRef, isOpen);
        useScrollLock(isOpen);

        const handleEscape = useCallback(
            (event: KeyboardEvent) => {
                if (onEscapeKeyDown) {
                    onEscapeKeyDown(event);
                    if (event.defaultPrevented) return;
                }
                close();
            },
            [onEscapeKeyDown, close],
        );
        useEscapeKey(handleEscape, isOpen);

        useEffect(() => {
            if (!isOpen && triggerRef.current) {
                triggerRef.current.focus();
            }
        }, [isOpen, triggerRef]);

        if (!isOpen) return null;

        const sizeClasses = {
            sm: 'max-w-sm',
            md: 'max-w-lg',
            lg: 'max-w-2xl',
            xl: 'max-w-4xl',
            full: 'max-w-[calc(100vw-2rem)]',
        };

        return (
            <Portal>
                {/* Overlay */}
                <div
                    className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                    data-state={isOpen ? 'open' : 'closed'}
                    aria-hidden="true"
                    onClick={close}
                />
                {/* Content */}
                <div
                    ref={(node) => {
                        if (typeof ref === 'function') ref(node);
                        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }}
                    id={ids.content}
                    role="dialog"
                    aria-modal={true}
                    aria-labelledby={ids.title}
                    aria-describedby={ids.description}
                    data-state={isOpen ? 'open' : 'closed'}
                    className={cn(
                        'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
                        'rounded-lg sm:rounded-lg',
                        sizeClasses[size],
                        className,
                    )}
                    {...props}
                >
                    {children}
                </div>
            </Portal>
        );
    },
);

DialogContent.displayName = 'DialogContent';

// ─── Dialog Title ────────────────────────────────────────────

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
    ({ children, className, ...props }, ref) => {
        const ctx = React.useContext(DialogContext);

        return (
            <h2
                ref={ref}
                id={ctx?.ids.title}
                className={cn('text-lg font-semibold leading-none tracking-tight', className)}
                {...props}
            >
                {children}
            </h2>
        );
    },
);

DialogTitle.displayName = 'DialogTitle';

// ─── Dialog Description ──────────────────────────────────────

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
    ({ children, className, ...props }, ref) => {
        const ctx = React.useContext(DialogContext);

        return (
            <p
                ref={ref}
                id={ctx?.ids.description}
                className={cn('text-sm text-muted-foreground', className)}
                {...props}
            >
                {children}
            </p>
        );
    },
);

DialogDescription.displayName = 'DialogDescription';

// ─── Dialog Close ────────────────────────────────────────────

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const ctx = React.useContext(DialogContext);

        return (
            <button
                ref={ref}
                type="button"
                className={cn(
                    'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
                    className,
                )}
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented) ctx?.close();
                }}
                {...props}
            >
                {children}
            </button>
        );
    },
);

DialogClose.displayName = 'DialogClose';

// ─── Compound Export ─────────────────────────────────────────

const DialogCompound = Object.assign(Dialog, {
    Trigger: DialogTrigger,
    Content: DialogContent,
    Title: DialogTitle,
    Description: DialogDescription,
    Close: DialogClose,
});

export { DialogCompound as Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose };
