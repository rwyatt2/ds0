import { useCallback, useEffect, useState } from 'react';

/**
 * Side options for overlay positioning.
 */
type Side = 'top' | 'right' | 'bottom' | 'left';

/**
 * Alignment options for overlay positioning.
 */
type Align = 'start' | 'center' | 'end';

/**
 * Props for the usePositioning hook.
 */
interface UsePositioningProps {
    /** Ref to the trigger element */
    triggerRef: React.RefObject<HTMLElement | null>;
    /** Ref to the content element */
    contentRef: React.RefObject<HTMLElement | null>;
    /** Preferred side to position on */
    side?: Side;
    /** Alignment along the cross axis */
    align?: Align;
    /** Distance from trigger in pixels */
    sideOffset?: number;
    /** Whether positioning is active */
    isOpen: boolean;
}

/**
 * Computed position values for the overlay.
 */
interface PositionStyles {
    /** CSS top value */
    top: number;
    /** CSS left value */
    left: number;
    /** The actual side used (may flip from preferred) */
    actualSide: Side;
}

/**
 * Return value of the usePositioning hook.
 */
interface UsePositioningReturn {
    /** Inline styles to apply to the content element */
    styles: React.CSSProperties;
    /** The actual side the content was placed on (may differ from preferred due to flipping) */
    actualSide: Side;
}

/**
 * Calculates fixed position for an overlay element relative to a trigger.
 * Handles automatic flipping when there isn't enough space on the preferred side.
 *
 * Used by Select, Popover, and Tooltip for positioning their content.
 *
 * @param props - Trigger ref, content ref, side, align, offset, and open state
 * @returns Inline styles and the actual side used
 *
 * @example
 * ```ts
 * const { styles, actualSide } = usePositioning({
 *   triggerRef,
 *   contentRef,
 *   side: 'bottom',
 *   align: 'start',
 *   sideOffset: 4,
 *   isOpen,
 * });
 * ```
 */
export function usePositioning(props: UsePositioningProps): UsePositioningReturn {
    const { triggerRef, contentRef, side = 'bottom', align = 'center', sideOffset = 4, isOpen } = props;

    const [position, setPosition] = useState<PositionStyles>({
        top: 0,
        left: 0,
        actualSide: side,
    });

    const calculate = useCallback(() => {
        if (!triggerRef.current || !contentRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let actualSide = side;

        // Flip logic for top/bottom
        if (side === 'bottom' && triggerRect.bottom + sideOffset + contentRect.height > viewportHeight) {
            if (triggerRect.top - sideOffset - contentRect.height > 0) {
                actualSide = 'top';
            }
        } else if (side === 'top' && triggerRect.top - sideOffset - contentRect.height < 0) {
            if (triggerRect.bottom + sideOffset + contentRect.height <= viewportHeight) {
                actualSide = 'bottom';
            }
        }

        // Flip logic for left/right
        if (side === 'right' && triggerRect.right + sideOffset + contentRect.width > viewportWidth) {
            if (triggerRect.left - sideOffset - contentRect.width > 0) {
                actualSide = 'left';
            }
        } else if (side === 'left' && triggerRect.left - sideOffset - contentRect.width < 0) {
            if (triggerRect.right + sideOffset + contentRect.width <= viewportWidth) {
                actualSide = 'right';
            }
        }

        let top = 0;
        let left = 0;

        // Calculate primary axis position
        switch (actualSide) {
            case 'bottom':
                top = triggerRect.bottom + sideOffset;
                break;
            case 'top':
                top = triggerRect.top - contentRect.height - sideOffset;
                break;
            case 'right':
                left = triggerRect.right + sideOffset;
                break;
            case 'left':
                left = triggerRect.left - contentRect.width - sideOffset;
                break;
        }

        // Calculate cross axis position (alignment)
        if (actualSide === 'top' || actualSide === 'bottom') {
            switch (align) {
                case 'start':
                    left = triggerRect.left;
                    break;
                case 'center':
                    left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
                    break;
                case 'end':
                    left = triggerRect.right - contentRect.width;
                    break;
            }
        } else {
            switch (align) {
                case 'start':
                    top = triggerRect.top;
                    break;
                case 'center':
                    top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
                    break;
                case 'end':
                    top = triggerRect.bottom - contentRect.height;
                    break;
            }
        }

        // Clamp to viewport bounds
        left = Math.max(0, Math.min(left, viewportWidth - contentRect.width));
        top = Math.max(0, Math.min(top, viewportHeight - contentRect.height));

        setPosition({ top, left, actualSide });
    }, [triggerRef, contentRef, side, align, sideOffset]);

    useEffect(() => {
        if (!isOpen) return;

        // Calculate immediately and on layout changes
        const rafId = requestAnimationFrame(calculate);

        window.addEventListener('resize', calculate);
        window.addEventListener('scroll', calculate, true);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', calculate);
            window.removeEventListener('scroll', calculate, true);
        };
    }, [isOpen, calculate]);

    return {
        styles: {
            position: 'fixed' as const,
            top: position.top,
            left: position.left,
            zIndex: 50,
        },
        actualSide: position.actualSide,
    };
}

export type { Side, Align, UsePositioningProps, UsePositioningReturn };
