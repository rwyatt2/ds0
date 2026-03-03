import type React from 'react';

// ─── Hook Props ──────────────────────────────────────────────

export interface UseAccordionProps {
    /** Single or multiple items open at once */
    type?: 'single' | 'multiple';
    /** Controlled expanded value(s) */
    value?: string | string[];
    /** Uncontrolled default */
    defaultValue?: string | string[];
    /** Change handler */
    onValueChange?: (value: string | string[]) => void;
    /** Whether all items can be closed (single mode only) */
    collapsible?: boolean;
    /** Disables all items */
    isDisabled?: boolean;
}

export interface UseAccordionReturn {
    /** Currently expanded values */
    expandedValues: string[];
    /** Toggle an item */
    toggleItem: (value: string) => void;
    /** Check if an item is expanded */
    isItemExpanded: (value: string) => boolean;
}

// ─── Context ─────────────────────────────────────────────────

export interface AccordionContextValue {
    /** Currently expanded values */
    expandedValues: string[];
    /** Toggle an item */
    toggleItem: (value: string) => void;
    /** Whether all items are disabled */
    isDisabled: boolean;
}

export interface AccordionItemContextValue {
    /** Unique identifier for this item */
    value: string;
    /** Whether this item is expanded */
    isExpanded: boolean;
    /** Whether this item is disabled */
    isDisabled: boolean;
    /** ID for ARIA linking */
    triggerId: string;
    /** ID for ARIA linking */
    contentId: string;
}

// ─── Component Props ─────────────────────────────────────────

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Single or multiple items open at once */
    type?: 'single' | 'multiple';
    /** Controlled expanded value(s) */
    value?: string | string[];
    /** Uncontrolled default */
    defaultValue?: string | string[];
    /** Change handler */
    onValueChange?: (value: string | string[]) => void;
    /** Whether all items can be closed (single mode only) */
    collapsible?: boolean;
    /** Disables all items */
    isDisabled?: boolean;
    /** Accordion.Item children */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Unique identifier for this item */
    value: string;
    /** Disables this item */
    isDisabled?: boolean;
    /** Trigger + Content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Trigger label */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Keep mounted when collapsed */
    forceMount?: boolean;
    /** Collapsible content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}
