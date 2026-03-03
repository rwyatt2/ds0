import type React from 'react';

// ─── Hook Props ──────────────────────────────────────────────

export interface UseDialogProps {
    /** Controlled open state */
    open?: boolean;
    /** Default open state for uncontrolled mode */
    defaultOpen?: boolean;
    /** Called when the open state changes */
    onOpenChange?: (open: boolean) => void;
}

export interface UseDialogReturn {
    /** Whether the dialog is open */
    isOpen: boolean;
    /** Open the dialog */
    open: () => void;
    /** Close the dialog */
    close: () => void;
    /** Toggle the dialog */
    toggle: () => void;
    /** Props for the trigger element */
    triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    /** Props for the content element */
    contentProps: React.HTMLAttributes<HTMLDivElement>;
    /** Props for the title element */
    titleProps: React.HTMLAttributes<HTMLHeadingElement>;
    /** Props for the description element */
    descriptionProps: React.HTMLAttributes<HTMLParagraphElement>;
    /** Props for the overlay element */
    overlayProps: React.HTMLAttributes<HTMLDivElement>;
    /** Generated IDs for ARIA connections */
    ids: {
        content: string;
        title: string;
        description: string;
    };
}

// ─── Context ─────────────────────────────────────────────────

export interface DialogContextValue {
    /** Whether the dialog is open */
    isOpen: boolean;
    /** Open the dialog */
    open: () => void;
    /** Close the dialog */
    close: () => void;
    /** Generated IDs */
    ids: {
        content: string;
        title: string;
        description: string;
    };
    /** Ref to the trigger element for focus restoration */
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    /** Ref to the content element */
    contentRef: React.RefObject<HTMLDivElement | null>;
}

// ─── Component Props ─────────────────────────────────────────

export interface DialogProps extends UseDialogProps {
    /** Dialog content (Trigger + Portal/Content) */
    children: React.ReactNode;
}

export interface DialogTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Content of the trigger button */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface DialogPortalProps {
    /** Content to render in portal */
    children: React.ReactNode;
    /** Optional container element */
    container?: HTMLElement;
}

export interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes */
    className?: string;
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Dialog width size */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /** Escape key handler */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    /** Click outside handler */
    onInteractOutside?: (event: Event) => void;
    /** Content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    /** Title text */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    /** Description text */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Close button content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}
