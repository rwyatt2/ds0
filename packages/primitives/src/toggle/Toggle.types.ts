import React from 'react';

/**
 * Props for the useToggle hook.
 */
export interface UseToggleProps {
    /** Controlled pressed state */
    pressed?: boolean;
    /** Default pressed state for uncontrolled mode */
    defaultPressed?: boolean;
    /** Called when pressed state changes */
    onPressedChange?: (pressed: boolean) => void;
    /** Whether the toggle is disabled */
    isDisabled?: boolean;
}

/**
 * Return value of the useToggle hook.
 */
export interface UseToggleReturn {
    /** Props to spread onto the toggle button element */
    toggleProps: React.ButtonHTMLAttributes<HTMLButtonElement> & Record<string, unknown>;
    /** Whether the toggle is currently pressed */
    isPressed: boolean;
}

/**
 * Props for the Toggle primitive component.
 */
export interface ToggleProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'defaultValue'>,
    UseToggleProps {
    /** Content to display inside the toggle */
    children: React.ReactNode;
}

/**
 * Props for the styled Toggle component.
 */
export interface StyledToggleProps extends ToggleProps {
    /** Visual variant */
    variant?: 'default' | 'outline';
    /** Size */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}
