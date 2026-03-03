import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useProgress } from '@ds0/primitives';
import type { StyledProgressProps } from '@ds0/primitives';

const progressTrackVariants = cva(
    'relative w-full overflow-hidden rounded-full bg-secondary',
    {
        variants: {
            size: {
                sm: 'h-1',
                md: 'h-2',
                lg: 'h-4',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    },
);

const progressIndicatorVariants = cva(
    'h-full rounded-full transition-all duration-500 ease-in-out',
    {
        variants: {
            variant: {
                default: 'bg-primary',
                success: 'bg-green-500',
                warning: 'bg-yellow-500',
                destructive: 'bg-destructive',
            },
            indeterminate: {
                true: 'animate-progress-indeterminate w-1/3',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            indeterminate: false,
        },
    },
);

/**
 * Styled Progress component.
 * A visual bar indicating the completion status of a task or process.
 *
 * @example
 * ```tsx
 * <Progress value={42} label="Uploading" showValue />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/progress | Documentation}
 */
const Progress = forwardRef<HTMLDivElement, StyledProgressProps>(
    ({ value = 0, max = 100, label, showValue, variant = 'default', size = 'md', indeterminate = false, className, ...props }, ref) => {
        const { progressProps, percentage } = useProgress({ value, max, label, indeterminate });

        return (
            <div className={cn('w-full', className)}>
                {(label || showValue) && (
                    <div className="flex justify-between mb-1">
                        {label && <span className="text-sm font-medium">{label}</span>}
                        {showValue && !indeterminate && percentage !== undefined && (
                            <span className="text-sm text-muted-foreground">{Math.round(percentage)}%</span>
                        )}
                    </div>
                )}
                <div
                    ref={ref}
                    className={cn(progressTrackVariants({ size }))}
                    {...progressProps}
                    {...props}
                >
                    <div
                        className={cn(progressIndicatorVariants({ variant, indeterminate: indeterminate || undefined }))}
                        style={indeterminate ? undefined : { width: `${percentage}%` }}
                    />
                </div>
            </div>
        );
    },
);

Progress.displayName = 'Progress';

export { Progress, progressTrackVariants, progressIndicatorVariants };
export type { StyledProgressProps as ProgressProps };
