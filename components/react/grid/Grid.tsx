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

/** Responsive column count for sm/md/lg breakpoints */
type ResponsiveColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;

const responsiveColClasses: Record<string, Record<number, string>> = {
    sm: { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4', 5: 'sm:grid-cols-5', 6: 'sm:grid-cols-6', 12: 'sm:grid-cols-12' },
    md: { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6', 12: 'md:grid-cols-12' },
    lg: { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6', 12: 'lg:grid-cols-12' },
};

interface GridProps extends Omit<StyledGridProps, keyof GridVariants>, GridVariants {
    /** Responsive column count at sm breakpoint (640px) */
    columnsSm?: ResponsiveColumns;
    /** Responsive column count at md breakpoint (768px) */
    columnsMd?: ResponsiveColumns;
    /** Responsive column count at lg breakpoint (1024px) */
    columnsLg?: ResponsiveColumns;
}

/**
 * Styled Grid component with responsive column support.
 *
 * @example
 * ```tsx
 * <Grid columns={1} columnsSm={2} columnsLg={4} gap="4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 *   <div>Item 4</div>
 * </Grid>
 * ```
 */
const Grid = forwardRef<HTMLElement, GridProps>(
    ({ className, as: Element = 'div', columns, gap, columnsSm, columnsMd, columnsLg, children, ...props }, ref) => {
        const responsiveClasses = [
            columnsSm != null ? responsiveColClasses.sm?.[columnsSm] : undefined,
            columnsMd != null ? responsiveColClasses.md?.[columnsMd] : undefined,
            columnsLg != null ? responsiveColClasses.lg?.[columnsLg] : undefined,
        ].filter(Boolean);

        return (
            <Element
                ref={ref}
                className={cn(gridVariants({ columns, gap }), ...responsiveClasses, className)}
                {...props}
            >
                {children}
            </Element>
        );
    },
);
Grid.displayName = 'Grid';
export { Grid, gridVariants };
export type { GridProps };
