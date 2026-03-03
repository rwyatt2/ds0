import type React from 'react';

/**
 * Props for the useTextArea hook.
 */
export interface UseTextAreaProps {
    /** Whether the textarea is disabled */
    isDisabled?: boolean;
    /** Whether the textarea is required */
    isRequired?: boolean;
    /** Whether the textarea is read-only */
    isReadOnly?: boolean;
    /** Whether the textarea is in an invalid state */
    isInvalid?: boolean;
    /** Custom id for the textarea element */
    id?: string;
}

/**
 * Return value of the useTextArea hook.
 */
export interface UseTextAreaReturn {
    /** Props to spread onto the textarea element */
    textAreaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    /** Props to spread onto the label element */
    labelProps: { htmlFor: string };
    /** Props to spread onto the helper text element */
    helperTextProps: { id: string };
    /** Props to spread onto the error message element */
    errorMessageProps: { id: string; role: 'alert' };
    /** The generated or provided field id */
    fieldId: string;
}

/**
 * Props for the TextAreaPrimitive component.
 */
export interface TextAreaPrimitiveProps
    extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'disabled' | 'required' | 'readOnly'>,
    UseTextAreaProps {
    /** Visible label text */
    label: string;
    /** Helper text shown below the textarea */
    helperText?: string;
    /** Error message shown when isInvalid */
    errorMessage?: string;
    /** Maximum character count */
    maxLength?: number;
    /** Whether to show character count */
    showCount?: boolean;
}

/**
 * Props for the styled TextArea component.
 */
export interface StyledTextAreaProps extends TextAreaPrimitiveProps {
    /** TextArea size */
    size?: 'sm' | 'md' | 'lg';
    /** Resize behavior */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    /** Additional CSS classes */
    className?: string;
}
