import { useId } from 'react';

import type { UseTextFieldProps, UseTextFieldReturn } from './TextField.types';

/**
 * Hook that encapsulates TextField behavior.
 * Manages ARIA attributes, label/input connection, and helper/error text association.
 *
 * @param props - Configuration options
 * @returns Props to spread onto input, label, helper text, and error message elements
 *
 * @example
 * ```tsx
 * const { inputProps, labelProps, helperTextProps } = useTextField({
 *   isRequired: true,
 * });
 * return (
 *   <div>
 *     <label {...labelProps}>Email</label>
 *     <input {...inputProps} />
 *     <span {...helperTextProps}>Enter your email</span>
 *   </div>
 * );
 * ```
 */
export function useTextField(props: UseTextFieldProps = {}): UseTextFieldReturn {
    const {
        isDisabled = false,
        isRequired = false,
        isReadOnly = false,
        isInvalid = false,
        id,
    } = props;

    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const helperTextId = `${fieldId}-helper`;
    const errorMessageId = `${fieldId}-error`;

    const describedBy = isInvalid ? errorMessageId : helperTextId;

    return {
        inputProps: {
            id: fieldId,
            'aria-invalid': isInvalid || undefined,
            'aria-required': isRequired || undefined,
            'aria-disabled': isDisabled || undefined,
            'aria-describedby': describedBy,
            readOnly: isReadOnly,
            tabIndex: isDisabled ? -1 : undefined,
        },
        labelProps: {
            htmlFor: fieldId,
        },
        helperTextProps: {
            id: helperTextId,
        },
        errorMessageProps: {
            id: errorMessageId,
            role: 'alert' as const,
        },
        fieldId,
    };
}
