import { useEffect } from 'react';

/**
 * Listens for the Escape key and calls the handler.
 * Only active when `isActive` is true.
 *
 * Used by Dialog, Drawer, Popover, Tooltip, and Select.
 *
 * @param handler - Callback invoked when Escape is pressed
 * @param isActive - Whether the listener is active (default: true)
 *
 * @example
 * ```ts
 * useEscapeKey(() => close(), isOpen);
 * ```
 */
export function useEscapeKey(
    handler: (event: KeyboardEvent) => void,
    isActive: boolean = true,
): void {
    useEffect(() => {
        if (!isActive) return;

        function handleKeyDown(event: KeyboardEvent): void {
            if (event.key === 'Escape') {
                handler(event);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handler, isActive]);
}
