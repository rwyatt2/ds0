import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useTour } from '@ds0/primitives';
import type { StyledTourProps } from '@ds0/primitives';
const Tour = forwardRef<HTMLDivElement, StyledTourProps>(({ className, variant = 'default', steps, active, onComplete, onSkip, ...props }, ref) => {
    const { tourProps, currentStep, isLastStep, next, prev } = useTour({ steps, active, onComplete, onSkip });
    if (!active) return null;
    const step = steps[currentStep];
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div ref={ref} className={cn('w-full max-w-sm rounded-xl border bg-card p-6 shadow-2xl', className)} {...props} {...tourProps}>
                <div className="flex items-center justify-between mb-1"><span className="text-xs text-muted-foreground font-medium">{currentStep + 1} of {steps.length}</span>{onSkip && <button onClick={onSkip} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Skip tour</button>}</div>
                <div className="flex gap-1 mb-4">{steps.map((_, i) => <div key={i} className={cn('h-1 rounded-full flex-1 transition-colors', i <= currentStep ? 'bg-primary' : 'bg-muted')} />)}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{step.content}</p>
                <div className="flex items-center justify-between">
                    <button onClick={prev} disabled={currentStep === 0} className={cn('rounded-md border px-3 py-1.5 text-sm transition-colors', currentStep === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-accent')}>Back</button>
                    <button onClick={next} className="rounded-md bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors">{isLastStep ? 'Get Started' : 'Next'}</button>
                </div>
            </div>
        </div>
    );
});
Tour.displayName = 'Tour';
export { Tour };
export type { StyledTourProps as TourProps };
