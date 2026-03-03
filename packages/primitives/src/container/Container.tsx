import { forwardRef } from 'react';
import type { ContainerPrimitiveProps } from './Container.types';
import { useContainer } from './useContainer';

const ContainerPrimitive = forwardRef<HTMLElement, ContainerPrimitiveProps>(
    ({ children, as, ...rest }, ref) => {
        const { Element } = useContainer({ as });
        return <Element ref={ref} {...rest}>{children}</Element>;
    },
);
ContainerPrimitive.displayName = 'ContainerPrimitive';
export { ContainerPrimitive };
