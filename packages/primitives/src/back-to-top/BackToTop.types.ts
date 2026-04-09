/**
 * Props for the useBackToTop hook.
 */
export interface UseBackToTopProps {
  /** Scroll distance (px) before the button becomes visible */
  threshold?: number;
  /** Whether to use smooth scrolling */
  smooth?: boolean;
  /** Whether the component is disabled */
  isDisabled?: boolean;
  /** Controlled visibility state */
  isVisible?: boolean;
}

/**
 * Return value of the useBackToTop hook.
 */
export interface UseBackToTopReturn {
  /** Props to spread onto the button element */
  backToTopProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Whether the button is currently visible */
  isVisible: boolean;
  /** Scroll to top handler */
  scrollToTop: () => void;
}

/**
 * Props for the BackToTop primitive component.
 */
export interface BackToTopProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    UseBackToTopProps {
  /** Content to display inside the button */
  children?: React.ReactNode;
}

/**
 * Props for the styled BackToTop component.
 */
export interface StyledBackToTopProps extends BackToTopProps {
  /** Visual variant */
  variant?: 'default' | 'outline' | 'ghost';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Screen position */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  /** Additional CSS classes */
  className?: string;
}
