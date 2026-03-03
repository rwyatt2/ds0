import { useEffect } from 'react';

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Traps keyboard focus inside a container element.
 * Tab and Shift+Tab cycle through focusable elements without escaping.
 * Focuses the first focusable element when activated.
 *
 * Used by Dialog and Drawer for modal focus management.
 *
 * @param containerRef - Ref to the container element to trap focus within
 * @param isActive - Whether the focus trap is currently active
 *
 * @example
 * ```ts
 * const contentRef = useRef<HTMLDivElement>(null);
 * useFocusTrap(contentRef, isOpen);
 * ```
 */
export function useFocusTrap(
    containerRef: React.RefObject<HTMLElement | null>,
    isActive: boolean,
): void {
    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        const container = containerRef.current;

        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(() => {
            const focusableElements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
            const firstEl = focusableElements[0];
            if (firstEl) {
                firstEl.focus();
            }
        }, 0);

        function handleKeyDown(event: KeyboardEvent): void {
            if (event.key !== 'Tab') return;

            const focusableElements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
            if (focusableElements.length === 0) return;

            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (!firstFocusable || !lastFocusable) return;

            if (event.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    event.preventDefault();
                }
            }
        }

        container.addEventListener('keydown', handleKeyDown);

        return () => {
            clearTimeout(timeoutId);
            container.removeEventListener('keydown', handleKeyDown);
        };
    }, [isActive, containerRef]);
}
