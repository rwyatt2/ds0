import { useCallback, useId, useState } from 'react';

import type { UseSwitchProps, UseSwitchReturn } from './Switch.types';

/**
 * Hook that encapsulates Switch behavior.
 * Uses `role="switch"` on a `<button>` element — NOT a checkbox.
 * Toggles on click, Space, and Enter.
 */
export function useSwitch(props: UseSwitchProps = {}): UseSwitchReturn {
    const { checked: controlledChecked, defaultChecked = false, onCheckedChange, isDisabled = false, id } = props;

    const generatedId = useId();
    const fieldId = id ?? generatedId;

    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = isControlled ? controlledChecked : internalChecked;
    const state: UseSwitchReturn['state'] = isChecked ? 'checked' : 'unchecked';

    const toggle = useCallback(() => {
        if (isDisabled) return;
        const newChecked = !isChecked;
        if (!isControlled) setInternalChecked(newChecked);
        onCheckedChange?.(newChecked);
    }, [isDisabled, isChecked, isControlled, onCheckedChange]);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggle();
    }, [toggle]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            toggle();
        }
    }, [toggle]);

    return {
        switchProps: {
            id: fieldId,
            type: 'button',
            role: 'switch',
            'aria-checked': isChecked,
            'aria-disabled': isDisabled || undefined,
            tabIndex: isDisabled ? -1 : 0,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
        },
        thumbProps: {
            'data-state': state,
        },
        isChecked,
        state,
        fieldId,
    };
}
