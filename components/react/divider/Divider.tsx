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
interface DividerProps extends Omit<StyledDividerProps, keyof DividerVariants>, DividerVariants {
    /** Optional text to display centered within the divider line */
    children?: React.ReactNode;
}

/**
 * Styled Divider component.
 * Renders a horizontal or vertical rule. When children are provided,
 * renders a text divider with lines on either side.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider>or</Divider>
 * <Divider orientation="vertical" />
 * ```
 */
const Divider = forwardRef<HTMLDivElement, DividerProps>(
    ({ className, orientation = 'horizontal', decorative = true, children, ...props }, ref) => {
        const { dividerProps } = useDivider({ orientation: orientation ?? undefined, decorative });

        if (children && orientation === 'horizontal') {
            return (
                <div
                    ref={ref}
                    className={cn('flex items-center gap-3 w-full', className)}
                    {...props}
                    {...dividerProps}
                >
                    <div className="flex-1 h-[1px] bg-border" />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{children}</span>
                    <div className="flex-1 h-[1px] bg-border" />
                </div>
            );
        }

        return <div ref={ref} className={cn(dividerVariants({ orientation }), className)} {...props} {...dividerProps} />;
    },
);
Divider.displayName = 'Divider';
export { Divider, dividerVariants };
export type { DividerProps };
