import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useVirtualizedList } from '@ds0/primitives';
import type { StyledVirtualizedListProps } from '@ds0/primitives';

function VirtualizedListInner<T>(
  { items, itemHeight, overscan, height, renderItem, width = '100%', className, ...rest }: StyledVirtualizedListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { containerProps, innerProps, visibleItems } = useVirtualizedList({ items, itemHeight, overscan, height });
  const getH = (i: number) => typeof itemHeight === 'function' ? itemHeight(i) : itemHeight;
  return (
    <div ref={ref} className={cn('rounded-md border border-border', className)} {...rest} {...containerProps} style={{ ...containerProps.style, width }}>
      <div {...innerProps}>
        {visibleItems.map(({ index, offsetTop }) => (
          <div key={index} role="listitem" aria-setsize={items.length} aria-posinset={index + 1} style={{ position: 'absolute', top: offsetTop, left: 0, right: 0, height: getH(index) }}>
            {renderItem(items[index]!, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

const VirtualizedList = forwardRef(VirtualizedListInner) as <T>(props: StyledVirtualizedListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }) => React.ReactElement | null;
export { VirtualizedList };
