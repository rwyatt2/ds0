import { forwardRef } from 'react';
import type { LinkPrimitiveProps } from './Link.types';
import { useLink } from './useLink';

const LinkPrimitive = forwardRef<HTMLAnchorElement, LinkPrimitiveProps>(
    ({ href, isExternal, isDisabled, children, ...rest }, ref) => {
        const { linkProps } = useLink({ isExternal, isDisabled, href });
        return (
            <a ref={ref} {...rest} {...linkProps}>
                {children}
                {isExternal && <span className="sr-only"> (opens in new tab)</span>}
            </a>
        );
    },
);

LinkPrimitive.displayName = 'LinkPrimitive';
export { LinkPrimitive };
