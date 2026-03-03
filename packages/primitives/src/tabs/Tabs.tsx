import React, { useMemo, useRef, useCallback, useId } from 'react';

import { useTabs } from './useTabs';
import { TabsContext, useTabsContext } from './TabsContext';
import type {
    TabsProps,
    TabsListProps,
    TabsTriggerProps,
    TabsContentProps,
} from './Tabs.types';

// ─── Root ─────────────────────────────────────────────────────

/**
 * Headless Tabs root primitive.
 * Provides context to all Tabs sub-components.
 *
 * @example
 * ```tsx
 * <TabsPrimitive defaultValue="tab1">
 *   <TabsListPrimitive>
 *     <TabsTriggerPrimitive value="tab1">Tab 1</TabsTriggerPrimitive>
 *     <TabsTriggerPrimitive value="tab2">Tab 2</TabsTriggerPrimitive>
 *   </TabsListPrimitive>
 *   <TabsContentPrimitive value="tab1">Content 1</TabsContentPrimitive>
 *   <TabsContentPrimitive value="tab2">Content 2</TabsContentPrimitive>
 * </TabsPrimitive>
 * ```
 */
function TabsPrimitive({
    value,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    activationMode = 'automatic',
    children,
    className,
    ...props
}: TabsProps): React.JSX.Element {
    const tabs = useTabs({ value, defaultValue, onValueChange, orientation, activationMode });
    const baseId = useId();
    const triggerMapRef = useRef<Map<string, React.RefObject<HTMLButtonElement | null>>>(new Map());

    const registerTrigger = useCallback(
        (triggerValue: string, ref: React.RefObject<HTMLButtonElement | null>) => {
            triggerMapRef.current.set(triggerValue, ref);
        },
        [],
    );

    const unregisterTrigger = useCallback((triggerValue: string) => {
        triggerMapRef.current.delete(triggerValue);
    }, []);

    const getTriggerEntries = useCallback(
        () => Array.from(triggerMapRef.current.entries()).map(([v, ref]) => ({ value: v, ref })),
        [],
    );

    const contextValue = useMemo(
        () => ({
            activeValue: tabs.activeValue,
            onValueChange: tabs.setActiveValue,
            orientation: tabs.orientation,
            activationMode: tabs.activationMode,
            registerTrigger,
            unregisterTrigger,
            getTriggerEntries,
            baseId,
        }),
        [tabs.activeValue, tabs.setActiveValue, tabs.orientation, tabs.activationMode, registerTrigger, unregisterTrigger, getTriggerEntries, baseId],
    );

    return (
        <TabsContext.Provider value={contextValue}>
            <div data-orientation={orientation} className={className} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

TabsPrimitive.displayName = 'TabsPrimitive';

// ─── List ─────────────────────────────────────────────────────

const TabsListPrimitive = React.forwardRef<HTMLDivElement, TabsListProps>(
    ({ children, className, ...props }, ref) => {
        const { orientation } = useTabsContext();

        return (
            <div
                ref={ref}
                role="tablist"
                aria-orientation={orientation}
                className={className}
                {...props}
            >
                {children}
            </div>
        );
    },
);

TabsListPrimitive.displayName = 'TabsListPrimitive';

// ─── Trigger ──────────────────────────────────────────────────

const TabsTriggerPrimitive = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ value, isDisabled = false, children, className, onClick, onKeyDown, ...props }, ref) => {
        const ctx = useTabsContext();
        const isActive = ctx.activeValue === value;
        const refObj = useRef<HTMLButtonElement | null>(null);

        React.useEffect(() => {
            ctx.registerTrigger(value, refObj);
            return () => ctx.unregisterTrigger(value);
        }, [value, ctx]);

        const triggerId = `${ctx.baseId}-trigger-${value}`;
        const contentId = `${ctx.baseId}-content-${value}`;

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLButtonElement>) => {
                onKeyDown?.(event);
                if (event.defaultPrevented) return;
                if (isDisabled) return;

                const entries = ctx.getTriggerEntries();
                // Filter out disabled triggers for navigation
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
                    case 'Home': {
                        event.preventDefault();
                        nextIndex = 0;
                        break;
                    }
                    case 'End': {
                        event.preventDefault();
                        nextIndex = enabledEntries.length - 1;
                        break;
                    }
                    case 'Enter':
                    case ' ': {
                        event.preventDefault();
                        ctx.onValueChange(value);
                        return;
                    }
                    default:
                        return;
                }

                if (nextIndex !== undefined) {
                    const nextEntry = enabledEntries[nextIndex];
                    nextEntry?.ref.current?.focus();
                    if (ctx.activationMode === 'automatic' && nextEntry) {
                        ctx.onValueChange(nextEntry.value);
                    }
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
                id={triggerId}
                role="tab"
                aria-selected={isActive}
                aria-controls={contentId}
                aria-disabled={isDisabled || undefined}
                data-state={isActive ? 'active' : 'inactive'}
                data-disabled={isDisabled || undefined}
                tabIndex={isActive ? 0 : -1}
                className={className}
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented && !isDisabled) {
                        ctx.onValueChange(value);
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

TabsTriggerPrimitive.displayName = 'TabsTriggerPrimitive';

// ─── Content ──────────────────────────────────────────────────

const TabsContentPrimitive = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ value, forceMount = false, children, className, ...props }, ref) => {
        const ctx = useTabsContext();
        const isActive = ctx.activeValue === value;

        const triggerId = `${ctx.baseId}-trigger-${value}`;
        const contentId = `${ctx.baseId}-content-${value}`;

        if (!isActive && !forceMount) return null;

        return (
            <div
                ref={ref}
                id={contentId}
                role="tabpanel"
                aria-labelledby={triggerId}
                data-state={isActive ? 'active' : 'inactive'}
                tabIndex={0}
                hidden={!isActive}
                className={className}
                {...props}
            >
                {isActive && children}
            </div>
        );
    },
);

TabsContentPrimitive.displayName = 'TabsContentPrimitive';

// ─── Exports ─────────────────────────────────────────────────

export {
    TabsPrimitive,
    TabsListPrimitive,
    TabsTriggerPrimitive,
    TabsContentPrimitive,
};
