import React, { forwardRef, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useTextArea } from '@ds0/primitives';
import type { StyledTextAreaProps } from '@ds0/primitives';

import { Label } from '../label';

const textAreaVariants = cva(
    'flex w-full rounded-md border bg-background text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    {
        variants: {
            size: {
                sm: 'px-3 py-2 text-xs',
                md: 'px-3 py-2 text-sm',
                lg: 'px-4 py-3 text-base',
            },
            state: {
                default: 'border-input',
                invalid: 'border-destructive focus-visible:ring-destructive',
                disabled: 'opacity-50 cursor-not-allowed',
            },
            resize: {
                none: 'resize-none',
                vertical: 'resize-y',
                horizontal: 'resize-x',
                both: 'resize',
            },
        },
        defaultVariants: {
            size: 'md',
            state: 'default',
            resize: 'vertical',
        },
    },
);

type TextAreaVariants = VariantProps<typeof textAreaVariants>;

interface TextAreaProps extends StyledTextAreaProps, TextAreaVariants { }

/**
 * Styled TextArea component.
 * Multi-line text input with Tailwind CSS styling, character count, and Label integration.
 *
 * @example
 * ```tsx
 * <TextArea label="Description" placeholder="Tell us more..." rows={4} />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/text-area | Documentation}
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            className,
            size,
            resize,
            label,
            helperText,
            errorMessage,
            isDisabled,
            isRequired,
            isReadOnly,
            isInvalid,
            maxLength,
            showCount,
            rows = 3,
            id,
            value,
            defaultValue,
            onChange,
            ...props
        },
        ref,
    ) => {
        const { textAreaProps, labelProps, helperTextProps, errorMessageProps } =
            useTextArea({
                isDisabled,
                isRequired,
                isReadOnly,
                isInvalid,
                id,
            });

        const [charCount, setCharCount] = useState(
            typeof value === 'string'
                ? value.length
                : typeof defaultValue === 'string'
                    ? defaultValue.length
                    : 0,
        );

        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLTextAreaElement>) => {
                if (showCount) {
                    setCharCount(event.target.value.length);
                }
                onChange?.(event);
            },
            [showCount, onChange],
        );

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

                <textarea
                    ref={ref}
                    rows={rows}
                    maxLength={maxLength}
                    value={value}
                    defaultValue={defaultValue}
                    className={cn(
                        textAreaVariants({ size, state, resize }),
                    )}
                    onChange={handleChange}
                    {...props}
                    {...textAreaProps}
                />

                <div className="flex justify-between">
                    <div>
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
                    {showCount && maxLength && (
                        <span
                            className="text-sm text-muted-foreground"
                            aria-live="polite"
                        >
                            {charCount}/{maxLength}
                        </span>
                    )}
                </div>
            </div>
        );
    },
);

TextArea.displayName = 'TextArea';

export { TextArea, textAreaVariants };
export type { TextAreaProps };
