import React, { forwardRef } from 'react';

import { useToggle } from './useToggle';
import type { ToggleProps } from './Toggle.types';

/**
 * Headless Toggle primitive.
 * A two-state button that can be on or off, providing behavior, keyboard interactions, and ARIA attributes.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <TogglePrimitive onPressedChange={(pressed) => console.log(pressed)}>
 *   Bold
 * </TogglePrimitive>
 * ```
 */
const TogglePrimitive = forwardRef<HTMLButtonElement, ToggleProps>(
    ({ pressed, defaultPressed, onPressedChange, isDisabled, children, ...props }, ref) => {
        const { toggleProps, isPressed } = useToggle({
            pressed,
            defaultPressed,
            onPressedChange,
            isDisabled,
        });

        return (
            <button ref={ref} {...props} {...toggleProps} data-state={isPressed ? 'on' : 'off'}>
                {children}
            </button>
        );
    },
);

TogglePrimitive.displayName = 'TogglePrimitive';

export { TogglePrimitive };
