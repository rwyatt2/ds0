/**
 * Props for the useInput hook.
 */
export interface UseInputProps {
    /** Whether the input is disabled */
    isDisabled?: boolean;
    /** Whether the input is read-only */
    isReadOnly?: boolean;
    /** Whether the input value is invalid */
    isInvalid?: boolean;
    /** HTML input type */
    type?: React.HTMLInputTypeAttribute;
    /** Change handler */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Focus handler */
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    /** Blur handler */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * Return value of the useInput hook.
 */
export interface UseInputReturn {
    /** Props to spread onto the input element */
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * Props for the Input primitive component.
 */
export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'readOnly' | 'type'>,
        UseInputProps {
    /** Placeholder text */
    placeholder?: string;
}

/**
 * Props for the styled Input component.
 */
export interface StyledInputProps extends Omit<InputProps, 'size'> {
    /** Visual variant */
    variant?: 'default' | 'ghost';
    /** Size */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}

