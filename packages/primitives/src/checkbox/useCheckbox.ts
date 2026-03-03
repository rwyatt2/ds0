import { useCallback, useId, useRef, useState, useEffect } from 'react';

import type { UseCheckboxProps, UseCheckboxReturn } from './Checkbox.types';

/**
 * Hook that encapsulates Checkbox behavior.
 * Manages controlled/uncontrolled checked state, indeterminate,
 * keyboard interactions, and ARIA attributes.
 *
 * @param props - Configuration options
 * @returns Props to spread onto elements and state values
 *
 * @example
 * ```tsx
 * const { checkboxProps, isChecked, state } = useCheckbox({
 *   onCheckedChange: (checked) => console.log(checked),
 * });
 * return <input type="checkbox" {...checkboxProps} />;
 * ```
 */
export function useCheckbox(props: UseCheckboxProps = {}): UseCheckboxReturn {
    const {
        checked: controlledChecked,
        defaultChecked = false,
        onCheckedChange,
        indeterminate = false,
        isDisabled = false,
        isRequired = false,
        isInvalid = false,
        id,
    } = props;

    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = isControlled ? controlledChecked : internalChecked;

    // Set indeterminate on the native input element
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const state: UseCheckboxReturn['state'] = indeterminate
        ? 'indeterminate'
        : isChecked
            ? 'checked'
            : 'unchecked';

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (isDisabled) {
                event.preventDefault();
                return;
            }

            const newChecked = event.target.checked;
            if (!isControlled) {
                setInternalChecked(newChecked);
            }
            onCheckedChange?.(newChecked);
        },
        [isDisabled, isControlled, onCheckedChange],
    );

    return {
        checkboxProps: {
            type: 'checkbox',
            id: fieldId,
            checked: isChecked,
            onChange: handleChange,
            'aria-checked': indeterminate ? 'mixed' : isChecked,
            'aria-disabled': isDisabled || undefined,
            'aria-required': isRequired || undefined,
            'aria-invalid': isInvalid || undefined,
            tabIndex: isDisabled ? -1 : 0,
        },
        labelProps: {
            htmlFor: fieldId,
        },
        isChecked,
        isIndeterminate: indeterminate,
        state,
        inputRef,
        fieldId,
    };
}
