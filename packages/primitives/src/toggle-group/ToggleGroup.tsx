import React, { useMemo, useRef, useCallback } from 'react';

import { useToggleGroup } from './useToggleGroup';
import { ToggleGroupContext, useToggleGroupContext } from './ToggleGroupContext';
import type { ToggleGroupProps, ToggleGroupItemProps } from './ToggleGroup.types';

// ─── Root ─────────────────────────────────────────────────────

/**
 * Headless ToggleGroup primitive.
 * A set of two-state buttons where one or more can be toggled on.
 *
 * @example
 * ```tsx
 * <ToggleGroupPrimitive type="single" defaultValue="center">
 *   <ToggleGroupItemPrimitive value="left">Left</ToggleGroupItemPrimitive>
 *   <ToggleGroupItemPrimitive value="center">Center</ToggleGroupItemPrimitive>
 *   <ToggleGroupItemPrimitive value="right">Right</ToggleGroupItemPrimitive>
 * </ToggleGroupPrimitive>
 * ```
 */
function ToggleGroupPrimitive({
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
    const toggleGroup = useToggleGroup({ type, value, defaultValue, onValueChange, isDisabled });
    const itemMapRef = useRef<Map<string, React.RefObject<HTMLButtonElement | null>>>(new Map());

    const registerItem = useCallback(
        (itemValue: string, ref: React.RefObject<HTMLButtonElement | null>) => {
            itemMapRef.current.set(itemValue, ref);
        },
        [],
    );

    const unregisterItem = useCallback((itemValue: string) => {
        itemMapRef.current.delete(itemValue);
    }, []);

    const getItemEntries = useCallback(
        () => Array.from(itemMapRef.current.entries()).map(([v, ref]) => ({ value: v, ref })),
        [],
    );

    const contextValue = useMemo(
        () => ({
            selectedValues: toggleGroup.selectedValues,
            toggleItem: toggleGroup.toggleItem,
            isDisabled,
            variant,
            size,
            orientation,
            registerItem,
            unregisterItem,
            getItemEntries,
        }),
        [toggleGroup.selectedValues, toggleGroup.toggleItem, isDisabled, variant, size, orientation, registerItem, unregisterItem, getItemEntries],
    );

    return (
        <ToggleGroupContext.Provider value={contextValue}>
            <div
                role="group"
                data-orientation={orientation}
                className={className}
                {...props}
            >
                {children}
            </div>
        </ToggleGroupContext.Provider>
    );
}

ToggleGroupPrimitive.displayName = 'ToggleGroupPrimitive';

// ─── Item ─────────────────────────────────────────────────────

const ToggleGroupItemPrimitive = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
    ({ value, isDisabled: itemDisabled = false, children, className, onClick, onKeyDown, ...props }, ref) => {
        const ctx = useToggleGroupContext();
        const isSelected = ctx.selectedValues.includes(value);
        const isDisabled = ctx.isDisabled || itemDisabled;
        const refObj = useRef<HTMLButtonElement | null>(null);

        React.useEffect(() => {
            ctx.registerItem(value, refObj);
            return () => ctx.unregisterItem(value);
        }, [value, ctx]);

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLButtonElement>) => {
                onKeyDown?.(event);
                if (event.defaultPrevented) return;
                if (isDisabled) return;

                const entries = ctx.getItemEntries();
                const enabledEntries = entries.filter((e) => {
                    const el = e.ref.current;
                    return el && !el.disabled && el.getAttribute('aria-disabled') !== 'true';
                });
                const currentIndex = enabledEntries.findIndex((e) => e.value === value);
                const isHorizontal = ctx.orientation === 'horizontal';

                let nextIndex: number | undefined;

                switch (event.key) {
                    case isHorizontal ? 'ArrowRight' : 'ArrowDown': {
                        event.preventDefault();
                        nextIndex = currentIndex + 1 >= enabledEntries.length ? 0 : currentIndex + 1;
                        break;
                    }
                    case isHorizontal ? 'ArrowLeft' : 'ArrowUp': {
                        event.preventDefault();
                        nextIndex = currentIndex - 1 < 0 ? enabledEntries.length - 1 : currentIndex - 1;
                        break;
                    }
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
                className={className}
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented && !isDisabled) {
                        ctx.toggleItem(value);
                    }
                }}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </button>
        );
    },
);

ToggleGroupItemPrimitive.displayName = 'ToggleGroupItemPrimitive';

// ─── Exports ─────────────────────────────────────────────────

export { ToggleGroupPrimitive, ToggleGroupItemPrimitive };
