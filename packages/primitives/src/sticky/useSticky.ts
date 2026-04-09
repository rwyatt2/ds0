import { useCallback, useEffect, useRef, useState } from 'react';

import type { UseStickyProps, UseStickyReturn } from './Sticky.types';

/**
 * Hook that encapsulates Sticky behavior.
 * Uses IntersectionObserver on a sentinel element to detect stuck state.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the element, sentinel ref, and stuck state
 *
 * @example
 * ```tsx
 * const { stickyProps, sentinelRef, isStuck } = useSticky({ variant: 'top' });
 * return (
 *   <>
 *     <div ref={sentinelRef} />
 *     <div {...stickyProps} data-stuck={isStuck}>Content</div>
 *   </>
 * );
 * ```
 */
export function useSticky(props: UseStickyProps = {}): UseStickyReturn {
  const {
    variant = 'top',
    offset = 0,
    isStuck: controlledStuck,
    onStuckChange,
  } = props;

  const [internalStuck, setInternalStuck] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isStuck = controlledStuck ?? internalStuck;

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (controlledStuck !== undefined) return;
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          const stuck = !entry.isIntersecting;
          setInternalStuck(stuck);
          onStuckChange?.(stuck);
        },
        {
          threshold: 0,
          rootMargin: variant === 'top' ? `-${offset + 1}px 0px 0px 0px` : `0px 0px -${offset + 1}px 0px`,
        },
      );

      observerRef.current.observe(node);
    },
    [variant, offset, controlledStuck, onStuckChange],
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const positionStyle: React.CSSProperties = {
    position: 'sticky' as const,
    ...(variant === 'top' ? { top: offset } : { bottom: offset }),
    zIndex: 40,
  };

  return {
    stickyProps: {
      ...({ 'data-stuck': isStuck || undefined } as Record<string, unknown>),
      style: positionStyle,
    } as React.HTMLAttributes<HTMLElement> & { style: React.CSSProperties },
    sentinelRef,
    isStuck,
  };
}
