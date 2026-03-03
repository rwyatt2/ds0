import { forwardRef } from 'react';

import type { TextFieldPrimitiveProps } from './TextField.types';
import { useTextField } from './useTextField';

/**
 * Headless TextField primitive.
 * Provides a labeled text input with ARIA attributes and error/helper text support.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <TextFieldPrimitive label="Email" type="email" isRequired />
 * ```
 */
const TextFieldPrimitive = forwardRef<HTMLInputElement, TextFieldPrimitiveProps>(
    (
        {
            label,
            type = 'text',
            helperText,
            errorMessage,
            isDisabled,
            isRequired,
            isReadOnly,
            isInvalid,
            id,
            ...rest
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
                <input ref={ref} type={type} {...rest} {...inputProps} />
                {isInvalid && errorMessage ? (
                    <div {...errorMessageProps}>{errorMessage}</div>
                ) : helperText ? (
                    <div {...helperTextProps}>{helperText}</div>
                ) : null}
            </div>
        );
    },
);

TextFieldPrimitive.displayName = 'TextFieldPrimitive';

export { TextFieldPrimitive };
