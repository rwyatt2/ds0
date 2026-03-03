import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useTextField } from '@ds0/primitives';
import type { StyledTextFieldProps } from '@ds0/primitives';

import { Label } from '../label';

const textFieldVariants = cva(
    'flex w-full rounded-md border bg-background text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    {
        variants: {
            size: {
                sm: 'h-8 px-3 text-xs',
                md: 'h-10 px-3 text-sm',
                lg: 'h-12 px-4 text-base',
            },
            state: {
                default: 'border-input',
                invalid: 'border-destructive focus-visible:ring-destructive',
                disabled: 'opacity-50 cursor-not-allowed',
            },
        },
        defaultVariants: {
            size: 'md',
            state: 'default',
        },
    },
);

type TextFieldVariants = VariantProps<typeof textFieldVariants>;

interface TextFieldProps extends Omit<StyledTextFieldProps, 'size'>, TextFieldVariants { }

/**
 * Styled TextField component.
 * Built on the headless TextFieldPrimitive with Tailwind CSS styling via cva.
 * Uses the Label component from Wave 1 for consistent form labeling.
 *
 * @example
 * ```tsx
 * <TextField label="Email" type="email" placeholder="you@example.com" />
 * ```
 *
 * @example
 * ```tsx
 * <TextField
 *   label="Password"
 *   type="password"
 *   isRequired
 *   helperText="Must be at least 8 characters"
 * />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/text-field | Documentation}
 */
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            className,
            inputClassName,
            size,
            label,
            type = 'text',
            helperText,
            errorMessage,
            isDisabled,
            isRequired,
            isReadOnly,
            isInvalid,
            leftIcon,
            rightIcon,
            id,
            ...props
        },
        ref,
    ) => {
        const { inputProps, labelProps, helperTextProps, errorMessageProps } =
            useTextField({
                isDisabled,
                isRequired,
                isReadOnly,
                isInvalid,
                id,
            });

        const state = isDisabled
            ? 'disabled'
            : isInvalid
                ? 'invalid'
                : 'default';

        return (
            <div className={cn('space-y-1.5', className)}>
                <Label
                    htmlFor={labelProps.htmlFor}
                    required={isRequired}
                    disabled={isDisabled}
                >
                    {label}
                </Label>

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        type={type}
                        className={cn(
                            textFieldVariants({ size, state }),
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            inputClassName,
                        )}
                        {...props}
                        {...inputProps}
                    />

                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {isInvalid && errorMessage ? (
                    <p
                        className="text-sm text-destructive"
                        {...errorMessageProps}
                    >
                        {errorMessage}
                    </p>
                ) : helperText ? (
                    <p
                        className="text-sm text-muted-foreground"
                        {...helperTextProps}
                    >
                        {helperText}
                    </p>
                ) : null}
            </div>
        );
    },
);

TextField.displayName = 'TextField';

export { TextField, textFieldVariants };
export type { TextFieldProps };
