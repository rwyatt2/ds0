import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useInfiniteScroll } from '@ds0/primitives';
import type { StyledInfiniteScrollProps } from '@ds0/primitives';

const InfiniteScroll = forwardRef<HTMLDivElement, StyledInfiniteScrollProps>(
  ({ className, children, hasMore, isLoading, onLoadMore, threshold, loader, endMessage, ...props }, ref) => {
    const { containerProps, sentinelRef, sentinelProps } = useInfiniteScroll({ hasMore, isLoading, onLoadMore, threshold });
    return (
      <div ref={ref} className={cn('w-full', className)} {...props} {...containerProps}>
        {children}
        {isLoading && (loader || <div className="flex justify-center py-4"><div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" /></div>)}
        {!hasMore && (endMessage || <p className="text-center text-sm text-muted-foreground py-4">No more items</p>)}
        <div ref={sentinelRef} {...sentinelProps} />
      </div>
    );
  },
);
InfiniteScroll.displayName = 'InfiniteScroll';
export { InfiniteScroll };
