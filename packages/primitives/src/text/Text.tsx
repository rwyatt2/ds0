import { forwardRef } from 'react';

import type { TextPrimitiveProps } from './Text.types';
import { useText } from './useText';

/**
 * Headless Text primitive.
 * Renders the correct semantic text element.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <TextPrimitive as="p">
 *   Body text content
 * </TextPrimitive>
 * ```
 */
const TextPrimitive = forwardRef<HTMLElement, TextPrimitiveProps>(
    ({ children, as, ...rest }, ref) => {
        const { textProps, Element } = useText({ as });

        return (
            // Element is a dynamic tag so we cast ref to avoid strict HTMLElement subtype mismatches
            <Element ref={ref as React.Ref<never>} {...rest} {...textProps}>
                {children}
            </Element>
        );
    },
);

TextPrimitive.displayName = 'TextPrimitive';

export { TextPrimitive };
