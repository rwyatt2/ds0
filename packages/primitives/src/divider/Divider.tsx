import { forwardRef } from 'react';
import type { DividerPrimitiveProps } from './Divider.types';
import { useDivider } from './useDivider';

const DividerPrimitive = forwardRef<HTMLElement, DividerPrimitiveProps>(
    ({ orientation, decorative, ...rest }, ref) => {
        const { dividerProps } = useDivider({ orientation, decorative });
        return <div ref={ref as React.Ref<HTMLDivElement>} {...rest} {...dividerProps} />;
    },
);
DividerPrimitive.displayName = 'DividerPrimitive';
export { DividerPrimitive };
