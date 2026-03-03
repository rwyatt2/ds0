import React, { forwardRef } from 'react';

import { useRadioGroupContext } from './RadioGroupContext';
import type { RadioGroupItemPrimitiveProps } from './RadioGroup.types';

/**
 * Headless RadioGroup.Item primitive.
 * Renders an individual radio option that communicates with RadioGroup via context.
 *
 * @example
 * ```tsx
 * <RadioGroupItemPrimitive value="option-a" label="Option A" />
 * ```
 */
const RadioGroupItemPrimitive = forwardRef<HTMLButtonElement, RadioGroupItemPrimitiveProps>(
    ({ value, label, description, isDisabled = false, children, ...props }, ref) => {
        const context = useRadioGroupContext();
        const isSelected = context.selectedValue === value;
        const isItemDisabled = context.isDisabled || isDisabled;

        return (
            <button
                ref={ref}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-disabled={isItemDisabled || undefined}
                tabIndex={isItemDisabled ? -1 : isSelected ? 0 : -1}
                data-value={value}
                data-state={isSelected ? 'checked' : 'unchecked'}
                onClick={(event) => {
                    event.preventDefault();
                    if (isItemDisabled) return;
                    context.onSelect(value);
                }}
                onKeyDown={(event) => {
                    if (isItemDisabled) return;

                    const isHorizontal = context.orientation === 'horizontal';
                    const nextKeys = isHorizontal
                        ? ['ArrowRight', 'ArrowDown']
                        : ['ArrowDown', 'ArrowRight'];
                    const prevKeys = isHorizontal
                        ? ['ArrowLeft', 'ArrowUp']
                        : ['ArrowUp', 'ArrowLeft'];

                    if ([...nextKeys, ...prevKeys, ' '].includes(event.key)) {
                        event.preventDefault();
                    }

                    if (event.key === ' ') {
                        context.onSelect(value);
                        return;
                    }

                    const group = event.currentTarget.closest('[role="radiogroup"]');
                    if (!group) return;

                    const items = Array.from(
                        group.querySelectorAll<HTMLButtonElement>(
                            '[role="radio"]:not([aria-disabled="true"])',
                        ),
                    );
                    const currentIndex = items.indexOf(event.currentTarget);
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
                            context.onSelect(nextValue);
                        }
                    }
                }}
                {...props}
            >
                {children ?? (
                    <span>
                        <span>{label}</span>
                        {description && <span>{description}</span>}
                    </span>
                )}
            </button>
        );
    },
);

RadioGroupItemPrimitive.displayName = 'RadioGroupItemPrimitive';

export { RadioGroupItemPrimitive };
