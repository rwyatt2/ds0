import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useBackToTop } from '@ds0/primitives';
import type { StyledBackToTopProps } from '@ds0/primitives';

const backToTopVariants = cva(
  'fixed z-50 inline-flex items-center justify-center rounded-full shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:
          'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
      position: {
        'bottom-right': 'bottom-6 right-6',
        'bottom-left': 'bottom-6 left-6',
        'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      position: 'bottom-right',
    },
  },
);

/**
 * Chevron-up icon for the BackToTop button.
 */
const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-4 w-4', className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

type BackToTopVariants = VariantProps<typeof backToTopVariants>;

/**
 * Props for the styled BackToTop component.
 */
interface BackToTopComponentProps
  extends Omit<StyledBackToTopProps, keyof BackToTopVariants>,
    BackToTopVariants {}

/**
 * Styled BackToTop component.
 * A floating action button that scrolls the page to the top when clicked.
 *
 * @example
 * ```tsx
 * <BackToTop />
 * ```
 *
 * @example
 * ```tsx
 * <BackToTop variant="outline" threshold={500} position="bottom-left" />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/back-to-top | Documentation}
 */
const BackToTop = forwardRef<HTMLButtonElement, BackToTopComponentProps>(
  (
    {
      className,
      variant,
      size,
      position,
      threshold,
      smooth,
      isDisabled,
      isVisible: controlledVisible,
      children,
      ...props
    },
    ref,
  ) => {
    const { backToTopProps, isVisible } = useBackToTop({
      threshold,
      smooth,
      isDisabled,
      isVisible: controlledVisible,
    });

    if (!isVisible) return null;

    return (
      <button
        ref={ref}
        className={cn(
          backToTopVariants({ variant, size, position }),
          isDisabled && 'opacity-50 pointer-events-none',
          'animate-in fade-in zoom-in-95',
          className,
        )}
        {...props}
        {...backToTopProps}
      >
        {children || <ChevronUpIcon />}
        <span className="sr-only">Back to top</span>
      </button>
    );
  },
);

BackToTop.displayName = 'BackToTop';

export { BackToTop, backToTopVariants };
export type { BackToTopComponentProps as BackToTopProps };
