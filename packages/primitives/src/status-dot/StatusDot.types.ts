import type React from 'react';

/**
 * Props for the useStatusDot hook.
 */
export interface UseStatusDotProps {
    /** Status variant controlling color */
    variant?: 'online' | 'offline' | 'busy' | 'away' | 'error' | 'warning' | 'neutral';
    /** Whether to show pulse animation */
    pulse?: boolean;
    /** Accessible label for screen readers */
    label?: string;
}

/**
 * Return value of the useStatusDot hook.
 */
export interface UseStatusDotReturn {
    /** Props to spread onto the root element */
    statusDotProps: React.HTMLAttributes<HTMLSpanElement>;
}

/**
 * Props for the StatusDot primitive component.
 */
export interface StatusDotProps
    extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
    UseStatusDotProps {}

/**
 * Props for the styled StatusDot component.
 */
export interface StyledStatusDotProps extends StatusDotProps {
    /** Size of the indicator */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}
