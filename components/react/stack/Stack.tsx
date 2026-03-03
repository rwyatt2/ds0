import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import type { StyledStackProps } from '@ds0/primitives';

const stackVariants = cva('flex', {
    variants: {
        direction: { vertical: 'flex-col', horizontal: 'flex-row' },
        gap: { '0': 'gap-0', '1': 'gap-1', '2': 'gap-2', '3': 'gap-3', '4': 'gap-4', '5': 'gap-5', '6': 'gap-6', '8': 'gap-8', '10': 'gap-10', '12': 'gap-12' },
        align: { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch', baseline: 'items-baseline' },
        justify: { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around', evenly: 'justify-evenly' },
    },
    defaultVariants: { direction: 'vertical', gap: '4', align: 'stretch', justify: 'start' },
});

type StackVariants = VariantProps<typeof stackVariants>;
interface StackProps extends StyledStackProps, StackVariants {}

const Stack = forwardRef<HTMLElement, StackProps>(
    ({ className, as: Element = 'div', direction, gap, align, justify, wrap, children, ...props }, ref) => (
        <Element ref={ref} className={cn(stackVariants({ direction, gap, align, justify }), wrap && 'flex-wrap', className)} {...props}>
            {children}
        </Element>
    ),
);
Stack.displayName = 'Stack';
export { Stack, stackVariants };
export type { StackProps };
