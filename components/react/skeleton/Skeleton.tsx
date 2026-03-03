import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import type { StyledSkeletonProps } from '@ds0/primitives';

const skeletonVariants = cva('animate-pulse bg-muted', {
    variants: {
        variant: { text: 'h-4 rounded', circular: 'rounded-full', rectangular: 'rounded-md' },
    },
    defaultVariants: { variant: 'text' },
});

type SkeletonVariants = VariantProps<typeof skeletonVariants>;
interface SkeletonProps extends Omit<StyledSkeletonProps, 'variant'>, SkeletonVariants { }

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, variant = 'text', width, height, lines = 1, ...props }, ref) => {
        if (variant === 'text' && lines > 1) {
            return (
                <div ref={ref} className={cn('flex flex-col', className)} aria-hidden="true" {...props}>
                    {Array.from({ length: lines }).map((_, i) => (
                        <div key={i} className={cn(skeletonVariants({ variant }), i < lines - 1 ? 'mb-2' : '', i === lines - 1 ? 'w-4/5' : 'w-full')} style={{ width: i === lines - 1 ? undefined : width, height }} />
                    ))}
                </div>
            );
        }
        return <div ref={ref} className={cn(skeletonVariants({ variant }), className)} style={{ width, height }} aria-hidden="true" {...props} />;
    },
);
Skeleton.displayName = 'Skeleton';
export { Skeleton, skeletonVariants };
export type { SkeletonProps };
