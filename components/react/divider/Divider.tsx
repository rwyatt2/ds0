import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useDivider } from '@ds0/primitives';
import type { StyledDividerProps } from '@ds0/primitives';

const dividerVariants = cva('shrink-0 bg-border', {
    variants: {
        orientation: { horizontal: 'h-[1px] w-full', vertical: 'h-full w-[1px]' },
    },
    defaultVariants: { orientation: 'horizontal' },
});

type DividerVariants = VariantProps<typeof dividerVariants>;
interface DividerProps extends StyledDividerProps, DividerVariants {}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
    ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
        const { dividerProps } = useDivider({ orientation, decorative });
        return <div ref={ref} className={cn(dividerVariants({ orientation }), className)} {...props} {...dividerProps} />;
    },
);
Divider.displayName = 'Divider';
export { Divider, dividerVariants };
export type { DividerProps };
