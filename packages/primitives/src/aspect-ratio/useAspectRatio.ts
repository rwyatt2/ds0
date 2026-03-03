import { useMemo } from 'react';

/**
 * Hook that computes aspect-ratio styles.
 */
export function useAspectRatio(ratio: number = 1) {
    const style = useMemo(() => ({
        position: 'relative' as const,
        width: '100%',
        paddingBottom: `${(1 / ratio) * 100}%`,
    }), [ratio]);

    const innerStyle = useMemo(() => ({
        position: 'absolute' as const,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }), []);

    return { containerStyle: style, innerStyle };
}
