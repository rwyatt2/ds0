import { forwardRef } from 'react';

import type { ButtonPrimitiveProps } from './Button.types';
import { useButton } from './useButton';

/**
 * Headless Button primitive.
 * Provides behavior, keyboard interactions, and ARIA attributes.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <ButtonPrimitive onClick={handleClick}>
 *   Save Changes
 * </ButtonPrimitive>
 * ```
 */
const ButtonPrimitive = forwardRef<HTMLButtonElement, ButtonPrimitiveProps>(
    (
        {
            children,
            isDisabled,
            isLoading,
            type,
            onClick,
            onKeyDown,
            onKeyUp,
            ...rest
        },
        ref,
    ) => {
        const { buttonProps } = useButton({
            isDisabled,
            isLoading,
            type,
            onClick,
            onKeyDown,
            onKeyUp,
        });

        return (
            <button ref={ref} {...rest} {...buttonProps}>
                {children}
            </button>
        );
    },
);

ButtonPrimitive.displayName = 'ButtonPrimitive';

export { ButtonPrimitive };
