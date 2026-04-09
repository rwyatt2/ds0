import type React from 'react';

/**
 * Props for the useStepper hook.
 */
export interface UseStepperProps {
    /** Current active step (0-indexed) */
    activeStep: number;
    /** Total number of steps */
    totalSteps: number;
    /** Step change handler */
    onStepChange?: (step: number) => void;
    /** Must complete steps in order */
    isLinear?: boolean;
    /** Orientation of the stepper */
    orientation?: 'horizontal' | 'vertical';
}

/**
 * Return value of the useStepper hook.
 */
export interface UseStepperReturn {
    /** Props to spread onto the root element */
    stepperProps: React.HTMLAttributes<HTMLDivElement>;
    /** Get props for a specific step */
    getStepProps: (index: number) => {
        role: string;
        'aria-selected': boolean;
        'aria-disabled': boolean | undefined;
        'aria-current': 'step' | undefined;
        tabIndex: number;
        onClick: () => void;
        onKeyDown: (e: React.KeyboardEvent) => void;
    };
    /** Get status for a specific step */
    getStepStatus: (index: number) => 'completed' | 'active' | 'incomplete';
    /** Go to next step */
    goToNext: () => void;
    /** Go to previous step */
    goToPrevious: () => void;
}

/**
 * Props for the Stepper primitive component.
 */
export interface StepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Current active step */
    activeStep: number;
    /** Step change handler */
    onStepChange?: (step: number) => void;
    /** Orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Must complete in order */
    isLinear?: boolean;
    /** Content */
    children: React.ReactNode;
}

/**
 * Props for the styled Stepper component.
 */
export interface StyledStepperProps extends StepperProps {
    /** Visual variant */
    variant?: 'default' | 'dot';
    /** Size */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}
