export interface UseVirtualizedListProps<T> { items: T[]; itemHeight: number | ((index: number) => number); overscan?: number; height: number; }
export interface UseVirtualizedListReturn { containerProps: React.HTMLAttributes<HTMLDivElement> & { style: React.CSSProperties }; innerProps: { style: React.CSSProperties }; visibleItems: { index: number; offsetTop: number }[]; }
export interface VirtualizedListProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseVirtualizedListProps<T> { renderItem: (item: T, index: number) => React.ReactNode; width?: number | string; className?: string; }
export type StyledVirtualizedListProps<T> = VirtualizedListProps<T>;
