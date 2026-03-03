import type { UseHeadingProps, UseHeadingReturn } from './Heading.types';

/**
 * Hook that encapsulates Heading behavior.
 * Resolves the heading element tag from the `as` prop.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the element and the resolved element tag
 *
 * @example
 * ```tsx
 * const { headingProps, Element } = useHeading({ as: 'h1' });
 * return <Element {...headingProps}>Page Title</Element>;
 * ```
 */
export function useHeading(props: UseHeadingProps = {}): UseHeadingReturn {
    const { as: Element = 'h2' } = props;

    return {
        headingProps: {},
        Element,
    };
}
