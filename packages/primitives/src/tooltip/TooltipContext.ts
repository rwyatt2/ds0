import { createContext, useContext } from 'react';
import type { TooltipContextValue } from './Tooltip.types';

const TooltipContext = createContext<TooltipContextValue | null>(null);

export function useTooltipContext(): TooltipContextValue {
    const context = useContext(TooltipContext);
    if (!context) throw new Error('DS0: Tooltip sub-components must be used within a <Tooltip> parent. Docs: https://ds0.dev/docs/components/tooltip');
    return context;
}

export { TooltipContext };
