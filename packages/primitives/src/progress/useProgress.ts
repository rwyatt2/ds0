import { useMemo } from 'react';

import type { UseProgressProps, UseProgressReturn } from './Progress.types';

/**
 * Hook that encapsulates Progress bar behavior.
 * Computes percentage, clamps values, and provides ARIA attributes.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the progress element and computed percentage
 *
 * @example
 * ```tsx
 * const { progressProps, percentage } = useProgress({ value: 42, max: 100 });
 * return <div {...progressProps}><div style={{ width: `${percentage}%` }} /></div>;
 * ```
 */
export function useProgress(props: UseProgressProps = {}): UseProgressReturn {
    const {
        value = 0,
        max = 100,
        label,
        indeterminate = false,
    } = props;

    const percentage = useMemo(() => {
        if (indeterminate) return undefined;
        return Math.min(Math.max((value / max) * 100, 0), 100);
    }, [value, max, indeterminate]);

    const valueText = useMemo(() => {
        if (indeterminate) return 'Loading';
        return `${Math.round(percentage!)} percent`;
    }, [indeterminate, percentage]);

    return {
        progressProps: {
            role: 'progressbar',
            'aria-valuenow': indeterminate ? undefined : value,
            'aria-valuemin': 0,
            'aria-valuemax': max,
            'aria-valuetext': valueText,
            'aria-label': label,
        },
        percentage,
    };
}
