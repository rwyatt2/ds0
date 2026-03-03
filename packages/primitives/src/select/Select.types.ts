import type React from 'react';

// ─── Hook Props ──────────────────────────────────────────────

export interface UseSelectProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    isDisabled?: boolean;
    isRequired?: boolean;
    placeholder?: string;
}

export interface UseSelectReturn {
    isOpen: boolean;
    selectedValue: string;
    selectedLabel: string;
    open: () => void;
    close: () => void;
    toggle: () => void;
    select: (value: string, label: string) => void;
    triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    contentProps: React.HTMLAttributes<HTMLDivElement>;
    ids: { trigger: string; content: string; label: string };
    /** Register an option for typeahead and label lookup */
    registerOption: (value: string, label: string) => void;
    /** Unregister an option */
    unregisterOption: (value: string) => void;
}

// ─── Context ─────────────────────────────────────────────────

export interface SelectContextValue {
    isOpen: boolean;
    selectedValue: string;
    selectedLabel: string;
    open: () => void;
    close: () => void;
    select: (value: string, label: string) => void;
    ids: { trigger: string; content: string; label: string };
    isDisabled: boolean;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    registerOption: (value: string, label: string) => void;
    unregisterOption: (value: string) => void;
    highlightedValue: string;
    setHighlightedValue: (value: string) => void;
}

// ─── Component Props ─────────────────────────────────────────

export interface SelectProps extends UseSelectProps {
    children: React.ReactNode;
}

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    placeholder?: string;
}

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    position?: 'popper' | 'item-aligned';
}

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    label?: string;
    children: React.ReactNode;
    className?: string;
    isDisabled?: boolean;
}

export interface SelectLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    className?: string;
}

export interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    children: React.ReactNode;
    className?: string;
}
