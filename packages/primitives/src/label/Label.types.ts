import type React from 'react';

export interface UseLabelProps {
    /** ID of the associated input element */
    htmlFor?: string;
    /** Whether the associated field is required */
    required?: boolean;
    /** Whether the associated field is disabled */
    disabled?: boolean;
}

export interface UseLabelReturn {
    labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export interface LabelPrimitiveProps
    extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>,
    UseLabelProps {
    children: React.ReactNode;
}

export interface StyledLabelProps extends LabelPrimitiveProps {
    size?: 'sm' | 'md';
    className?: string;
}
