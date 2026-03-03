import { forwardRef } from 'react';
import type { StackPrimitiveProps } from './Stack.types';
import { useStack } from './useStack';

const StackPrimitive = forwardRef<HTMLElement, StackPrimitiveProps>(
    ({ children, as, ...rest }, ref) => {
        const { Element } = useStack({ as });
        return <Element ref={ref} {...rest}>{children}</Element>;
    },
);
StackPrimitive.displayName = 'StackPrimitive';
export { StackPrimitive };
