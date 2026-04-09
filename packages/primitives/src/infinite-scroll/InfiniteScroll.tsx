import { forwardRef } from 'react';
import type { InfiniteScrollProps } from './InfiniteScroll.types';
import { useInfiniteScroll } from './useInfiniteScroll';

const InfiniteScrollPrimitive = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  ({ children, hasMore, isLoading, onLoadMore, threshold, loader, endMessage, ...rest }, ref) => {
    const { containerProps, sentinelRef, sentinelProps } = useInfiniteScroll({ hasMore, isLoading, onLoadMore, threshold });
    return (
      <div ref={ref} {...rest} {...containerProps}>
        {children}
        {isLoading && loader}
        {!hasMore && endMessage}
        <div ref={sentinelRef} {...sentinelProps} />
      </div>
    );
  },
);
InfiniteScrollPrimitive.displayName = 'InfiniteScrollPrimitive';
export { InfiniteScrollPrimitive };
