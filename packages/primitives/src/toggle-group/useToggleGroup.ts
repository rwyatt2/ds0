import { useCallback, useState } from 'react';

import type { UseToggleGroupProps, UseToggleGroupReturn } from './ToggleGroup.types';

/**
 * Hook that encapsulates ToggleGroup behavior.
 * Manages selection state for single or multiple mode.
 */
export function useToggleGroup(props: UseToggleGroupProps): UseToggleGroupReturn {
    const {
        type = 'single',
        value: controlledValue,
        defaultValue,
        onValueChange,
    } = props;

    const isControlled = controlledValue !== undefined;

    const normalizeValue = (v: string | string[] | undefined): string[] => {
        if (v === undefined) return [];
        return Array.isArray(v) ? v : [v];
    };

    const [internalValues, setInternalValues] = useState<string[]>(
        normalizeValue(defaultValue),
    );

    const selectedValues = isControlled
        ? normalizeValue(controlledValue)
        : internalValues;

    const toggleItem = useCallback(
        (itemValue: string) => {
            let nextValues: string[];

            if (type === 'single') {
                const isSelected = selectedValues.includes(itemValue);
                nextValues = isSelected ? [] : [itemValue];
            } else {
                const isSelected = selectedValues.includes(itemValue);
                nextValues = isSelected
                    ? selectedValues.filter((v) => v !== itemValue)
                    : [...selectedValues, itemValue];
            }

            if (!isControlled) {
                setInternalValues(nextValues);
            }

            if (onValueChange) {
                onValueChange(type === 'single' ? (nextValues[0] ?? '') : nextValues);
            }
        },
        [type, selectedValues, isControlled, onValueChange],
    );

    const isItemSelected = useCallback(
        (itemValue: string) => selectedValues.includes(itemValue),
        [selectedValues],
    );

    return {
        selectedValues,
        toggleItem,
        isItemSelected,
    };
}
