import React, { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn, useControllable } from '@ds0/primitives';
import { TabsContext, useTabsContext } from '@ds0/primitives';
import type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from '@ds0/primitives';

// ─── Variants ────────────────────────────────────────────────

const tabsListVariants = cva(
    'inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
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

const tabsTriggerVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
    {
        variants: {
            state: {
                active: '',
                inactive: '',
                disabled: 'opacity-50 cursor-not-allowed',
            },
        },
    },
);

const tabsContentVariants = cva(
    'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
);

// ─── Root ─────────────────────────────────────────────────────

/**
 * Styled Tabs component.
 * Organizes content into multiple panels, with only one panel visible at a time.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="tab1">Content 1</Tabs.Content>
 *   <Tabs.Content value="tab2">Content 2</Tabs.Content>
 * </Tabs>
 *
 * @see {@link https://ds0.systems/docs/components/tabs | Documentation}
 * ```
 */
function Tabs({
    value,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    activationMode = 'automatic',
    children,
    className,
    ...props
}: TabsProps): React.JSX.Element {
    const baseId = useId();
    const { value: activeValue, setValue: setActiveValue } = useControllable({
        value,
        defaultValue: defaultValue ?? '',
        onChange: onValueChange,
    });
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
            activeValue,
            onValueChange: setActiveValue,
            orientation,
            activationMode,
            registerTrigger,
            unregisterTrigger,
            getTriggerEntries,
            baseId,
        }),
        [activeValue, setActiveValue, orientation, activationMode, registerTrigger, unregisterTrigger, getTriggerEntries, baseId],
    );

    return (
        <TabsContext.Provider value={contextValue}>
            <div data-orientation={orientation} className={className} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

Tabs.displayName = 'Tabs';

// ─── List ─────────────────────────────────────────────────────

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
    ({ children, className, ...props }, ref) => {
        const { orientation } = useTabsContext();

        return (
            <div
                ref={ref}
                role="tablist"
                aria-orientation={orientation}
                className={cn(tabsListVariants({ orientation }), className)}
                {...props}
            >
                {children}
            </div>
        );
    },
);

TabsList.displayName = 'TabsList';

// ─── Trigger ──────────────────────────────────────────────────

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ value, isDisabled = false, children, className, onClick, onKeyDown, ...props }, ref) => {
        const ctx = useTabsContext();
        const isActive = ctx.activeValue === value;
        const refObj = useRef<HTMLButtonElement | null>(null);

        useEffect(() => {
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
                const enabledEntries = entries.filter((e) => {
                    const el = e.ref.current;
                    return el && !el.disabled && el.getAttribute('aria-disabled') !== 'true';
                });
                const currentIndex = enabledEntries.findIndex((e) => e.value === value);

                let nextIndex = -1;
                const isHorizontal = ctx.orientation === 'horizontal';

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

                if (nextIndex >= 0 && nextIndex < enabledEntries.length) {
                    const nextEntry = enabledEntries[nextIndex];
                    if (nextEntry) {
                        nextEntry.ref.current?.focus();
                        if (ctx.activationMode === 'automatic') {
                            ctx.onValueChange(nextEntry.value);
                        }
                    }
                }
            },
            [onKeyDown, isDisabled, ctx, value],
        );

        const state = isDisabled ? 'disabled' : isActive ? 'active' : 'inactive';

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
                className={cn(tabsTriggerVariants({ state }), className)}
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

TabsTrigger.displayName = 'TabsTrigger';

// ─── Content ──────────────────────────────────────────────────

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
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
                className={cn(tabsContentVariants(), className)}
                {...props}
            >
                {isActive && children}
            </div>
        );
    },
);

TabsContent.displayName = 'TabsContent';

// ─── Compound Export ─────────────────────────────────────────

const TabsCompound = Object.assign(Tabs, {
    List: TabsList,
    Trigger: TabsTrigger,
    Content: TabsContent,
});

export { TabsCompound as Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants, tabsContentVariants };
