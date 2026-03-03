import type React from 'react';

/**
 * Props for the useCheckbox hook.
 */
export interface UseCheckboxProps {
    /** Controlled checked state */
    checked?: boolean;
    /** Uncontrolled default checked state */
    defaultChecked?: boolean;
    /** Change handler */
    onCheckedChange?: (checked: boolean | 'indeterminate') => void;
    /** Whether the checkbox is in an indeterminate state */
    indeterminate?: boolean;
    /** Whether the checkbox is disabled */
    isDisabled?: boolean;
    /** Whether the checkbox is required */
    isRequired?: boolean;
    /** Whether the checkbox is in an invalid state */
    isInvalid?: boolean;
    /** Custom id */
    id?: string;
}

/**
 * Return value of the useCheckbox hook.
 */
export interface UseCheckboxReturn {
    /** Props to spread onto the hidden input element */
    checkboxProps: React.InputHTMLAttributes<HTMLInputElement>;
    /** Props to spread onto the label element */
    labelProps: { htmlFor: string };
    /** Whether the checkbox is currently checked */
    isChecked: boolean;
    /** Whether the checkbox is in indeterminate state */
    isIndeterminate: boolean;
    /** Current state */
    state: 'checked' | 'unchecked' | 'indeterminate';
    /** Ref to pass to the input element for indeterminate control */
    inputRef: React.RefObject<HTMLInputElement | null>;
    /** Field id */
    fieldId: string;
}

/**
 * Props for the CheckboxPrimitive component.
 */
export interface CheckboxPrimitiveProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'required' | 'checked' | 'defaultChecked' | 'onChange' | 'type' | 'size'>,
    UseCheckboxProps {
    /** Visible label text */
    label: string;
    /** Description text below label */
    description?: string;
}

/**
 * Props for the styled Checkbox component.
 */
export interface StyledCheckboxProps extends CheckboxPrimitiveProps {
    /** Checkbox size */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}
