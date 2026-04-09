import { useCallback } from 'react';

import type { UseInputProps, UseInputReturn } from './Input.types';

/**
 * Hook that encapsulates Input behavior.
 * Manages ARIA attributes for disabled, read-only, and invalid states.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the input element
 *
 * @example
 * ```tsx
 * const { inputProps } = useInput({ isDisabled: false });
 * return <input {...inputProps} />;
 * ```
 */
export function useInput(props: UseInputProps): UseInputReturn {
    const {
        isDisabled = false,
        isReadOnly = false,
        isInvalid = false,
        type = 'text',
        onChange,
        onFocus,
        onBlur,
    } = props;

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (isDisabled || isReadOnly) return;
            onChange?.(event);
        },
        [isDisabled, isReadOnly, onChange],
    );

    const handleFocus = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            onFocus?.(event);
        },
        [onFocus],
    );

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            onBlur?.(event);
        },
        [onBlur],
    );

    return {
        inputProps: {
            type,
            tabIndex: isDisabled ? -1 : 0,
            'aria-disabled': isDisabled || undefined,
            'aria-readonly': isReadOnly || undefined,
            'aria-invalid': isInvalid || undefined,
            readOnly: isReadOnly,
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
        },
    };
}
