import type React from 'react';

/**
 * Props for the useTextField hook.
 */
export interface UseTextFieldProps {
    /** Whether the input is disabled */
    isDisabled?: boolean;
    /** Whether the input is required */
    isRequired?: boolean;
    /** Whether the input is read-only */
    isReadOnly?: boolean;
    /** Whether the input is in an invalid state */
    isInvalid?: boolean;
    /** Custom id for the input element */
    id?: string;
}

/**
 * Return value of the useTextField hook.
 */
export interface UseTextFieldReturn {
    /** Props to spread onto the input element */
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
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
 * Props for the TextFieldPrimitive component.
 */
export interface TextFieldPrimitiveProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'required' | 'readOnly' | 'size'>,
    UseTextFieldProps {
    /** HTML input type */
    type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';
    /** Visible label text */
    label: string;
    /** Helper text shown below the input */
    helperText?: string;
    /** Error message shown when isInvalid */
    errorMessage?: string;
}

/**
 * Props for the styled TextField component.
 */
export interface StyledTextFieldProps extends TextFieldPrimitiveProps {
    /** Input size */
    size?: 'sm' | 'md' | 'lg';
    /** Icon inside input, left side */
    leftIcon?: React.ReactNode;
    /** Icon inside input, right side */
    rightIcon?: React.ReactNode;
    /** Additional CSS classes on wrapper */
    className?: string;
    /** Additional CSS classes on input element */
    inputClassName?: string;
}
