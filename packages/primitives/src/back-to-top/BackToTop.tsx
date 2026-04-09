import { forwardRef } from 'react';

import type { BackToTopProps } from './BackToTop.types';
import { useBackToTop } from './useBackToTop';

/**
 * Headless BackToTop primitive.
 * Provides scroll-to-top behavior, keyboard interactions, and ARIA attributes.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <BackToTopPrimitive threshold={300}>
 *   ↑ Back to top
 * </BackToTopPrimitive>
 * ```
 */
const BackToTopPrimitive = forwardRef<HTMLButtonElement, BackToTopProps>(
  ({ children, threshold, smooth, isDisabled, isVisible: controlledVisible, ...rest }, ref) => {
    const { backToTopProps, isVisible } = useBackToTop({
      threshold,
      smooth,
      isDisabled,
      isVisible: controlledVisible,
    });

    if (!isVisible) return null;

    return (
      <button ref={ref} {...rest} {...backToTopProps}>
        {children}
      </button>
    );
  },
);

BackToTopPrimitive.displayName = 'BackToTopPrimitive';

export { BackToTopPrimitive };
