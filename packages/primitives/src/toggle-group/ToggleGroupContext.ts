import { createContext, useContext } from 'react';

import type { ToggleGroupContextValue } from './ToggleGroup.types';

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

/**
 * Hook to access ToggleGroup context from sub-components.
 * Throws if used outside a ToggleGroup provider.
 */
export function useToggleGroupContext(): ToggleGroupContextValue {
    const context = useContext(ToggleGroupContext);
    if (!context) {
        throw new Error(
            'DS0: ToggleGroup.Item must be used within a <ToggleGroup> parent. ' +
            'See https://ds0.systems/docs/components/toggle-group',
        );
    }
    return context;
}

export { ToggleGroupContext };
