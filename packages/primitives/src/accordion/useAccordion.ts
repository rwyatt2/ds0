import { useCallback, useState } from 'react';

import type { UseAccordionProps, UseAccordionReturn } from './Accordion.types';

/**
 * Hook that encapsulates Accordion behavior.
 * Manages expanded state for single or multiple mode.
 *
 * @param props - Configuration options
 * @returns Expanded values, toggle function, and expansion checker
 *
 * @example
 * ```ts
 * const accordion = useAccordion({ type: 'single', defaultValue: 'item-1' });
 * ```
 */
export function useAccordion(props: UseAccordionProps): UseAccordionReturn {
    const {
        type = 'single',
        value: controlledValue,
        defaultValue,
        onValueChange,
        collapsible = true,
    } = props;

    const isControlled = controlledValue !== undefined;

    const normalizeValue = (v: string | string[] | undefined): string[] => {
        if (v === undefined) return [];
        return Array.isArray(v) ? v : [v];
    };

    const [internalValues, setInternalValues] = useState<string[]>(
        normalizeValue(defaultValue),
    );

    const expandedValues = isControlled
        ? normalizeValue(controlledValue)
        : internalValues;

    const toggleItem = useCallback(
        (itemValue: string) => {
            let nextValues: string[];

            if (type === 'single') {
                const isExpanded = expandedValues.includes(itemValue);
                if (isExpanded && collapsible) {
                    nextValues = [];
                } else if (isExpanded && !collapsible) {
                    return; // Cannot collapse
                } else {
                    nextValues = [itemValue];
                }
            } else {
                // multiple mode
                const isExpanded = expandedValues.includes(itemValue);
                nextValues = isExpanded
                    ? expandedValues.filter((v) => v !== itemValue)
                    : [...expandedValues, itemValue];
            }

            if (!isControlled) {
                setInternalValues(nextValues);
            }

            if (onValueChange) {
                onValueChange(type === 'single' ? (nextValues[0] ?? '') : nextValues);
            }
        },
        [type, expandedValues, collapsible, isControlled, onValueChange],
    );

    const isItemExpanded = useCallback(
        (itemValue: string) => expandedValues.includes(itemValue),
        [expandedValues],
    );

    return {
        expandedValues,
        toggleItem,
        isItemExpanded,
    };
}
