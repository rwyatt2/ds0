import React from 'react';

/**
 * Props for the useProgress hook.
 */
export interface UseProgressProps {
    /** Current progress value (0 to max) */
    value?: number;
    /** Maximum value */
    max?: number;
    /** Accessible label */
    label?: string;
    /** Whether progress is indeterminate (unknown completion) */
    indeterminate?: boolean;
}

/**
 * Return value of the useProgress hook.
 */
export interface UseProgressReturn {
    /** Props to spread onto the progress track element */
    progressProps: React.HTMLAttributes<HTMLDivElement>;
    /** Computed percentage (0–100), undefined if indeterminate */
    percentage: number | undefined;
}

/**
 * Props for the Progress primitive component.
 */
export interface ProgressProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    UseProgressProps {
    /** Whether to display the percentage text */
    showValue?: boolean;
    /** Visual variant */
    variant?: 'default' | 'success' | 'warning' | 'destructive';
    /** Bar thickness */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for the styled Progress component.
 */
export type StyledProgressProps = ProgressProps;
