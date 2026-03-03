import { forwardRef } from 'react';

import type { HeadingPrimitiveProps } from './Heading.types';
import { useHeading } from './useHeading';

/**
 * Headless Heading primitive.
 * Renders the correct semantic heading element (h1–h6).
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <HeadingPrimitive as="h1">
 *   Page Title
 * </HeadingPrimitive>
 * ```
 */
const HeadingPrimitive = forwardRef<HTMLHeadingElement, HeadingPrimitiveProps>(
    ({ children, as, ...rest }, ref) => {
        const { headingProps, Element } = useHeading({ as });

        return (
            <Element ref={ref} {...rest} {...headingProps}>
                {children}
            </Element>
        );
    },
);

HeadingPrimitive.displayName = 'HeadingPrimitive';

export { HeadingPrimitive };
