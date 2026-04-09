import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn, useControllable } from '@ds0/primitives';
import {
    AccordionContext,
    AccordionItemContext,
    useAccordionContext,
    useAccordionItemContext,
} from '@ds0/primitives';
import type {
    AccordionProps,
    AccordionItemProps,
    AccordionTriggerProps,
    AccordionContentProps,
} from '@ds0/primitives';

// ─── Chevron SVG ─────────────────────────────────────────────

function ChevronDown({ className }: { className?: string }): React.JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

// ─── Variants ────────────────────────────────────────────────

const accordionTriggerVariants = cva(
    'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
);

const accordionContentVariants = cva(
    'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
);

// ─── Root ─────────────────────────────────────────────────────

/**
 * Styled Accordion component.
 * A vertically stacked set of collapsible sections.
 *
 * @example
 * ```tsx
 * <Accordion type="single" defaultValue="item-1">
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger>Section 1</Accordion.Trigger>
 *     <Accordion.Content>Content 1</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/accordion | Documentation}
 */
function Accordion({
    type = 'single',
    value,
    defaultValue,
    onValueChange,
    collapsible = true,
    isDisabled = false,
    children,
    className,
    ...props
}: AccordionProps): React.JSX.Element {
    const normalizeValue = (v: string | string[] | undefined): string[] => {
        if (v === undefined) return [];
        return Array.isArray(v) ? v : [v];
    };

    const isControlled = value !== undefined;
    const [internalValues, setInternalValues] = useState<string[]>(
        normalizeValue(defaultValue),
    );
    const expandedValues = isControlled ? normalizeValue(value) : internalValues;

    const toggleItem = useCallback(
        (itemValue: string) => {
            let nextValues: string[];
            if (type === 'single') {
                const isExpanded = expandedValues.includes(itemValue);
                if (isExpanded && collapsible) {
                    nextValues = [];
                } else if (isExpanded && !collapsible) {
                    return;
                } else {
                    nextValues = [itemValue];
                }
            } else {
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

    const contextValue = useMemo(
        () => ({ expandedValues, toggleItem, isDisabled }),
        [expandedValues, toggleItem, isDisabled],
    );

    return (
        <AccordionContext.Provider value={contextValue}>
            <div className={className} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

Accordion.displayName = 'Accordion';

// ─── Item ─────────────────────────────────────────────────────

function AccordionItem({
    value,
    isDisabled: itemDisabled = false,
    children,
    className,
    ...props
}: AccordionItemProps): React.JSX.Element {
    const ctx = useAccordionContext();
    const baseId = useId();
    const isExpanded = ctx.expandedValues.includes(value);
    const isDisabled = ctx.isDisabled || itemDisabled;

    const itemContextValue = useMemo(
        () => ({
            value,
            isExpanded,
            isDisabled,
            triggerId: `${baseId}-trigger`,
            contentId: `${baseId}-content`,
        }),
        [value, isExpanded, isDisabled, baseId],
    );

    return (
        <AccordionItemContext.Provider value={itemContextValue}>
            <div
                data-state={isExpanded ? 'open' : 'closed'}
                data-disabled={isDisabled || undefined}
                className={cn('border-b', className)}
                {...props}
            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
}

AccordionItem.displayName = 'AccordionItem';

// ─── Trigger ──────────────────────────────────────────────────

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const ctx = useAccordionContext();
        const item = useAccordionItemContext();

        return (
            <h3 className="flex">
                <button
                    ref={ref}
                    type="button"
                    id={item.triggerId}
                    aria-expanded={item.isExpanded}
                    aria-controls={item.contentId}
                    aria-disabled={item.isDisabled || undefined}
                    data-state={item.isExpanded ? 'open' : 'closed'}
                    data-disabled={item.isDisabled || undefined}
                    className={cn(accordionTriggerVariants(), className)}
                    onClick={(event) => {
                        onClick?.(event);
                        if (!event.defaultPrevented && !item.isDisabled) {
                            ctx.toggleItem(item.value);
                        }
                    }}
                    {...props}
                >
                    {children}
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </button>
            </h3>
        );
    },
);

AccordionTrigger.displayName = 'AccordionTrigger';

// ─── Content ──────────────────────────────────────────────────

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ forceMount = false, children, className, ...props }, ref) => {
        const item = useAccordionItemContext();
        const contentRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const content = contentRef.current;
            if (!content) return;
            const height = content.scrollHeight;
            content.style.setProperty('--ds0-accordion-content-height', `${height}px`);
        });

        if (!item.isExpanded && !forceMount) return null;

        return (
            <div
                ref={(node) => {
                    (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }}
                id={item.contentId}
                role="region"
                aria-labelledby={item.triggerId}
                data-state={item.isExpanded ? 'open' : 'closed'}
                hidden={!item.isExpanded}
                className={cn(accordionContentVariants(), className)}
                {...props}
            >
                <div className="pb-4 pt-0">{children}</div>
            </div>
        );
    },
);

AccordionContent.displayName = 'AccordionContent';

// ─── Compound Export ─────────────────────────────────────────

const AccordionCompound = Object.assign(Accordion, {
    Item: AccordionItem,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
});

export {
    AccordionCompound as Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    accordionTriggerVariants,
    accordionContentVariants,
};
