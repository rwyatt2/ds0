import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useStepper } from '@ds0/primitives';
import type { StyledStepperProps } from '@ds0/primitives';

const stepperVariants = cva(
    'flex gap-2',
    {
        variants: {
            variant: {
                default: '',
                dot: '',
            },
            size: {
                sm: '',
                md: '',
                lg: '',
            },
            orientation: {
                horizontal: 'flex-row items-center',
                vertical: 'flex-col',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
            orientation: 'horizontal',
        },
    },
);

const stepIndicatorSizes = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
};

/**
 * Styled Stepper component.
 * Multi-step wizard with numbered indicators and connector lines.
 *
 * @example
 * ```tsx
 * <Stepper activeStep={1} onStepChange={setStep}>
 *   <StepperItem title="Account" />
 *   <StepperItem title="Details" />
 *   <StepperItem title="Confirm" />
 * </Stepper>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/stepper | Documentation}
 */
const Stepper = forwardRef<HTMLDivElement, StyledStepperProps>(
    ({ className, variant = 'default', size = 'md', orientation = 'horizontal', activeStep, onStepChange, isLinear = true, children, ...props }, ref) => {
        const childArray = React.Children.toArray(children);
        const totalSteps = childArray.length;

        const { stepperProps, getStepProps, getStepStatus } = useStepper({
            activeStep,
            totalSteps,
            onStepChange,
            orientation,
            isLinear,
        });

        return (
            <div
                ref={ref}
                className={cn(stepperVariants({ variant, size, orientation }), className)}
                {...stepperProps}
                {...props}
            >
                {childArray.map((child, index) => {
                    const status = getStepStatus(index);
                    const stepProps = getStepProps(index);
                    const isLast = index === totalSteps - 1;

                    return (
                        <React.Fragment key={index}>
                            <div
                                className={cn(
                                    'flex items-center gap-2',
                                    orientation === 'vertical' && 'flex-col',
                                )}
                                {...stepProps}
                            >
                                <div
                                    className={cn(
                                        'flex items-center justify-center rounded-full font-medium transition-colors',
                                        stepIndicatorSizes[size],
                                        variant === 'dot' && 'h-3 w-3',
                                        status === 'completed' && 'bg-primary text-primary-foreground',
                                        status === 'active' && 'bg-primary text-primary-foreground ring-2 ring-primary/30',
                                        status === 'incomplete' && 'bg-muted text-muted-foreground',
                                    )}
                                    aria-label={`Step ${index + 1}: ${status}`}
                                >
                                    {variant !== 'dot' && (
                                        status === 'completed' ? '✓' : index + 1
                                    )}
                                </div>
                                <div className={cn(
                                    'flex flex-col',
                                    variant === 'dot' && 'sr-only',
                                )}>
                                    {child}
                                </div>
                            </div>
                            {!isLast && (
                                <div
                                    className={cn(
                                        'flex-1 transition-colors',
                                        orientation === 'horizontal' ? 'h-0.5 min-w-8' : 'w-0.5 min-h-8 ml-4',
                                        status === 'completed' ? 'bg-primary' : 'bg-border',
                                    )}
                                    aria-hidden="true"
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    },
);

Stepper.displayName = 'Stepper';

/**
 * Individual step item within a Stepper.
 */
const StepperItem = forwardRef<HTMLDivElement, { title: string; description?: string; className?: string }>(
    ({ title, description, className }, ref) => (
        <div ref={ref} className={className}>
            <span className="text-sm font-medium">{title}</span>
            {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
    ),
);

StepperItem.displayName = 'StepperItem';

export { Stepper, StepperItem, stepperVariants };
export type { StyledStepperProps as StepperProps };
