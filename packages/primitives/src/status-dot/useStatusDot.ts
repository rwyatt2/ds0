import type { UseStatusDotProps, UseStatusDotReturn } from './StatusDot.types';

/**
 * Hook that encapsulates StatusDot behavior.
 * Manages ARIA attributes for status indication.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the root element
 *
 * @example
 * ```tsx
 * const { statusDotProps } = useStatusDot({ variant: 'online', label: 'Online' });
 * return <span {...statusDotProps} />;
 * ```
 */
export function useStatusDot(props: UseStatusDotProps = {}): UseStatusDotReturn {
    const {
        variant = 'neutral',
        label,
    } = props;

    const computedLabel = label ?? variant;

    return {
        statusDotProps: {
            role: 'status',
            'aria-label': computedLabel,
        },
    };
}
