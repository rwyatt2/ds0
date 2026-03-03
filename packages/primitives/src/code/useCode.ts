import type { UseCodeProps, UseCodeReturn } from './Code.types';

/**
 * Hook that encapsulates Code behavior.
 * Determines whether to render inline or block code.
 */
export function useCode(props: UseCodeProps = {}): UseCodeReturn {
    const { variant = 'inline' } = props;

    return {
        codeProps: {},
        isBlock: variant === 'block',
    };
}
