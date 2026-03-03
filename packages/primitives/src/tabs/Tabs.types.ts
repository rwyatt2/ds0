import type React from 'react';

// ─── Hook Props ──────────────────────────────────────────────

export interface UseTabsProps {
    /** Controlled active tab value */
    value?: string;
    /** Default active tab (required if uncontrolled) */
    defaultValue?: string;
    /** Change handler */
    onValueChange?: (value: string) => void;
    /** Tab list direction */
    orientation?: 'horizontal' | 'vertical';
    /** Auto-activate on arrow key, or require Enter/Space */
    activationMode?: 'automatic' | 'manual';
}

export interface UseTabsReturn {
    /** Currently active tab value */
    activeValue: string;
    /** Set active tab value */
    setActiveValue: (value: string) => void;
    /** Orientation */
    orientation: 'horizontal' | 'vertical';
    /** Activation mode */
    activationMode: 'automatic' | 'manual';
}

// ─── Context ─────────────────────────────────────────────────

export interface TabsContextValue {
    /** Currently active tab value */
    activeValue: string;
    /** Change handler */
    onValueChange: (value: string) => void;
    /** Orientation */
    orientation: 'horizontal' | 'vertical';
    /** Activation mode */
    activationMode: 'automatic' | 'manual';
    /** Register a trigger ref */
    registerTrigger: (value: string, ref: React.RefObject<HTMLButtonElement | null>) => void;
    /** Unregister a trigger ref */
    unregisterTrigger: (value: string) => void;
    /** Get all trigger entries for keyboard navigation */
    getTriggerEntries: () => Array<{ value: string; ref: React.RefObject<HTMLButtonElement | null> }>;
    /** Base ID for generating ARIA IDs */
    baseId: string;
}

// ─── Component Props ─────────────────────────────────────────

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Controlled active tab */
    value?: string;
    /** Default active tab */
    defaultValue?: string;
    /** Change handler */
    onValueChange?: (value: string) => void;
    /** Tab list direction */
    orientation?: 'horizontal' | 'vertical';
    /** Auto-activate on arrow key, or require Enter/Space */
    activationMode?: 'automatic' | 'manual';
    /** Children (List + Content) */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Trigger children */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** The tab value this trigger activates */
    value: string;
    /** Disables this tab */
    isDisabled?: boolean;
    /** Tab label */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The tab value this content corresponds to */
    value: string;
    /** Keep mounted when inactive */
    forceMount?: boolean;
    /** Panel content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}
