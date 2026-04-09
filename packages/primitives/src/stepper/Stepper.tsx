import React, { forwardRef } from 'react';

import { useStepper } from './useStepper';
import type { StepperProps } from './Stepper.types';

/**
 * Headless Stepper primitive.
 * Provides step navigation, keyboard interactions, and ARIA attributes.
 *
 * @example
 * ```tsx
 * <StepperPrimitive activeStep={1} onStepChange={setStep}>
 *   {steps}
 * </StepperPrimitive>
 * ```
 */
const StepperPrimitive = forwardRef<HTMLDivElement, StepperProps>(
    ({ activeStep, onStepChange, orientation = 'horizontal', isLinear = true, children, ...props }, ref) => {
        const totalSteps = React.Children.count(children);
        const { stepperProps } = useStepper({
            activeStep,
            totalSteps,
            onStepChange,
            orientation,
            isLinear,
        });

        return (
            <div ref={ref} {...stepperProps} {...props}>
                {children}
            </div>
        );
    },
);

StepperPrimitive.displayName = 'StepperPrimitive';

export { StepperPrimitive };
