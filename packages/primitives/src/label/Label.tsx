import React, { forwardRef } from 'react';

import type { LabelPrimitiveProps } from './Label.types';
import { useLabel } from './useLabel';

/**
 * Headless Label primitive.
 * Renders a `<label>` element with proper form association.
 *
 * @example
 * ```tsx
 * <LabelPrimitive htmlFor="email">Email</LabelPrimitive>
 * ```
 */
const LabelPrimitive = forwardRef<HTMLLabelElement, LabelPrimitiveProps>(
    ({ children, htmlFor, required, disabled, ...rest }, ref) => {
        const { labelProps } = useLabel({ htmlFor, required, disabled });

        return (
            <label ref={ref} {...rest} {...labelProps}>
                {children}
                {required && (
                    <>
                        <span aria-hidden="true"> *</span>
                        <span className="sr-only"> required</span>
                    </>
                )}
            </label>
        );
    },
);

LabelPrimitive.displayName = 'LabelPrimitive';

export { LabelPrimitive };
