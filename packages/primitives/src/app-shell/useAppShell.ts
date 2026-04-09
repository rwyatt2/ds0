import type { UseAppShellProps, UseAppShellReturn } from './AppShell.types';

/**
 * Hook that encapsulates AppShell behavior.
 *
 * @example
 * ```tsx
 * const { shellProps } = useAppShell({ hasSidebar: true });
 * ```
 */
export function useAppShell(props: UseAppShellProps = {}): UseAppShellReturn {
  const { hasSidebar = false } = props;

  return {
    shellProps: {
      'data-has-sidebar': hasSidebar || undefined,
    } as React.HTMLAttributes<HTMLDivElement>,
  };
}
