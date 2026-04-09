import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useStatusDot } from '@ds0/primitives';
import type { StyledStatusDotProps } from '@ds0/primitives';

const statusDotVariants = cva(
    'inline-block rounded-full shrink-0',
    {
        variants: {
            variant: {
                online: 'bg-emerald-500',
                offline: 'bg-muted-foreground/40',
                busy: 'bg-destructive',
                away: 'bg-amber-500',
                error: 'bg-destructive',
                warning: 'bg-amber-500',
                neutral: 'bg-muted-foreground',
            },
            size: {
                sm: 'h-2 w-2',
                md: 'h-3 w-3',
                lg: 'h-4 w-4',
            },
        },
        defaultVariants: {
            variant: 'neutral',
            size: 'md',
        },
    },
);

type _StatusDotVariants = VariantProps<typeof statusDotVariants>;

/**
 * Styled StatusDot component.
 * A small circular indicator that communicates the current status of an entity.
 *
 * @example
 * ```tsx
 * <StatusDot variant="online" label="Online" />
 * <StatusDot variant="busy" pulse label="In a meeting" />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/status-dot | Documentation}
 */
const StatusDot = forwardRef<HTMLSpanElement, StyledStatusDotProps>(
    (
        {
            className,
            variant = 'neutral',
            size,
            pulse,
            label,
            ...props
        },
        ref,
    ) => {
        const { statusDotProps } = useStatusDot({ variant, label });

        return (
            <span
                ref={ref}
                className={cn(
                    'relative inline-flex',
                    className,
                )}
                {...props}
                {...statusDotProps}
            >
                <span
                    className={cn(statusDotVariants({ variant, size }))}
                    aria-hidden="true"
                />
                {pulse && (
                    <span
                        className={cn(
                            statusDotVariants({ variant, size }),
                            'absolute inset-0 animate-ping opacity-75',
                        )}
                        aria-hidden="true"
                    />
                )}
            </span>
        );
    },
);

StatusDot.displayName = 'StatusDot';

export { StatusDot, statusDotVariants };
export type { StyledStatusDotProps as StatusDotProps };
