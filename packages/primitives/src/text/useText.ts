import type { UseTextProps, UseTextReturn } from './Text.types';

/**
 * Hook that encapsulates Text behavior.
 * Resolves the element tag from the `as` prop.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the element and the resolved element tag
 *
 * @example
 * ```tsx
 * const { textProps, Element } = useText({ as: 'p' });
 * return <Element {...textProps}>Body text</Element>;
 * ```
 */
export function useText(props: UseTextProps = {}): UseTextReturn {
    const { as: Element = 'p' } = props;

    return {
        textProps: {},
        Element,
    };
}
