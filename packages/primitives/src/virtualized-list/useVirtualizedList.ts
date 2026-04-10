import { useCallback, useMemo, useState } from 'react';
import type { UseVirtualizedListProps, UseVirtualizedListReturn } from './VirtualizedList.types';

export function useVirtualizedList<T>(props: UseVirtualizedListProps<T>): UseVirtualizedListReturn {
  const { items, itemHeight, overscan = 5, height } = props;
  const [scrollTop, setScrollTop] = useState(0);

  const getItemHeight = useCallback(
    (index: number) => (typeof itemHeight === 'function' ? itemHeight(index) : itemHeight),
    [itemHeight],
  );

  const totalHeight = useMemo(() => {
    let total = 0;
    for (let i = 0; i < items.length; i++) total += getItemHeight(i);
    return total;
  }, [items.length, getItemHeight]);

  const visibleItems = useMemo(() => {
    const result: { index: number; offsetTop: number }[] = [];
    let offset = 0;
    const startBound = scrollTop;
    const endBound = scrollTop + height;

    for (let i = 0; i < items.length; i++) {
      const h = getItemHeight(i);
      if (offset + h >= startBound - overscan * (typeof itemHeight === 'number' ? itemHeight : 50) &&
          offset <= endBound + overscan * (typeof itemHeight === 'number' ? itemHeight : 50)) {
        result.push({ index: i, offsetTop: offset });
      }
      offset += h;
      if (offset > endBound + overscan * (typeof itemHeight === 'number' ? itemHeight : 50)) break;
    }
    return result;
  }, [items.length, scrollTop, height, overscan, getItemHeight, itemHeight]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    containerProps: {
      role: 'list',
      'aria-label': `List of ${items.length} items`,
      onScroll: handleScroll,
      style: { height, overflow: 'auto', position: 'relative' },
    },
    innerProps: { style: { height: totalHeight, position: 'relative' as const } },
    visibleItems,
  };
}
