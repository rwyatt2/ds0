import { useEffect } from 'react';

/**
 * Detects clicks outside a ref element and calls the handler.
 * Uses mousedown event for immediate response before focus changes.
 *
 * Used by Select, Popover, Dialog overlay, and Tooltip.
 *
 * @param ref - Ref to the element to detect clicks outside of
 * @param handler - Callback invoked when a click outside is detected
 * @param isActive - Whether the listener is active (default: true)
 *
 * @example
 * ```ts
 * const contentRef = useRef<HTMLDivElement>(null);
 * useClickOutside(contentRef, () => close(), isOpen);
 * ```
 */
export function useClickOutside(
    ref: React.RefObject<HTMLElement | null>,
    handler: (event: MouseEvent | TouchEvent) => void,
    isActive: boolean = true,
): void {
    useEffect(() => {
        if (!isActive) return;

        function handleEvent(event: MouseEvent | TouchEvent): void {
            const target = event.target as Node;
            if (!ref.current || ref.current.contains(target)) return;

            // Ignore clicks on portal elements that belong to this component
            const portal = (target as HTMLElement).closest?.('[data-ds0-portal]');
            if (portal && ref.current.closest('[data-ds0-portal]') === portal) return;

            handler(event);
        }

        document.addEventListener('mousedown', handleEvent);
        document.addEventListener('touchstart', handleEvent);

        return () => {
            document.removeEventListener('mousedown', handleEvent);
            document.removeEventListener('touchstart', handleEvent);
        };
    }, [ref, handler, isActive]);
}
