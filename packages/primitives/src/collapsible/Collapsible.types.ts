/**
 * Props for the useCollapsible hook.
 */
export interface UseCollapsibleProps {
    /** Controlled open state */
    open?: boolean;
    /** Uncontrolled default open state */
    defaultOpen?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
}

/**
 * Return value of the useCollapsible hook.
 */
export interface UseCollapsibleReturn {
    /** Whether the collapsible is currently open */
    isOpen: boolean;
    /** Toggle the open state */
    toggle: () => void;
    /** Props to spread onto the trigger element */
    triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    /** Props to spread onto the content element */
    contentProps: React.HTMLAttributes<HTMLDivElement>;
    /** Unique ID for the content element (for aria-controls) */
    contentId: string;
}

/**
 * Props for the Collapsible root component.
 */
export interface CollapsibleProps extends UseCollapsibleProps {
    /** Content (Trigger + Content sub-components) */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for the Collapsible.Trigger sub-component.
 */
export interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** When true, renders as the child element using the Slot pattern */
    asChild?: boolean;
    /** Trigger content */
    children: React.ReactNode;
}

/**
 * Props for the Collapsible.Content sub-component.
 */
export interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Keep mounted in the DOM when collapsed */
    forceMount?: boolean;
    /** Collapsible content */
    children: React.ReactNode;
}

/**
 * Props for the styled Collapsible component.
 */
export type StyledCollapsibleProps = CollapsibleProps;

/**
 * Props for the styled Collapsible.Trigger.
 */
export interface StyledCollapsibleTriggerProps extends CollapsibleTriggerProps {
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for the styled Collapsible.Content.
 */
export interface StyledCollapsibleContentProps extends CollapsibleContentProps {
    /** Additional CSS classes */
    className?: string;
}
