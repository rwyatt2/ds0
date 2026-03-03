import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useToast } from '@ds0/primitives';
import type {
    ToastState,
    ToastTitleProps,
    ToastDescriptionProps,
    ToastActionProps,
    ToastCloseProps,
    ToasterProps,
} from '@ds0/primitives';

// ─── Variants ────────────────────────────────────────────────

const toastVariants = cva(
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all',
    {
        variants: {
            variant: {
                default: 'bg-background border-border text-foreground',
                success: 'bg-green-50 border-green-200 text-green-900',
                warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
                destructive: 'bg-destructive border-destructive text-destructive-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

const toasterPositionVariants = cva(
    'fixed z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none',
    {
        variants: {
            position: {
                'top-left': 'top-4 left-4',
                'top-center': 'top-4 left-1/2 -translate-x-1/2',
                'top-right': 'top-4 right-4',
                'bottom-left': 'bottom-4 left-4',
                'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
                'bottom-right': 'bottom-4 right-4',
            },
        },
        defaultVariants: {
            position: 'bottom-right',
        },
    },
);

// ─── Close Icon ──────────────────────────────────────────────

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);

// ─── Toast ───────────────────────────────────────────────────

interface StyledToastProps extends React.HTMLAttributes<HTMLDivElement> {
    toast: ToastState;
    onDismiss: (id: string) => void;
    className?: string;
}

const Toast = forwardRef<HTMLDivElement, StyledToastProps>(
    ({ toast, onDismiss, className, ...props }, ref) => (
        <div
            ref={ref}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            data-variant={toast.variant || 'default'}
            className={cn(toastVariants({ variant: toast.variant }), className)}
            {...props}
        >
            <div className="grid gap-1">
                {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            </div>
            {toast.action}
            <ToastClose onClick={() => onDismiss(toast.id)} />
        </div>
    ),
);

Toast.displayName = 'Toast';

// ─── Title ───────────────────────────────────────────────────

const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={cn('text-sm font-semibold', className)} {...props}>
            {children}
        </div>
    ),
);

ToastTitle.displayName = 'ToastTitle';

// ─── Description ─────────────────────────────────────────────

const ToastDescription = forwardRef<HTMLDivElement, ToastDescriptionProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={cn('text-sm opacity-90', className)} {...props}>
            {children}
        </div>
    ),
);

ToastDescription.displayName = 'ToastDescription';

// ─── Action ──────────────────────────────────────────────────

const ToastAction = forwardRef<HTMLButtonElement, ToastActionProps>(
    ({ children, altText, className, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(
                'inline-flex h-8 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                className,
            )}
            aria-label={altText}
            {...props}
        >
            {children}
        </button>
    ),
);

ToastAction.displayName = 'ToastAction';

// ─── Close ───────────────────────────────────────────────────

const ToastClose = forwardRef<HTMLButtonElement, ToastCloseProps>(
    ({ className, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(
                'absolute top-2 right-2 rounded-md p-1 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
                className,
            )}
            aria-label="Close notification"
            {...props}
        >
            <XIcon />
        </button>
    ),
);

ToastClose.displayName = 'ToastClose';

// ─── Toaster (Viewport) ─────────────────────────────────────

/**
 * Toaster viewport component.
 * Renders active toasts in a fixed-position container.
 * Place once in your app's root layout.
 *
 * @example
 * ```tsx
 * // In your root layout
 * <Toaster position="bottom-right" />
 * ```
 */
const Toaster = forwardRef<HTMLDivElement, ToasterProps>(
    ({ position = 'bottom-right', maxVisible = 5, className, ...props }, ref) => {
        const { toasts, dismiss } = useToast();
        const visibleToasts = toasts.slice(0, maxVisible);

        return (
            <div
                ref={ref}
                className={cn(toasterPositionVariants({ position }), className)}
                {...props}
            >
                {visibleToasts.map((toast) => (
                    <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
                ))}
            </div>
        );
    },
);

Toaster.displayName = 'Toaster';

// ─── Exports ─────────────────────────────────────────────────

export {
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastClose,
    Toaster,
    toastVariants,
    toasterPositionVariants,
};
