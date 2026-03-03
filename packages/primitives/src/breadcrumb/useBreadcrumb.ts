import type { UseBreadcrumbProps, UseBreadcrumbReturn } from './Breadcrumb.types';

/**
 * Hook that provides breadcrumb navigation landmark ARIA attributes.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the nav element
 *
 * @example
 * ```tsx
 * const { navProps } = useBreadcrumb({ 'aria-label': 'Breadcrumb' });
 * return <nav {...navProps}>...</nav>;
 * ```
 */
export function useBreadcrumb(props: UseBreadcrumbProps = {}): UseBreadcrumbReturn {
    const ariaLabel = props['aria-label'] || 'Breadcrumb';

    return {
        navProps: {
            'aria-label': ariaLabel,
        },
    };
}
