import { useCallback } from 'react';

import { useControllable } from '../utils/useControllable';
import type { UseToggleProps, UseToggleReturn } from './Toggle.types';

/**
 * Hook that encapsulates Toggle button behavior.
 * Manages pressed state (controlled/uncontrolled), keyboard interactions, and ARIA attributes.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the button element and current pressed state
 *
 * @example
 * ```tsx
 * const { toggleProps, isPressed } = useToggle({ defaultPressed: false });
 * return <button {...toggleProps}>Bold</button>;
 * ```
 */
export function useToggle(props: UseToggleProps = {}): UseToggleReturn {
    const {
        pressed,
        defaultPressed = false,
        onPressedChange,
        isDisabled = false,
    } = props;

    const { value: isPressed, setValue: setPressed } = useControllable({
        value: pressed,
        defaultValue: defaultPressed,
        onChange: onPressedChange,
    });

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            if (isDisabled) {
                event.preventDefault();
                return;
            }
            setPressed(!isPressed);
        },
        [isDisabled, isPressed, setPressed],
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (isDisabled) return;

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setPressed(!isPressed);
            }
        },
        [isDisabled, isPressed, setPressed],
    );

    return {
        toggleProps: {
            type: 'button' as const,
            role: 'button',
            'aria-pressed': isPressed,
            'aria-disabled': isDisabled || undefined,
            tabIndex: isDisabled ? -1 : 0,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
        } as React.ButtonHTMLAttributes<HTMLButtonElement> & Record<string, unknown>,
        isPressed,
    };
}
