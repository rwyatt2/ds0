import type { UseEmptyStateProps, UseEmptyStateReturn } from './EmptyState.types';

/**
 * Hook that encapsulates EmptyState behavior.
 * Manages ARIA attributes for the empty state container.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the root element
 *
 * @example
 * ```tsx
 * const { emptyStateProps } = useEmptyState({ isLive: true });
 * return <div {...emptyStateProps}>No items</div>;
 * ```
 */
export function useEmptyState(props: UseEmptyStateProps = {}): UseEmptyStateReturn {
  const { isLive = true } = props;

  return {
    emptyStateProps: {
      role: 'status',
      'aria-live': isLive ? 'polite' : undefined,
    },
  };
}
