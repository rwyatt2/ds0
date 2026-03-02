import { useCallback } from 'react';

import type { UseButtonProps, UseButtonReturn } from './Button.types';

/**
 * Hook that encapsulates Button behavior.
 * Manages disabled/loading state, keyboard interactions, and ARIA attributes.
 *
 * Uses `aria-disabled` pattern instead of HTML `disabled` to keep the button
 * in the tab order for screen readers while preventing interaction.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the button element
 *
 * @example
 * ```tsx
 * const { buttonProps } = useButton({ isDisabled: false });
 * return <button {...buttonProps}>Click me</button>;
 * ```
 */
export function useButton(props: UseButtonProps = {}): UseButtonReturn {
    const {
        isDisabled = false,
        isLoading = false,
        type = 'button',
        onClick,
        onKeyDown,
        onKeyUp,
    } = props;

    const isInteractionDisabled = isDisabled || isLoading;

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            if (isInteractionDisabled) {
                event.preventDefault();
                return;
            }
            onClick?.(event);
        },
        [isInteractionDisabled, onClick],
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            onKeyDown?.(event);

            if (isInteractionDisabled) {
                if (event.key === ' ' || event.key === 'Enter') {
                    event.preventDefault();
                }
                return;
            }

            // Prevent Space from scrolling the page — activation happens on keyup
            if (event.key === ' ') {
                event.preventDefault();
            }
        },
        [isInteractionDisabled, onKeyDown],
    );

    const handleKeyUp = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            onKeyUp?.(event);

            if (isInteractionDisabled) {
                return;
            }

            // Space activates on keyup (matching native <button> behavior)
            if (event.key === ' ') {
                event.currentTarget.click();
            }
        },
        [isInteractionDisabled, onKeyUp],
    );

    return {
        buttonProps: {
            type,
            tabIndex: isDisabled ? -1 : 0,
            'aria-disabled': isInteractionDisabled || undefined,
            'aria-busy': isLoading || undefined,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            onKeyUp: handleKeyUp,
        },
    };
}
