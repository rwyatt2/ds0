import React, { forwardRef } from 'react';

import { useProgress } from './useProgress';
import type { ProgressProps } from './Progress.types';

/**
 * Headless Progress primitive.
 * A visual bar indicating completion status with proper ARIA attributes.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <ProgressPrimitive value={42} max={100} label="Loading" />
 * ```
 */
const ProgressPrimitive = forwardRef<HTMLDivElement, ProgressProps>(
    ({ value, max, label, indeterminate, showValue, variant: _variant, size: _size, className, ...props }, ref) => {
        const { progressProps, percentage } = useProgress({ value, max, label, indeterminate });

        return (
            <div className={className}>
                {(label || showValue) && (
                    <div>
                        {label && <span>{label}</span>}
                        {showValue && !indeterminate && percentage !== undefined && (
                            <span>{Math.round(percentage)}%</span>
                        )}
                    </div>
                )}
                <div
                    ref={ref}
                    {...progressProps}
                    data-indeterminate={indeterminate || undefined}
                    {...props}
                >
                    <div
                        data-indicator
                        style={indeterminate ? undefined : { width: `${percentage}%` }}
                    />
                </div>
            </div>
        );
    },
);

ProgressPrimitive.displayName = 'ProgressPrimitive';

export { ProgressPrimitive };
