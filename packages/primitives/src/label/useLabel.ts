import type { UseLabelProps, UseLabelReturn } from './Label.types';

/**
 * Hook that encapsulates Label behavior.
 * Handles htmlFor association and required/disabled states.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the label element
 */
export function useLabel(props: UseLabelProps = {}): UseLabelReturn {
    const { htmlFor, disabled = false } = props;

    return {
        labelProps: {
            htmlFor,
            'aria-disabled': disabled || undefined,
        },
    };
}
