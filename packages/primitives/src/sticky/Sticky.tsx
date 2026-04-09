import { forwardRef, createElement, type ElementType } from 'react';

import type { StickyProps } from './Sticky.types';
import { useSticky } from './useSticky';

/**
 * Headless Sticky primitive.
 * Provides position:sticky behavior with stuck-state detection via IntersectionObserver.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <StickyPrimitive>
 *   <Toolbar>...</Toolbar>
 * </StickyPrimitive>
 * ```
 */
const StickyPrimitive = forwardRef<HTMLElement, StickyProps>(
  ({ as, variant, offset, isStuck: controlledStuck, onStuckChange, children, ...rest }, ref) => {
    const Tag: ElementType = as || 'div';
    const { stickyProps, sentinelRef } = useSticky({
      variant,
      offset,
      isStuck: controlledStuck,
      onStuckChange,
    });

    return (
      <>
        <div
          ref={sentinelRef}
          style={{ height: 0, width: '100%', visibility: 'hidden' }}
          aria-hidden="true"
        />
        {createElement(
          Tag,
          { ref, ...rest, ...stickyProps, style: { ...stickyProps.style } },
          children,
        )}
      </>
    );
  },
);

StickyPrimitive.displayName = 'StickyPrimitive';

export { StickyPrimitive };
