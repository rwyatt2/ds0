import { createContext, useContext } from 'react';
import type { PopoverContextValue } from './Popover.types';

const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopoverContext(): PopoverContextValue {
    const context = useContext(PopoverContext);
    if (!context) throw new Error('DS0: Popover sub-components must be used within a <Popover> parent.');
    return context;
}

export { PopoverContext };
