import type React from 'react';

/**
 * Props for the useButton hook.
 */
export interface UseButtonProps {
    /** Whether the button is disabled */
    isDisabled?: boolean;
    /** Whether the button is in a loading state */
    isLoading?: boolean;
    /** HTML button type */
    type?: 'button' | 'submit' | 'reset';
    /** Click handler */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /** Keyboard down handler */
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
    /** Keyboard up handler */
    onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement>;
}

/**
 * Return value of the useButton hook.
 */
export interface UseButtonReturn {
    /** Props to spread onto the button element */
    buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * Props for the ButtonPrimitive component.
 */
export interface ButtonPrimitiveProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    UseButtonProps {
    /** Content to display inside the button */
    children: React.ReactNode;
}

/**
 * Props for the styled Button component.
 */
export interface StyledButtonProps extends ButtonPrimitiveProps {
    /** The visual style of the button */
    variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
    /** The size of the button */
    size?: 'sm' | 'md' | 'lg';
    /** Text to display while loading (replaces children) */
    loadingText?: string;
    /** Icon placed before the label */
    leftIcon?: React.ReactNode;
    /** Icon placed after the label */
    rightIcon?: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}
