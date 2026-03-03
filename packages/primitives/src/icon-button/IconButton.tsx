import { forwardRef } from 'react';
import type { IconButtonPrimitiveProps } from './IconButton.types';
import { useIconButton } from './useIconButton';
import { invariant } from '../utils/invariant';

/**
 * Headless IconButton primitive.
 * A button that contains only an icon with a required aria-label.
 */
const IconButtonPrimitive = forwardRef<HTMLButtonElement, IconButtonPrimitiveProps>(
    ({ icon, isDisabled, isLoading, 'aria-label': ariaLabel, ...rest }, ref) => {
        invariant(ariaLabel, 'IconButton: `aria-label` is required for icon-only buttons.');

        const { buttonProps } = useIconButton({ isDisabled, isLoading, onClick: rest.onClick, onKeyDown: rest.onKeyDown, onKeyUp: rest.onKeyUp });

        return (
            <button ref={ref} aria-label={ariaLabel} {...rest} {...buttonProps}>
                {icon}
            </button>
        );
    },
);

IconButtonPrimitive.displayName = 'IconButtonPrimitive';
export { IconButtonPrimitive };
