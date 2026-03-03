import type React from 'react';

// ─── Hook Props ──────────────────────────────────────────────

export interface UseToggleGroupProps {
    /** Single or multiple selection */
    type?: 'single' | 'multiple';
    /** Controlled value(s) */
    value?: string | string[];
    /** Default value(s) */
    defaultValue?: string | string[];
    /** Change handler */
    onValueChange?: (value: string | string[]) => void;
    /** Disables all items */
    isDisabled?: boolean;
}

export interface UseToggleGroupReturn {
    /** Currently selected values */
    selectedValues: string[];
    /** Toggle an item */
    toggleItem: (value: string) => void;
    /** Check if an item is selected */
    isItemSelected: (value: string) => boolean;
}

// ─── Context ─────────────────────────────────────────────────

export interface ToggleGroupContextValue {
    /** Currently selected values */
    selectedValues: string[];
    /** Toggle an item */
    toggleItem: (value: string) => void;
    /** Whether all items are disabled */
    isDisabled: boolean;
    /** Variant passed down from root */
    variant: 'default' | 'outline';
    /** Size passed down from root */
    size: 'sm' | 'md' | 'lg';
    /** Orientation */
    orientation: 'horizontal' | 'vertical';
    /** Register an item ref for roving tabindex */
    registerItem: (value: string, ref: React.RefObject<HTMLButtonElement | null>) => void;
    /** Unregister an item ref */
    unregisterItem: (value: string) => void;
    /** Get all item entries for keyboard navigation */
    getItemEntries: () => Array<{ value: string; ref: React.RefObject<HTMLButtonElement | null> }>;
}

// ─── Component Props ─────────────────────────────────────────

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Single or multiple selection */
    type?: 'single' | 'multiple';
    /** Controlled value(s) */
    value?: string | string[];
    /** Default value(s) */
    defaultValue?: string | string[];
    /** Change handler */
    onValueChange?: (value: string | string[]) => void;
    /** Visual style */
    variant?: 'default' | 'outline';
    /** Size */
    size?: 'sm' | 'md' | 'lg';
    /** Orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Disables all items */
    isDisabled?: boolean;
    /** ToggleGroup.Item children */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** The value this toggle represents */
    value: string;
    /** Disables this item */
    isDisabled?: boolean;
    /** Item label/icon */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}
