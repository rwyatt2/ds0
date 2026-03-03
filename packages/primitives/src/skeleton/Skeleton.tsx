import { forwardRef } from 'react';
import type { SkeletonPrimitiveProps } from './Skeleton.types';
import { useSkeleton } from './useSkeleton';

const SkeletonPrimitive = forwardRef<HTMLDivElement, SkeletonPrimitiveProps>(
    ({ variant, width, height, lines: _lines, ...rest }, ref) => {
        const { skeletonProps } = useSkeleton({ variant });
        return <div ref={ref} style={{ width, height }} {...rest} {...skeletonProps} />;
    },
);
SkeletonPrimitive.displayName = 'SkeletonPrimitive';
export { SkeletonPrimitive };
