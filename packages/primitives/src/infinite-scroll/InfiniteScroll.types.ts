export interface UseInfiniteScrollProps { hasMore: boolean; isLoading?: boolean; onLoadMore: () => void; threshold?: number; }
export interface UseInfiniteScrollReturn { sentinelProps: React.HTMLAttributes<HTMLDivElement>; sentinelRef: React.RefCallback<HTMLElement>; containerProps: React.HTMLAttributes<HTMLDivElement>; }
export interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement>, UseInfiniteScrollProps { loader?: React.ReactNode; endMessage?: React.ReactNode; children: React.ReactNode; }
export type StyledInfiniteScrollProps = InfiniteScrollProps & { className?: string };
