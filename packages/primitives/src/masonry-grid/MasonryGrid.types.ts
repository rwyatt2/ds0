export interface UseMasonryGridProps { columns?: number; gap?: number; }
export interface UseMasonryGridReturn { gridProps: React.HTMLAttributes<HTMLDivElement>; getItemProps: (index: number) => React.HTMLAttributes<HTMLDivElement>; }
export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement>, UseMasonryGridProps { children: React.ReactNode; }
export interface StyledMasonryGridProps extends MasonryGridProps { className?: string; }
