import { useCallback, useState } from 'react';

/**
 * Props for the useControllable hook.
 */
interface UseControllableProps<T> {
    /** Controlled value */
    value?: T;
    /** Default value for uncontrolled mode */
    defaultValue: T;
    /** Change handler called in both modes */
    onChange?: (value: T) => void;
}

/**
 * Return value of the useControllable hook.
 */
interface UseControllableReturn<T> {
    /** Current value (controlled or internal) */
    value: T;
    /** Update handler — updates internal state and calls onChange */
    setValue: (value: T) => void;
    /** Whether the value is controlled externally */
    isControlled: boolean;
}

/**
 * Generic hook for controlled/uncontrolled state management.
 * Replaces inline boilerplate across components like Checkbox, Switch, Select, etc.
 *
 * @param props - Controlled value, default value, and change handler
 * @returns Current value, setter, and controlled flag
 *
 * @example
 * ```ts
 * const { value, setValue } = useControllable({
 *   value: props.value,
 *   defaultValue: '',
 *   onChange: props.onValueChange,
 * });
 * ```
 */
export function useControllable<T>(props: UseControllableProps<T>): UseControllableReturn<T> {
    const { value: controlledValue, defaultValue, onChange } = props;

    const isControlled = controlledValue !== undefined;

    const [internalValue, setInternalValue] = useState<T>(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    const setValue = useCallback(
        (nextValue: T) => {
            if (!isControlled) {
                setInternalValue(nextValue);
            }
            onChange?.(nextValue);
        },
        [isControlled, onChange],
    );

    return {
        value: currentValue,
        setValue,
        isControlled,
    };
}
