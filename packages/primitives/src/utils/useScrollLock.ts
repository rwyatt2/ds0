import { useEffect } from 'react';

/**
 * Prevents body scroll when active.
 * Compensates for scrollbar width to prevent layout shift.
 * Restores original overflow and padding on cleanup.
 *
 * Used by Dialog and Drawer for modal overlays.
 *
 * @param isLocked - Whether body scroll should be locked
 *
 * @example
 * ```ts
 * useScrollLock(isOpen);
 * ```
 */
export function useScrollLock(isLocked: boolean): void {
    useEffect(() => {
        if (!isLocked) return;

        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isLocked]);
}
