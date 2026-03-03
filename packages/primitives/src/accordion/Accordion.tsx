import React, { useMemo, useRef, useId, useEffect } from 'react';

import { useAccordion } from './useAccordion';
import {
    AccordionContext,
    AccordionItemContext,
    useAccordionContext,
    useAccordionItemContext,
} from './AccordionContext';
import type {
    AccordionProps,
    AccordionItemProps,
    AccordionTriggerProps,
    AccordionContentProps,
} from './Accordion.types';

// ─── Root ─────────────────────────────────────────────────────

/**
 * Headless Accordion root primitive.
 * Manages expanded state and provides context to sub-components.
 *
 * @example
 * ```tsx
 * <AccordionPrimitive type="single" defaultValue="item-1">
 *   <AccordionItemPrimitive value="item-1">
 *     <AccordionTriggerPrimitive>Section 1</AccordionTriggerPrimitive>
 *     <AccordionContentPrimitive>Content 1</AccordionContentPrimitive>
 *   </AccordionItemPrimitive>
 * </AccordionPrimitive>
 * ```
 */
function AccordionPrimitive({
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
    const accordion = useAccordion({ type, value, defaultValue, onValueChange, collapsible });

    const contextValue = useMemo(
        () => ({
            expandedValues: accordion.expandedValues,
            toggleItem: accordion.toggleItem,
            isDisabled,
        }),
        [accordion.expandedValues, accordion.toggleItem, isDisabled],
    );

    return (
        <AccordionContext.Provider value={contextValue}>
            <div className={className} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

AccordionPrimitive.displayName = 'AccordionPrimitive';

// ─── Item ─────────────────────────────────────────────────────

function AccordionItemPrimitive({
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
                className={className}
                {...props}
            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
}

AccordionItemPrimitive.displayName = 'AccordionItemPrimitive';

// ─── Trigger ──────────────────────────────────────────────────

const AccordionTriggerPrimitive = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const ctx = useAccordionContext();
        const item = useAccordionItemContext();

        return (
            <button
                ref={ref}
                type="button"
                id={item.triggerId}
                aria-expanded={item.isExpanded}
                aria-controls={item.contentId}
                aria-disabled={item.isDisabled || undefined}
                data-state={item.isExpanded ? 'open' : 'closed'}
                data-disabled={item.isDisabled || undefined}
                className={className}
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented && !item.isDisabled) {
                        ctx.toggleItem(item.value);
                    }
                }}
                {...props}
            >
                {children}
            </button>
        );
    },
);

AccordionTriggerPrimitive.displayName = 'AccordionTriggerPrimitive';

// ─── Content ──────────────────────────────────────────────────

const AccordionContentPrimitive = React.forwardRef<HTMLDivElement, AccordionContentProps>(
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
                className={className}
                {...props}
            >
                {children}
            </div>
        );
    },
);

AccordionContentPrimitive.displayName = 'AccordionContentPrimitive';

// ─── Exports ─────────────────────────────────────────────────

export {
    AccordionPrimitive,
    AccordionItemPrimitive,
    AccordionTriggerPrimitive,
    AccordionContentPrimitive,
};
