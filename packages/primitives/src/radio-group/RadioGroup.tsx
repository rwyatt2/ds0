import React, { forwardRef, useMemo } from 'react';

import { useRadioGroup } from './useRadioGroup';
import { RadioGroupContext } from './RadioGroupContext';
import type { RadioGroupPrimitiveProps } from './RadioGroup.types';

/**
 * Headless RadioGroup primitive.
 * Provides a radio group container with context for RadioGroupItem children.
 * Manages selected value, keyboard navigation, and ARIA attributes.
 *
 * @example
 * ```tsx
 * <RadioGroupPrimitive label="Choose option" defaultValue="a">
 *   <RadioGroupItemPrimitive value="a" label="Option A" />
 *   <RadioGroupItemPrimitive value="b" label="Option B" />
 * </RadioGroupPrimitive>
 * ```
 */
const RadioGroupPrimitive = forwardRef<HTMLDivElement, RadioGroupPrimitiveProps>(
    (
        {
            value,
            defaultValue,
            onValueChange,
            orientation = 'vertical',
            isDisabled = false,
            isRequired = false,
            label,
            children,
            ...props
        },
        ref,
    ) => {
        const { groupProps, selectedValue } = useRadioGroup({
            value,
            defaultValue,
            onValueChange,
            orientation,
            isDisabled,
            isRequired,
        });

        const contextValue = useMemo(
            () => ({
                selectedValue,
                onSelect: (v: string) => onValueChange?.(v),
                isDisabled,
                isRequired,
                name: groupProps.id ?? '',
                orientation,
            }),
            [selectedValue, onValueChange, isDisabled, isRequired, groupProps.id, orientation],
        );

        return (
            <RadioGroupContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    {...groupProps}
                    aria-labelledby={`${groupProps.id}-label`}
                    {...props}
                >
                    <span id={`${groupProps.id}-label`}>{label}</span>
                    {children}
                </div>
            </RadioGroupContext.Provider>
        );
    },
);

RadioGroupPrimitive.displayName = 'RadioGroupPrimitive';

export { RadioGroupPrimitive };
