import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useLabel } from '@ds0/primitives';
import type { StyledLabelProps } from '@ds0/primitives';

const labelVariants = cva(
    'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    {
        variants: {
            size: {
                sm: 'text-xs',
                md: 'text-sm',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    },
);

type LabelVariants = VariantProps<typeof labelVariants>;

interface LabelProps extends StyledLabelProps, LabelVariants { }

/**
 * Styled Label component.
 * Accessible label for form inputs with consistent styling.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email" required>Email Address</Label>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/label | Documentation}
 */
const Label = forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, size, htmlFor, required, disabled, children, ...props }, ref) => {
        const { labelProps } = useLabel({ htmlFor, required, disabled });

        return (
            <label
                ref={ref}
                className={cn(
                    labelVariants({ size }),
                    disabled && 'cursor-not-allowed opacity-70',
                    className,
                )}
                {...props}
                {...labelProps}
            >
                {children}
                {required && (
                    <>
                        <span aria-hidden="true" className="text-destructive ml-0.5"> *</span>
                        <span className="sr-only"> required</span>
                    </>
                )}
            </label>
        );
    },
);

Label.displayName = 'Label';

export { Label, labelVariants };
export type { LabelProps };
