import { useSyncExternalStore } from 'react';

import { toastStore } from './toastStore';
import type { ToastOptions, UseToastReturn } from './Toast.types';

/**
 * Hook for managing toast notifications.
 * Uses `useSyncExternalStore` to reactively subscribe to the global toast store.
 *
 * @returns Object with `toasts` array, `toast()` function, `dismiss()`, and `dismissAll()`.
 *
 * @example
 * ```tsx
 * const { toast, dismiss } = useToast();
 *
 * // Show a toast
 * const id = toast({ title: 'Saved', description: 'Your changes have been saved.' });
 *
 * // Dismiss a specific toast
 * dismiss(id);
 * ```
 */
export function useToast(): UseToastReturn {
    const toasts = useSyncExternalStore(
        toastStore.subscribe,
        toastStore.getToasts,
        toastStore.getToasts, // SSR snapshot
    );

    return {
        toasts,
        toast: (options: ToastOptions) => toastStore.addToast(options),
        dismiss: (id: string) => toastStore.dismissToast(id),
        dismissAll: () => toastStore.dismissAll(),
    };
}

/**
 * Imperative toast function.
 * Can be called outside React components.
 *
 * @example
 * ```ts
 * import { toast } from '@ds0/primitives';
 * toast({ title: 'Copied!' });
 * ```
 */
export function toast(options: ToastOptions): string {
    return toastStore.addToast(options);
}
