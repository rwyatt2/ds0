import { forwardRef } from 'react';
import type { AspectRatioPrimitiveProps } from './AspectRatio.types';
import { useAspectRatio } from './useAspectRatio';

const AspectRatioPrimitive = forwardRef<HTMLDivElement, AspectRatioPrimitiveProps>(
    ({ ratio = 1, children, style, ...rest }, ref) => {
        const { containerStyle, innerStyle } = useAspectRatio(ratio);
        return (
            <div ref={ref} style={{ ...containerStyle, ...style }} {...rest}>
                <div style={innerStyle}>{children}</div>
            </div>
        );
    },
);

AspectRatioPrimitive.displayName = 'AspectRatioPrimitive';
export { AspectRatioPrimitive };
