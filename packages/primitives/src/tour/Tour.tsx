import { forwardRef } from 'react';
import type { TourProps } from './Tour.types';
import { useTour } from './useTour';
const TourPrimitive = forwardRef<HTMLDivElement, TourProps>(({ steps, active, onComplete, onSkip, ...rest }, ref) => {
    const { tourProps, currentStep, isLastStep, next, prev } = useTour({ steps, active, onComplete, onSkip });
    if (!active) return null;
    const step = steps[currentStep];
    return (<div ref={ref} {...rest} {...tourProps}><h3>{step.title}</h3><p>{step.content}</p><div><button onClick={prev} disabled={currentStep === 0}>Back</button><button onClick={next}>{isLastStep ? 'Finish' : 'Next'}</button>{onSkip && <button onClick={onSkip}>Skip</button>}</div><p>{currentStep + 1} / {steps.length}</p></div>);
});
TourPrimitive.displayName = 'TourPrimitive';
export { TourPrimitive };
