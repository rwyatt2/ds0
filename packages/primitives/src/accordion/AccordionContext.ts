import { createContext, useContext } from 'react';

import type { AccordionContextValue, AccordionItemContextValue } from './Accordion.types';

// ─── Root Context ────────────────────────────────────────────

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext(): AccordionContextValue {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error(
            'DS0: Accordion sub-components must be used within an <Accordion> parent. ' +
            'See https://ds0.systems/docs/components/accordion',
        );
    }
    return context;
}

// ─── Item Context ────────────────────────────────────────────

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export function useAccordionItemContext(): AccordionItemContextValue {
    const context = useContext(AccordionItemContext);
    if (!context) {
        throw new Error(
            'DS0: Accordion.Trigger and Accordion.Content must be used within an <Accordion.Item>. ' +
            'See https://ds0.systems/docs/components/accordion',
        );
    }
    return context;
}

export { AccordionContext, AccordionItemContext };
