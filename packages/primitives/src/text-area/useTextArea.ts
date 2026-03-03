import { useId } from 'react';

import type { UseTextAreaProps, UseTextAreaReturn } from './TextArea.types';

/**
 * Hook that encapsulates TextArea behavior.
 * Manages ARIA attributes, label/textarea connection, and helper/error text association.
 *
 * @param props - Configuration options
 * @returns Props to spread onto textarea, label, helper text, and error message elements
 *
 * @example
 * ```tsx
 * const { textAreaProps, labelProps } = useTextArea({ isRequired: true });
 * return (
 *   <div>
 *     <label {...labelProps}>Description</label>
 *     <textarea {...textAreaProps} />
 *   </div>
 * );
 * ```
 */
export function useTextArea(props: UseTextAreaProps = {}): UseTextAreaReturn {
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
        textAreaProps: {
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
