import { useCallback, useRef, useEffect } from 'react';
import type { UseInfiniteScrollProps, UseInfiniteScrollReturn } from './InfiniteScroll.types';

export function useInfiniteScroll(props: UseInfiniteScrollProps): UseInfiniteScrollReturn {
  const { hasMore, isLoading = false, onLoadMore, threshold = 0.8 } = props;
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null; }
      if (!node || !hasMore || isLoading) return;
      observerRef.current = new IntersectionObserver(
        (entries) => { const entry = entries[0]; if (entry && entry.isIntersecting) onLoadMore(); },
        { threshold },
      );
      observerRef.current.observe(node);
    },
    [hasMore, isLoading, onLoadMore, threshold],
  );

  useEffect(() => { return () => { if (observerRef.current) observerRef.current.disconnect(); }; }, []);

  return {
    sentinelProps: { 'aria-hidden': true as const, style: { height: 1, width: '100%' } },
    sentinelRef,
    containerProps: {
      role: 'feed' as const,
      'aria-busy': isLoading || undefined,
      'aria-label': 'Scrollable content',
    } as React.HTMLAttributes<HTMLDivElement>,
  };
}
