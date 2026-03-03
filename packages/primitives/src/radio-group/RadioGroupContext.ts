import { createContext, useContext } from 'react';

import type { RadioGroupContextValue } from './RadioGroup.types';

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/**
 * Hook to access RadioGroup context from sub-components.
 * Throws if used outside a RadioGroup provider.
 */
export function useRadioGroupContext(): RadioGroupContextValue {
    const context = useContext(RadioGroupContext);
    if (!context) {
        throw new Error(
            'DS0: RadioGroup sub-components must be used within a <RadioGroup> parent. ' +
            'See https://ds0.systems/docs/components/radio-group',
        );
    }
    return context;
}

export { RadioGroupContext };
