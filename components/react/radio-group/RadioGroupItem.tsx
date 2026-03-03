import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useRadioGroupContext } from '@ds0/primitives';
import type { StyledRadioGroupItemProps } from '@ds0/primitives';

const radioIndicatorVariants = cva(
    'aspect-square shrink-0 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    {
        variants: {
            size: {
                sm: 'h-4 w-4',
                md: 'h-5 w-5',
                lg: 'h-6 w-6',
            },
            state: {
                unchecked: 'border-input',
                checked: 'border-primary bg-primary text-primary-foreground',
                disabled: 'opacity-50 cursor-not-allowed',
            },
        },
        defaultVariants: {
            size: 'md',
            state: 'unchecked',
        },
    },
);

/**
 * Styled RadioGroup.Item component.
 * An individual radio option with indicator, label, and optional description.
 *
 * @example
 * ```tsx
 * <RadioGroup.Item value="pro" label="Pro Plan" description="$9/month" />
 * ```
 */
const RadioGroupItem = forwardRef<HTMLButtonElement, StyledRadioGroupItemProps>(
    ({ value, label, description, isDisabled = false, size = 'md', className, ...props }, ref) => {
        const context = useRadioGroupContext();
        const isSelected = context.selectedValue === value;
        const isItemDisabled = context.isDisabled || isDisabled;

        const indicatorState = isItemDisabled ? 'disabled' : isSelected ? 'checked' : 'unchecked';

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
                className={cn(
                    'flex items-center gap-3 rounded-md p-2 text-left transition-colors',
                    'hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isItemDisabled && 'opacity-50 cursor-not-allowed',
                    className,
                )}
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
                        if (nextValue) context.onSelect(nextValue);
                    }
                }}
                {...props}
            >
                <span
                    className={cn(
                        radioIndicatorVariants({ size, state: indicatorState }),
                        'flex items-center justify-center',
                    )}
                >
                    {isSelected && (
                        <span
                            className={cn(
                                'rounded-full bg-current',
                                size === 'sm' && 'h-1.5 w-1.5',
                                size === 'md' && 'h-2 w-2',
                                size === 'lg' && 'h-2.5 w-2.5',
                            )}
                        />
                    )}
                </span>
                <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium leading-none">{label}</span>
                    {description && (
                        <span className="text-xs text-muted-foreground">{description}</span>
                    )}
                </span>
            </button>
        );
    },
);

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroupItem, radioIndicatorVariants };
