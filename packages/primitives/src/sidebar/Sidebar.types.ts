/**
 * Props for the useSidebar hook.
 */
export interface UseSidebarProps {
  /** Controlled collapsed state */
  isCollapsed?: boolean;
  /** Uncontrolled default collapsed state */
  defaultCollapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Whether collapse is enabled */
  collapsible?: boolean;
}

/**
 * Return value of the useSidebar hook.
 */
export interface UseSidebarReturn {
  /** Props to spread onto the root nav element */
  sidebarProps: React.HTMLAttributes<HTMLElement>;
  /** Props for the collapse toggle button */
  toggleProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Whether the sidebar is currently collapsed */
  isCollapsed: boolean;
  /** Toggle collapsed state */
  toggle: () => void;
}

/**
 * Props for the Sidebar primitive component.
 */
export interface SidebarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'defaultValue'>,
    UseSidebarProps {
  /** Which side the sidebar is on */
  side?: 'left' | 'right';
  /** Header slot */
  header?: React.ReactNode;
  /** Footer slot */
  footer?: React.ReactNode;
  /** Sidebar content */
  children: React.ReactNode;
}

/**
 * Props for the styled Sidebar component.
 */
export interface StyledSidebarProps extends SidebarProps {
  /** Visual variant */
  variant?: 'default' | 'compact' | 'floating';
  /** Width preset */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}
