import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';

// ─── Variants ────────────────────────────────────────────────

const buttonGroupVariants = cva(
    'inline-flex',
    {
        variants: {
            orientation: {
                horizontal: 'flex-row',
                vertical: 'flex-col',
            },
        },
        defaultVariants: {
            orientation: 'horizontal',
        },
    },
);

type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement>, ButtonGroupVariants {
    children: React.ReactNode;
}

/**
 * Styled ButtonGroup component.
 * Groups multiple buttons together with connected borders.
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button variant="outline">Left</Button>
 *   <Button variant="outline">Center</Button>
 *   <Button variant="outline">Right</Button>
 * </ButtonGroup>
 * ```
 *
 * @example
 * ```tsx
 * <ButtonGroup orientation="vertical">
 *   <Button variant="outline">Top</Button>
 *   <Button variant="outline">Middle</Button>
 *   <Button variant="outline">Bottom</Button>
 * </ButtonGroup>
 * ```
 *
 * @see {@link https://ds0.dev/docs/components/button-group | Documentation}
 */
const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
    ({ className, orientation = 'horizontal', children, ...props }, ref) => {
        const isHorizontal = orientation === 'horizontal';

        return (
            <div
                ref={ref}
                role="group"
                className={cn(
                    buttonGroupVariants({ orientation }),
                    isHorizontal
                        ? '[&>*]:rounded-none [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md [&>*:not(:first-child)]:-ml-px'
                        : '[&>*]:rounded-none [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md [&>*:not(:first-child)]:-mt-px',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        );
    },
);

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup, buttonGroupVariants };
export type { ButtonGroupProps };
