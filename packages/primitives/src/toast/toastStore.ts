import type { ToastState, ToastOptions, ToastSubscriber } from './Toast.types';

let toasts: ToastState[] = [];
let listeners: ToastSubscriber[] = [];
let counter = 0;

function generateId(): string {
    counter += 1;
    return `toast-${counter}-${Date.now()}`;
}

function notify(): void {
    listeners.forEach((listener) => listener());
}

/**
 * Global toast store.
 * Provides an imperative API for managing toasts from anywhere in the app.
 */
export const toastStore = {
    /**
     * Subscribe to toast state changes.
     * Returns an unsubscribe function.
     */
    subscribe(listener: ToastSubscriber): () => void {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    },

    /**
     * Get all current toasts.
     */
    getToasts(): ToastState[] {
        return toasts;
    },

    /**
     * Add a new toast. Returns the toast ID.
     */
    addToast(options: ToastOptions): string {
        const id = generateId();
        const toast: ToastState = {
            ...options,
            id,
            duration: options.duration ?? 5000,
        };
        toasts = [toast, ...toasts];
        notify();

        // Auto-dismiss
        if (toast.duration && toast.duration > 0) {
            setTimeout(() => {
                toastStore.dismissToast(id);
            }, toast.duration);
        }

        return id;
    },

    /**
     * Dismiss a specific toast by ID.
     */
    dismissToast(id: string): void {
        const toast = toasts.find((t) => t.id === id);
        if (toast?.onDismiss) toast.onDismiss();
        toasts = toasts.filter((t) => t.id !== id);
        notify();
    },

    /**
     * Dismiss all toasts.
     */
    dismissAll(): void {
        toasts.forEach((t) => t.onDismiss?.());
        toasts = [];
        notify();
    },

    /**
     * Update an existing toast.
     */
    updateToast(id: string, updates: Partial<ToastOptions>): void {
        toasts = toasts.map((t) =>
            t.id === id ? { ...t, ...updates } : t,
        );
        notify();
    },

    /**
     * Reset store (useful for testing).
     */
    _reset(): void {
        toasts = [];
        listeners = [];
        counter = 0;
    },
};
