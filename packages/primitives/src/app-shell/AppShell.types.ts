export interface UseAppShellProps {
  /** Whether the shell has a sidebar */
  hasSidebar?: boolean;
}

export interface UseAppShellReturn {
  shellProps: React.HTMLAttributes<HTMLDivElement>;
}

export interface AppShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    UseAppShellProps {
  /** Header slot */
  header?: React.ReactNode;
  /** Sidebar slot */
  sidebar?: React.ReactNode;
  /** Footer slot */
  footer?: React.ReactNode;
  /** Main content */
  children: React.ReactNode;
}

export interface StyledAppShellProps extends AppShellProps {
  variant?: 'default' | 'fixed-header' | 'fixed-sidebar';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}
