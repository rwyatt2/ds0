import { createContext, useContext } from 'react';

import type { TabsContextValue } from './Tabs.types';

const TabsContext = createContext<TabsContextValue | null>(null);

/**
 * Hook to access Tabs context from sub-components.
 * Throws if used outside a Tabs provider.
 */
export function useTabsContext(): TabsContextValue {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error(
            'DS0: Tabs sub-components must be used within a <Tabs> parent. ' +
            'See https://ds0.systems/docs/components/tabs',
        );
    }
    return context;
}

export { TabsContext };
