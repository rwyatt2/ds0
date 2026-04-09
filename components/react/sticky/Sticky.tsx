import React, { forwardRef, createElement, type ElementType } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useSticky } from '@ds0/primitives';
import type { StyledStickyProps } from '@ds0/primitives';

const stickyVariants = cva('transition-shadow duration-200', {
  variants: {
    variant: {
      top: '',
      bottom: '',
    },
  },
  defaultVariants: {
    variant: 'top',
  },
});

/**
 * Styled Sticky component.
 * A position:sticky wrapper with IntersectionObserver-based stuck detection.
 * Applies optional shadow and sets `data-stuck` attribute when the element pins.
 *
 * @example
 * ```tsx
 * <Sticky>
 *   <Toolbar>...</Toolbar>
 * </Sticky>
 * ```
 *
 * @example
 * ```tsx
 * <Sticky variant="bottom" shadow onStuckChange={(stuck) => console.log(stuck)}>
 *   <ActionBar>...</ActionBar>
 * </Sticky>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/sticky | Documentation}
 */
const Sticky = forwardRef<HTMLElement, StyledStickyProps>(
  (
    {
      className,
      as,
      variant = 'top',
      offset,
      shadow = true,
      isStuck: controlledStuck,
      onStuckChange,
      children,
      ...props
    },
    ref,
  ) => {
    const Tag: ElementType = as || 'div';
    const { stickyProps, sentinelRef, isStuck } = useSticky({
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
          {
            ref,
            ...props,
            ...stickyProps,
            className: cn(
              stickyVariants({ variant }),
              isStuck && shadow && 'shadow-md',
              isStuck && 'bg-background',
              className,
            ),
            style: { ...stickyProps.style },
          },
          children,
        )}
      </>
    );
  },
);

Sticky.displayName = 'Sticky';

export { Sticky, stickyVariants };
export type { StyledStickyProps as StickyProps };
