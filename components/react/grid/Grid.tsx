import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import type { StyledGridProps } from '@ds0/primitives';

const gridVariants = cva('grid', {
    variants: {
        columns: { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6', 12: 'grid-cols-12' },
        gap: { '0': 'gap-0', '1': 'gap-1', '2': 'gap-2', '3': 'gap-3', '4': 'gap-4', '5': 'gap-5', '6': 'gap-6', '8': 'gap-8' },
    },
    defaultVariants: { columns: 1, gap: '4' },
});

type GridVariants = VariantProps<typeof gridVariants>;
interface GridProps extends StyledGridProps, GridVariants {}

const Grid = forwardRef<HTMLElement, GridProps>(
    ({ className, as: Element = 'div', columns, gap, children, ...props }, ref) => (
        <Element ref={ref} className={cn(gridVariants({ columns, gap }), className)} {...props}>{children}</Element>
    ),
);
Grid.displayName = 'Grid';
export { Grid, gridVariants };
export type { GridProps };
