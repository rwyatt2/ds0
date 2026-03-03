import type React from 'react';

export interface UseTooltipProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    delayDuration?: number;
}

export interface UseTooltipReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    ids: { trigger: string; content: string };
}

export interface TooltipContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    ids: { trigger: string; content: string };
    triggerRef: React.RefObject<HTMLElement | null>;
    delayDuration: number;
}

export interface TooltipProps extends UseTooltipProps {
    children: React.ReactNode;
}

export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    asChild?: boolean;
}

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
}
