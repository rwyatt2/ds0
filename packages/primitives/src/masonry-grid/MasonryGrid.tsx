import { forwardRef, Children } from 'react';
import type { MasonryGridProps } from './MasonryGrid.types';
import { useMasonryGrid } from './useMasonryGrid';

const MasonryGridPrimitive = forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ children, columns, gap, ...rest }, ref) => {
    const { gridProps, getItemProps } = useMasonryGrid({ columns, gap });
    return (
      <div ref={ref} {...rest} {...gridProps}>
        {Children.map(children, (child, index) => (
          <div {...getItemProps(index)}>{child}</div>
        ))}
      </div>
    );
  },
);
MasonryGridPrimitive.displayName = 'MasonryGridPrimitive';
export { MasonryGridPrimitive };
