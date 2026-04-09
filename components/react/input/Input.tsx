import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useInput } from '@ds0/primitives';
import type { StyledInputProps } from '@ds0/primitives';

const inputVariants = cva(
    'flex w-full rounded-md border bg-background text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-input',
                ghost: 'border-transparent bg-transparent hover:bg-accent',
            },
            size: {
                sm: 'h-8 px-3 text-xs',
                md: 'h-10 px-4 text-sm',
                lg: 'h-12 px-6 text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    },
);

type _InputVariants = VariantProps<typeof inputVariants>;

/**
 * Styled Input component.
 * A bare input wrapper providing consistent styling without TextField's label/description chrome.
 * Built on the headless Input primitive with Tailwind CSS styling via cva.
 *
 * @example
 * ```tsx
 * <Input placeholder="Search..." />
 * ```
 *
 * @example
 * ```tsx
 * <Input variant="ghost" size="sm" placeholder="Inline edit..." />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/input | Documentation}
 */
const Input = forwardRef<HTMLInputElement, StyledInputProps>(
    (
        {
            className,
            variant,
            size,
            isDisabled,
            isReadOnly,
            isInvalid,
            type,
            onChange,
            onFocus,
            onBlur,
            ...props
        },
        ref,
    ) => {
        const { inputProps } = useInput({
            isDisabled,
            isReadOnly,
            isInvalid,
            type,
            onChange,
            onFocus,
            onBlur,
        });

        return (
            <input
                ref={ref}
                className={cn(
                    inputVariants({ variant, size }),
                    isDisabled && 'opacity-50 pointer-events-none',
                    isInvalid && 'border-destructive focus-visible:ring-destructive',
                    className,
                )}
                {...props}
                {...inputProps}
            />
        );
    },
);

Input.displayName = 'Input';

export { Input, inputVariants };
export type { StyledInputProps as InputProps };
