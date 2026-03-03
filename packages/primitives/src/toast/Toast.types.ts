import React from 'react';

/**
 * Individual toast state.
 */
export interface ToastState {
    /** Unique toast ID */
    id: string;
    /** Title text */
    title?: string;
    /** Description text */
    description?: string;
    /** Visual variant */
    variant?: 'default' | 'success' | 'warning' | 'destructive';
    /** Auto-dismiss duration in ms (0 = persistent) */
    duration?: number;
    /** Action element (e.g. Undo button) */
    action?: React.ReactNode;
    /** Called when toast is dismissed */
    onDismiss?: () => void;
}

/**
 * Options for creating a toast.
 */
export type ToastOptions = Omit<ToastState, 'id'>;

/**
 * Toast store subscriber callback.
 */
export type ToastSubscriber = () => void;

/**
 * Props for the Toast element component.
 */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Toast state */
    toast: ToastState;
    /** Called to dismiss the toast */
    onDismiss: (id: string) => void;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for styled Toast sub-components.
 */
export interface ToastTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export interface ToastDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export interface ToastActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    altText: string;
    className?: string;
}

export interface ToastCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

/**
 * Props for the Toaster viewport component.
 */
export interface ToasterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Position on screen */
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    /** Maximum number of visible toasts */
    maxVisible?: number;
    /** Default auto-dismiss duration in ms */
    duration?: number;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Return type if useToast hook.
 */
export interface UseToastReturn {
    /** Active toasts */
    toasts: ToastState[];
    /** Show a toast */
    toast: (options: ToastOptions) => string;
    /** Dismiss a specific toast */
    dismiss: (id: string) => void;
    /** Dismiss all toasts */
    dismissAll: () => void;
}
