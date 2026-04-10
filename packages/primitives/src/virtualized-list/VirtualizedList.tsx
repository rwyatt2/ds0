import { forwardRef } from 'react';
import type { VirtualizedListProps } from './VirtualizedList.types';
import { useVirtualizedList } from './useVirtualizedList';

function VirtualizedListInner<T>(
  { items, itemHeight, overscan, height, renderItem, width = '100%', className, ...rest }: VirtualizedListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { containerProps, innerProps, visibleItems } = useVirtualizedList({ items, itemHeight, overscan, height });
  const getH = (i: number) => typeof itemHeight === 'function' ? itemHeight(i) : itemHeight;
  return (
    <div ref={ref} className={className} {...rest} {...containerProps} style={{ ...containerProps.style, width }}>
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

const VirtualizedListPrimitive = forwardRef(VirtualizedListInner) as <T>(
  props: VirtualizedListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement | null;

export { VirtualizedListPrimitive };
