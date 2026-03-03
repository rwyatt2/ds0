import type React from 'react';

// ─── Hook Props ──────────────────────────────────────────────

export interface UseDrawerProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface UseDrawerReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    ids: { content: string; title: string; description: string };
}

// ─── Context ─────────────────────────────────────────────────

export interface DrawerContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    side: 'left' | 'right' | 'top' | 'bottom';
    ids: { content: string; title: string; description: string };
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
}

// ─── Component Props ─────────────────────────────────────────

export interface DrawerProps extends UseDrawerProps {
    side?: 'left' | 'right' | 'top' | 'bottom';
    children: React.ReactNode;
}

export interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export interface DrawerPortalProps {
    children: React.ReactNode;
    container?: HTMLElement;
}

export interface DrawerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
}

export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    className?: string;
}

export interface DrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    className?: string;
}

export interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}
