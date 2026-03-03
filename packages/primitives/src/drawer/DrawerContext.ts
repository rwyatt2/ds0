import { createContext, useContext } from 'react';
import type { DrawerContextValue } from './Drawer.types';

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawerContext(): DrawerContextValue {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('DS0: Drawer sub-components must be used within a <Drawer> parent.');
    }
    return context;
}

export { DrawerContext };
