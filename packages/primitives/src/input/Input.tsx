import React, { forwardRef } from 'react';

import { useInput } from './useInput';
import type { InputProps } from './Input.types';

/**
 * Headless Input primitive.
 * Provides behavior, ARIA attributes for disabled/readonly/invalid states.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <InputPrimitive placeholder="Search..." />
 * ```
 */
const InputPrimitive = forwardRef<HTMLInputElement, InputProps>(
    ({ isDisabled, isReadOnly, isInvalid, type, onChange, onFocus, onBlur, ...props }, ref) => {
        const { inputProps } = useInput({
            isDisabled,
            isReadOnly,
            isInvalid,
            type,
            onChange,
            onFocus,
            onBlur,
        });

        return (
            <input
                ref={ref}
                {...props}
                {...inputProps}
            />
        );
    },
);

InputPrimitive.displayName = 'InputPrimitive';

export { InputPrimitive };
