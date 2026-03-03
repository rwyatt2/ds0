import { forwardRef } from 'react';
import type { BadgePrimitiveProps } from './Badge.types';
const BadgePrimitive = forwardRef<HTMLSpanElement, BadgePrimitiveProps>(({ children, ...rest }, ref) => (
    <span ref={ref} {...rest}>{children}</span>
));
BadgePrimitive.displayName = 'BadgePrimitive';
export { BadgePrimitive };
