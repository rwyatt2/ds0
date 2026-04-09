import { forwardRef } from 'react';

import type { BannerProps } from './Banner.types';
import { useBanner } from './useBanner';

/**
 * Headless Banner primitive.
 * Provides behavior, dismiss logic, and ARIA attributes.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <BannerPrimitive variant="info" isDismissible>
 *   We're launching a new feature next week!
 * </BannerPrimitive>
 * ```
 */
const BannerPrimitive = forwardRef<HTMLDivElement, BannerProps>(
    ({ variant, isDismissible, onDismiss, children, ...rest }, ref) => {
        const { bannerProps, dismissButtonProps, isDismissed } = useBanner({
            variant,
            isDismissible,
            onDismiss,
        });

        if (isDismissed) return null;

        return (
            <div ref={ref} {...rest} {...bannerProps}>
                {children}
                {isDismissible && (
                    <button {...dismissButtonProps}>✕</button>
                )}
            </div>
        );
    },
);

BannerPrimitive.displayName = 'BannerPrimitive';

export { BannerPrimitive };
