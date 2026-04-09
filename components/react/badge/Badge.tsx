import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import type { StyledBadgeProps } from '@ds0/primitives';

const badgeVariants = cva(
    'inline-flex items-center rounded-full font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground',
                secondary: 'bg-secondary text-secondary-foreground',
                destructive: 'bg-destructive text-destructive-foreground',
                success: 'bg-success text-success-foreground',
                warning: 'bg-warning text-warning-foreground',
                outline: 'border border-border text-foreground',
            },
            size: {
                sm: 'px-2 py-0.5 text-xs',
                md: 'px-2.5 py-0.5 text-xs',
            },
        },
        defaultVariants: { variant: 'default', size: 'md' },
    },
);

type BadgeVariants = VariantProps<typeof badgeVariants>;
interface BadgeProps extends Omit<StyledBadgeProps, keyof BadgeVariants>, BadgeVariants {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant, size, children, ...props }, ref) => (
        <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
            {children}
        </span>
    ),
);
Badge.displayName = 'Badge';
export { Badge, badgeVariants };
export type { BadgeProps };
