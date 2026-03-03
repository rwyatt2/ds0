import { useCallback, useId } from 'react';

import { useControllable } from '../utils/useControllable';
import type { UseRadioGroupProps, UseRadioGroupReturn, RadioItemHookProps } from './RadioGroup.types';

/**
 * Hook that encapsulates RadioGroup behavior.
 * Manages selected value (controlled/uncontrolled) and provides
 * props for the group container and individual items with roving tabindex.
 *
 * @param props - Configuration options
 * @returns Props for the group element and a function to get item props
 *
 * @example
 * ```tsx
 * const { groupProps, getItemProps, selectedValue } = useRadioGroup({
 *   defaultValue: 'option-a',
 *   onValueChange: (v) => console.log(v),
 * });
 * ```
 */
export function useRadioGroup(props: UseRadioGroupProps = {}): UseRadioGroupReturn {
    const {
        value: controlledValue,
        defaultValue,
        onValueChange,
        orientation = 'vertical',
        isDisabled = false,
        isRequired = false,
    } = props;

    const groupId = useId();

    const { value: selectedValue, setValue: setSelectedValue } = useControllable<string | undefined>({
        value: controlledValue,
        defaultValue: defaultValue,
        onChange: onValueChange as ((value: string | undefined) => void) | undefined,
    });

    const getItemProps = useCallback(
        (itemProps: RadioItemHookProps): React.ButtonHTMLAttributes<HTMLButtonElement> => {
            const isItemDisabled = isDisabled || itemProps.isDisabled;
            const isSelected = selectedValue === itemProps.value;

            // Roving tabindex: only the selected item (or first item if none selected)
            // is in the tab order. Arrow keys handle the rest.
            const tabIndex = isItemDisabled ? -1 : isSelected ? 0 : -1;

            return {
                type: 'button',
                role: 'radio',
                'aria-checked': isSelected,
                'aria-disabled': isItemDisabled || undefined,
                tabIndex,
                onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    if (isItemDisabled) return;
                    setSelectedValue(itemProps.value);
                },
                onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
                    if (isItemDisabled) return;

                    const isHorizontal = orientation === 'horizontal';
                    const nextKeys = isHorizontal ? ['ArrowRight', 'ArrowDown'] : ['ArrowDown', 'ArrowRight'];
                    const prevKeys = isHorizontal ? ['ArrowLeft', 'ArrowUp'] : ['ArrowUp', 'ArrowLeft'];

                    if ([...nextKeys, ...prevKeys, ' '].includes(event.key)) {
                        event.preventDefault();
                    }

                    if (event.key === ' ') {
                        setSelectedValue(itemProps.value);
                        return;
                    }

                    // Arrow key navigation finds sibling radio buttons
                    const currentTarget = event.currentTarget;
                    const group = currentTarget.closest('[role="radiogroup"]');
                    if (!group) return;

                    const items = Array.from(
                        group.querySelectorAll<HTMLButtonElement>('[role="radio"]:not([aria-disabled="true"])'),
                    );
                    const currentIndex = items.indexOf(currentTarget);
                    if (currentIndex === -1) return;

                    let nextIndex = currentIndex;

                    if (nextKeys.includes(event.key)) {
                        nextIndex = (currentIndex + 1) % items.length;
                    } else if (prevKeys.includes(event.key)) {
                        nextIndex = (currentIndex - 1 + items.length) % items.length;
                    }

                    const nextItem = items[nextIndex];
                    if (nextItem) {
                        nextItem.focus();
                        const nextValue = nextItem.getAttribute('data-value');
                        if (nextValue) {
                            setSelectedValue(nextValue);
                        }
                    }
                },
            };
        },
        [isDisabled, selectedValue, orientation, setSelectedValue],
    );

    return {
        groupProps: {
            role: 'radiogroup',
            'aria-orientation': orientation,
            'aria-required': isRequired || undefined,
            'aria-disabled': isDisabled || undefined,
            id: groupId,
        },
        selectedValue,
        getItemProps,
    };
}
