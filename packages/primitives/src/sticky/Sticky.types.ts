import type { ElementType } from 'react';

/**
 * Props for the useSticky hook.
 */
export interface UseStickyProps {
  /** Which edge to stick to */
  variant?: 'top' | 'bottom';
  /** Offset from the edge in pixels */
  offset?: number;
  /** Controlled stuck state */
  isStuck?: boolean;
  /** Callback when stuck state changes */
  onStuckChange?: (stuck: boolean) => void;
}

/**
 * Return value of the useSticky hook.
 */
export interface UseStickyReturn {
  /** Props to spread onto the root element */
  stickyProps: React.HTMLAttributes<HTMLElement> & { style: React.CSSProperties };
  /** Ref to attach to the sentinel element */
  sentinelRef: React.RefCallback<HTMLElement>;
  /** Whether the element is currently stuck */
  isStuck: boolean;
}

/**
 * Props for the Sticky primitive component.
 */
export interface StickyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'style'>,
    UseStickyProps {
  /** HTML element to render as */
  as?: ElementType;
  /** Content to make sticky */
  children: React.ReactNode;
}

/**
 * Props for the styled Sticky component.
 */
export interface StyledStickyProps extends StickyProps {
  /** Show shadow when stuck */
  shadow?: boolean;
  /** Additional CSS classes */
  className?: string;
}
