/**
 * Props for the useEmptyState hook.
 */
export interface UseEmptyStateProps {
  /** Whether the empty state should be announced to screen readers */
  isLive?: boolean;
}

/**
 * Return value of the useEmptyState hook.
 */
export interface UseEmptyStateReturn {
  /** Props to spread onto the root element */
  emptyStateProps: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * Props for the EmptyState primitive component.
 */
export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    UseEmptyStateProps {
  /** Icon or illustration element */
  icon?: React.ReactNode;
  /** Empty state headline */
  title: string;
  /** Explanatory text */
  description?: string;
  /** CTA button or link */
  action?: React.ReactNode;
  /** Content to display inside the component */
  children?: React.ReactNode;
}

/**
 * Props for the styled EmptyState component.
 */
export interface StyledEmptyStateProps extends EmptyStateProps {
  /** Visual layout variant */
  variant?: 'default' | 'compact' | 'card';
  /** Component size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}
