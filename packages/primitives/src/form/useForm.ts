import { useCallback, useId } from 'react';

import type { UseFormProps, UseFormReturn } from './Form.types';

/**
 * Hook that provides form-level utilities.
 * Generates consistent IDs for field/label/error connections.
 *
 * @param props - Configuration options
 * @returns Form props and ID generation utilities
 *
 * @example
 * ```tsx
 * const { formProps, getFieldId, getErrorId } = useForm({ onSubmit: handleSubmit });
 * ```
 */
export function useForm(props: UseFormProps = {}): UseFormReturn {
    const { onSubmit } = props;
    const baseId = useId();

    const getFieldId = useCallback(
        (name: string) => `${baseId}-field-${name}`,
        [baseId],
    );

    const getErrorId = useCallback(
        (name: string) => `${baseId}-error-${name}`,
        [baseId],
    );

    const getDescriptionId = useCallback(
        (name: string) => `${baseId}-desc-${name}`,
        [baseId],
    );

    return {
        formProps: {
            onSubmit: (event) => {
                event.preventDefault();
                onSubmit?.(event);
            },
            noValidate: true, // Use custom validation
        },
        getFieldId,
        getErrorId,
        getDescriptionId,
    };
}
