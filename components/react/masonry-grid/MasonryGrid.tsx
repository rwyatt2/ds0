import React, { forwardRef, Children } from 'react';
import { cn } from '@ds0/primitives';
import { useMasonryGrid } from '@ds0/primitives';
import type { StyledMasonryGridProps } from '@ds0/primitives';

const MasonryGrid = forwardRef<HTMLDivElement, StyledMasonryGridProps>(
  ({ className, columns = 3, gap = 16, children, ...props }, ref) => {
    const { gridProps, getItemProps } = useMasonryGrid({ columns, gap });
    return (
      <div ref={ref} className={cn('w-full', className)} {...props} {...gridProps}>
        {Children.map(children, (child, i) => <div {...getItemProps(i)}>{child}</div>)}
      </div>
    );
  },
);
MasonryGrid.displayName = 'MasonryGrid';
export { MasonryGrid };
