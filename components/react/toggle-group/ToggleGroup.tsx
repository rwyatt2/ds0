import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { ToggleGroupContext, useToggleGroupContext } from '@ds0/primitives';
import type { ToggleGroupProps, ToggleGroupItemProps } from '@ds0/primitives';

// ─── Variants ────────────────────────────────────────────────

const toggleGroupVariants = cva(
    'inline-flex items-center rounded-md',
    {
        variants: {
            orientation: {
                horizontal: 'flex-row',
                vertical: 'flex-col',
            },
        },
        defaultVariants: {
            orientation: 'horizontal',
        },
    },
);

const toggleGroupItemVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:font-semibold data-[state=on]:shadow-sm data-[state=on]:border data-[state=on]:border-ring/30',
    {
        variants: {
            variant: {
                default: 'bg-transparent hover:bg-muted hover:text-muted-foreground',
                outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
            },
            size: {
                sm: 'h-8 px-2.5',
                md: 'h-10 px-3',
                lg: 'h-11 px-5',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    },
);

// ─── Root ─────────────────────────────────────────────────────

/**
 * Styled ToggleGroup component.
 * A set of two-state buttons where one or more can be toggled on.
 *
 * @example
 * ```tsx
 * <ToggleGroup type="single" defaultValue="center">
 *   <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
 *   <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
 *   <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
 * </ToggleGroup>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/toggle-group | Documentation}
 */
function ToggleGroup({
    type = 'single',
    value,
    defaultValue,
    onValueChange,
    variant = 'default',
    size = 'md',
    orientation = 'horizontal',
    isDisabled = false,
    children,
    className,
    ...props
}: ToggleGroupProps): React.JSX.Element {
    const normalizeValue = (v: string | string[] | undefined): string[] => {
        if (v === undefined) return [];
        return Array.isArray(v) ? v : [v];
    };

    const isControlled = value !== undefined;
    const [internalValues, setInternalValues] = useState<string[]>(normalizeValue(defaultValue));
    const selectedValues = isControlled ? normalizeValue(value) : internalValues;

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
            if (!isControlled) setInternalValues(nextValues);
            if (onValueChange) onValueChange(type === 'single' ? (nextValues[0] ?? '') : nextValues);
        },
        [type, selectedValues, isControlled, onValueChange],
    );

    const itemMapRef = useRef<Map<string, React.RefObject<HTMLButtonElement | null>>>(new Map());
    const registerItem = useCallback((v: string, ref: React.RefObject<HTMLButtonElement | null>) => {
        itemMapRef.current.set(v, ref);
    }, []);
    const unregisterItem = useCallback((v: string) => { itemMapRef.current.delete(v); }, []);
    const getItemEntries = useCallback(
        () => Array.from(itemMapRef.current.entries()).map(([v, ref]) => ({ value: v, ref })),
        [],
    );

    const contextValue = useMemo(
        () => ({
            selectedValues,
            toggleItem,
            isDisabled,
            variant,
            size,
            orientation,
            registerItem,
            unregisterItem,
            getItemEntries,
        }),
        [selectedValues, toggleItem, isDisabled, variant, size, orientation, registerItem, unregisterItem, getItemEntries],
    );

    return (
        <ToggleGroupContext.Provider value={contextValue}>
            <div
                role="group"
                data-orientation={orientation}
                className={cn(toggleGroupVariants({ orientation }), className)}
                {...props}
            >
                {children}
            </div>
        </ToggleGroupContext.Provider>
    );
}

ToggleGroup.displayName = 'ToggleGroup';

// ─── Item ─────────────────────────────────────────────────────

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
    ({ value, isDisabled: itemDisabled = false, children, className, onClick, onKeyDown, ...props }, ref) => {
        const ctx = useToggleGroupContext();
        const isSelected = ctx.selectedValues.includes(value);
        const isDisabled = ctx.isDisabled || itemDisabled;
        const refObj = useRef<HTMLButtonElement | null>(null);

        useEffect(() => {
            ctx.registerItem(value, refObj);
            return () => ctx.unregisterItem(value);
        }, [value, ctx]);

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLButtonElement>) => {
                onKeyDown?.(event);
                if (event.defaultPrevented || isDisabled) return;

                const entries = ctx.getItemEntries();
                const enabledEntries = entries.filter((e) => {
                    const el = e.ref.current;
                    return el && !el.disabled && el.getAttribute('aria-disabled') !== 'true';
                });
                const currentIndex = enabledEntries.findIndex((e) => e.value === value);
                const isHorizontal = ctx.orientation === 'horizontal';

                let nextIndex: number | undefined;

                switch (event.key) {
                    case isHorizontal ? 'ArrowRight' : 'ArrowDown':
                        event.preventDefault();
                        nextIndex = currentIndex + 1 >= enabledEntries.length ? 0 : currentIndex + 1;
                        break;
                    case isHorizontal ? 'ArrowLeft' : 'ArrowUp':
                        event.preventDefault();
                        nextIndex = currentIndex - 1 < 0 ? enabledEntries.length - 1 : currentIndex - 1;
                        break;
                    default:
                        return;
                }

                if (nextIndex !== undefined) {
                    enabledEntries[nextIndex]?.ref.current?.focus();
                }
            },
            [onKeyDown, isDisabled, ctx, value],
        );

        return (
            <button
                ref={(node) => {
                    refObj.current = node;
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-disabled={isDisabled || undefined}
                data-state={isSelected ? 'on' : 'off'}
                data-disabled={isDisabled || undefined}
                tabIndex={isSelected ? 0 : -1}
                className={cn(toggleGroupItemVariants({ variant: ctx.variant, size: ctx.size }), className)}
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented && !isDisabled) ctx.toggleItem(value);
                }}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </button>
        );
    },
);

ToggleGroupItem.displayName = 'ToggleGroupItem';

// ─── Compound Export ─────────────────────────────────────────

const ToggleGroupCompound = Object.assign(ToggleGroup, {
    Item: ToggleGroupItem,
});

export { ToggleGroupCompound as ToggleGroup, ToggleGroupItem, toggleGroupVariants, toggleGroupItemVariants };
