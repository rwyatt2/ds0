import { useCallback } from 'react';

import type { UseStepperProps, UseStepperReturn } from './Stepper.types';

/**
 * Hook that encapsulates Stepper behavior.
 * Manages step navigation, keyboard interactions, and ARIA attributes.
 *
 * @param props - Configuration options
 * @returns Props to spread onto elements and navigation utilities
 *
 * @example
 * ```tsx
 * const { stepperProps, getStepProps, getStepStatus } = useStepper({
 *   activeStep: 1,
 *   totalSteps: 3,
 * });
 * ```
 */
export function useStepper(props: UseStepperProps): UseStepperReturn {
    const {
        activeStep,
        totalSteps,
        onStepChange,
        isLinear = true,
        orientation = 'horizontal',
    } = props;

    const goToStep = useCallback(
        (step: number) => {
            if (step < 0 || step >= totalSteps) return;
            if (isLinear && step > activeStep + 1) return;
            onStepChange?.(step);
        },
        [totalSteps, isLinear, activeStep, onStepChange],
    );

    const goToNext = useCallback(() => {
        goToStep(activeStep + 1);
    }, [activeStep, goToStep]);

    const goToPrevious = useCallback(() => {
        goToStep(activeStep - 1);
    }, [activeStep, goToStep]);

    const getStepStatus = useCallback(
        (index: number): 'completed' | 'active' | 'incomplete' => {
            if (index < activeStep) return 'completed';
            if (index === activeStep) return 'active';
            return 'incomplete';
        },
        [activeStep],
    );

    const getStepProps = useCallback(
        (index: number) => {
            const isDisabled = isLinear && index > activeStep + 1;
            const isActive = index === activeStep;

            return {
                role: 'tab' as const,
                'aria-selected': isActive,
                'aria-disabled': isDisabled || undefined,
                'aria-current': isActive ? ('step' as const) : undefined,
                tabIndex: isActive ? 0 : -1,
                onClick: () => {
                    if (!isDisabled) goToStep(index);
                },
                onKeyDown: (e: React.KeyboardEvent) => {
                    const isHorizontal = orientation === 'horizontal';
                    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
                    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

                    if (e.key === nextKey) {
                        e.preventDefault();
                        const next = Math.min(index + 1, totalSteps - 1);
                        goToStep(next);
                    } else if (e.key === prevKey) {
                        e.preventDefault();
                        const prev = Math.max(index - 1, 0);
                        goToStep(prev);
                    } else if (e.key === 'Home') {
                        e.preventDefault();
                        goToStep(0);
                    } else if (e.key === 'End') {
                        e.preventDefault();
                        goToStep(totalSteps - 1);
                    } else if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (!isDisabled) goToStep(index);
                    }
                },
            };
        },
        [activeStep, isLinear, orientation, totalSteps, goToStep],
    );

    return {
        stepperProps: {
            role: 'tablist',
            'aria-orientation': orientation,
        },
        getStepProps,
        getStepStatus,
        goToNext,
        goToPrevious,
    };
}
