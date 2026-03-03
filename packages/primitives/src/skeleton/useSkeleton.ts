import type { UseSkeletonProps, UseSkeletonReturn } from './Skeleton.types';
export function useSkeleton(_props: UseSkeletonProps = {}): UseSkeletonReturn {
    return { skeletonProps: { 'aria-hidden': true } };
}
