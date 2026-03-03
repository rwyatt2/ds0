import type React from 'react';

export interface UsePopoverProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface UsePopoverReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    ids: { trigger: string; content: string };
}

export interface PopoverContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    ids: { trigger: string; content: string };
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    side: 'top' | 'right' | 'bottom' | 'left';
    align: 'start' | 'center' | 'end';
}

export interface PopoverProps extends UsePopoverProps {
    children: React.ReactNode;
}

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
}

export interface PopoverCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
