/**
 * Props for the useDropdownMenu hook.
 */
export interface UseDropdownMenuProps {
    /** Controlled open state */
    open?: boolean;
    /** Default open state */
    defaultOpen?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
}

/**
 * Return value of the useDropdownMenu hook.
 */
export interface UseDropdownMenuReturn {
    /** Whether the menu is open */
    isOpen: boolean;
    /** Toggle the menu */
    toggle: () => void;
    /** Open the menu */
    openMenu: () => void;
    /** Close the menu */
    closeMenu: () => void;
    /** Props for the trigger element */
    triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement> & { 'aria-haspopup'?: string; 'aria-expanded'?: boolean };
    /** Props for the content element */
    contentProps: React.HTMLAttributes<HTMLDivElement> & { role?: string };
    /** Unique content ID */
    contentId: string;
}

/**
 * Props for the DropdownMenu root.
 */
export interface DropdownMenuProps extends UseDropdownMenuProps {
    /** Children (Trigger + Content) */
    children: React.ReactNode;
}

/**
 * Props for the DropdownMenu trigger.
 */
export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Slot pattern */
    asChild?: boolean;
    /** Trigger content */
    children: React.ReactNode;
}

/**
 * Props for the DropdownMenu content.
 */
export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Alignment relative to trigger */
    align?: 'start' | 'center' | 'end';
    /** Side relative to trigger */
    side?: 'top' | 'bottom' | 'left' | 'right';
    /** Offset from trigger */
    sideOffset?: number;
    /** Content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for a DropdownMenu item.
 */
export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Whether the item is disabled */
    isDisabled?: boolean;
    /** Selection handler */
    onSelect?: () => void;
    /** Item content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for a DropdownMenu separator.
 */
export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for a DropdownMenu label.
 */
export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Label text */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Styled props aliases.
 */
export type StyledDropdownMenuProps = DropdownMenuProps;
export type StyledDropdownMenuTriggerProps = DropdownMenuTriggerProps;
export type StyledDropdownMenuContentProps = DropdownMenuContentProps;
export type StyledDropdownMenuItemProps = DropdownMenuItemProps;
