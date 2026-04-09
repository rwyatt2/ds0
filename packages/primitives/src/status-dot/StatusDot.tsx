import { forwardRef } from 'react';

import type { StatusDotProps } from './StatusDot.types';
import { useStatusDot } from './useStatusDot';

/**
 * Headless StatusDot primitive.
 * Provides ARIA attributes for status indication.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <StatusDotPrimitive variant="online" label="Online" />
 * ```
 */
const StatusDotPrimitive = forwardRef<HTMLSpanElement, StatusDotProps>(
    ({ variant, pulse: _pulse, label, ...rest }, ref) => {
        const { statusDotProps } = useStatusDot({ variant, label });

        return (
            <span ref={ref} {...rest} {...statusDotProps} />
        );
    },
);

StatusDotPrimitive.displayName = 'StatusDotPrimitive';

export { StatusDotPrimitive };
