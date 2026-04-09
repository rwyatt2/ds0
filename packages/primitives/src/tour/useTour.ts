import { useState, useCallback } from 'react';
import type { UseTourProps, UseTourReturn } from './Tour.types';
export function useTour(props: UseTourProps): UseTourReturn {
    const { steps, onComplete, onSkip: _onSkip } = props;
    const [currentStep, setCurrentStep] = useState(0);
    const isLastStep = currentStep >= steps.length - 1;
    const next = useCallback(() => { if (isLastStep) onComplete?.(); else setCurrentStep(s => s + 1); }, [isLastStep, onComplete]);
    const prev = useCallback(() => setCurrentStep(s => Math.max(0, s - 1)), []);
    return { tourProps: { role: 'dialog', 'aria-label': `Onboarding tour step ${currentStep + 1} of ${steps.length}` }, currentStep, setCurrentStep, isLastStep, next, prev };
}
