import type { UseMasonryGridProps, UseMasonryGridReturn } from './MasonryGrid.types';

export function useMasonryGrid(props: UseMasonryGridProps = {}): UseMasonryGridReturn {
  const { columns = 3, gap = 16 } = props;
  return {
    gridProps: {
      role: 'list',
      style: { columnCount: columns, columnGap: gap, width: '100%' },
    },
    getItemProps: (index: number) => ({
      role: 'listitem',
      style: { breakInside: 'avoid' as const, marginBottom: gap },
      'aria-setsize': -1,
      'aria-posinset': index + 1,
    }),
  };
}
