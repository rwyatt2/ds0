import { forwardRef } from 'react';
import type { GridPrimitiveProps } from './Grid.types';
import { useGrid } from './useGrid';

const GridPrimitive = forwardRef<HTMLElement, GridPrimitiveProps>(
    ({ children, as, ...rest }, ref) => {
        const { Element } = useGrid({ as });
        return <Element ref={ref} {...rest}>{children}</Element>;
    },
);
GridPrimitive.displayName = 'GridPrimitive';
export { GridPrimitive };
