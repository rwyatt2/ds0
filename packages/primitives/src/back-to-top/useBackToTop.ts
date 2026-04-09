import { useCallback, useEffect, useState } from 'react';

import type { UseBackToTopProps, UseBackToTopReturn } from './BackToTop.types';

/**
 * Hook that encapsulates BackToTop behavior.
 * Manages scroll position tracking, visibility, and scroll-to-top action.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the button and visibility state
 *
 * @example
 * ```tsx
 * const { backToTopProps, isVisible } = useBackToTop({ threshold: 300 });
 * return isVisible ? <button {...backToTopProps}>↑</button> : null;
 * ```
 */
export function useBackToTop(props: UseBackToTopProps = {}): UseBackToTopReturn {
  const {
    threshold = 300,
    smooth = true,
    isDisabled = false,
    isVisible: controlledVisible,
  } = props;

  const [internalVisible, setInternalVisible] = useState(false);
  const isVisible = controlledVisible ?? internalVisible;

  useEffect(() => {
    if (controlledVisible !== undefined) return;

    const handleScroll = (): void => {
      setInternalVisible(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, controlledVisible]);

  const scrollToTop = useCallback(() => {
    if (isDisabled) return;
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'instant',
    });
  }, [isDisabled, smooth]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      event.preventDefault();
      scrollToTop();
    },
    [isDisabled, scrollToTop],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        scrollToTop();
      }
    },
    [isDisabled, scrollToTop],
  );

  return {
    backToTopProps: {
      type: 'button',
      'aria-label': 'Back to top',
      'aria-hidden': !isVisible || undefined,
      tabIndex: isVisible && !isDisabled ? 0 : -1,
      'aria-disabled': isDisabled || undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    isVisible,
    scrollToTop,
  };
}
