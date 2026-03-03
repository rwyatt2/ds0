import { createContext, useContext } from 'react';
import type { SelectContextValue } from './Select.types';

const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext(): SelectContextValue {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error('DS0: Select sub-components must be used within a <Select> parent.');
    }
    return context;
}

export { SelectContext };
