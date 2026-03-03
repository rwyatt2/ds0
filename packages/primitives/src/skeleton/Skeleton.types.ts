import type React from 'react';
export interface UseSkeletonProps { variant?: 'text' | 'circular' | 'rectangular'; }
export interface UseSkeletonReturn { skeletonProps: React.HTMLAttributes<HTMLDivElement>; }
export interface SkeletonPrimitiveProps extends React.HTMLAttributes<HTMLDivElement>, UseSkeletonProps {
    width?: string; height?: string; lines?: number;
}
export interface StyledSkeletonProps extends SkeletonPrimitiveProps { className?: string; }
