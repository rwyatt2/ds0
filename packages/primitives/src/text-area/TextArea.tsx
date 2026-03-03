import { forwardRef } from 'react';

import type { TextAreaPrimitiveProps } from './TextArea.types';
import { useTextArea } from './useTextArea';

/**
 * Headless TextArea primitive.
 * Provides a labeled multi-line text input with ARIA attributes and error/helper text support.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <TextAreaPrimitive label="Description" rows={4} isRequired />
 * ```
 */
const TextAreaPrimitive = forwardRef<HTMLTextAreaElement, TextAreaPrimitiveProps>(
    (
        {
            label,
            helperText,
            errorMessage,
            isDisabled,
            isRequired,
            isReadOnly,
            isInvalid,
            maxLength,
            showCount,
            id,
            value,
            defaultValue,
            ...rest
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

        const currentLength = typeof value === 'string'
            ? value.length
            : typeof defaultValue === 'string'
                ? defaultValue.length
                : 0;

        return (
            <div>
                <label {...labelProps}>
                    {label}
                    {isRequired && (
                        <>
                            <span aria-hidden="true"> *</span>
                            <span className="sr-only"> required</span>
                        </>
                    )}
                </label>
                <textarea
                    ref={ref}
                    maxLength={maxLength}
                    value={value}
                    defaultValue={defaultValue}
                    {...rest}
                    {...textAreaProps}
                />
                <div>
                    {isInvalid && errorMessage ? (
                        <span {...errorMessageProps}>{errorMessage}</span>
                    ) : helperText ? (
                        <span {...helperTextProps}>{helperText}</span>
                    ) : null}
                    {showCount && maxLength && (
                        <span aria-live="polite">
                            {currentLength}/{maxLength}
                        </span>
                    )}
                </div>
            </div>
        );
    },
);

TextAreaPrimitive.displayName = 'TextAreaPrimitive';

export { TextAreaPrimitive };
