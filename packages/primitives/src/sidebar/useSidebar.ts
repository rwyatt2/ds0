import { useCallback, useState } from 'react';

import type { UseSidebarProps, UseSidebarReturn } from './Sidebar.types';

/**
 * Hook that encapsulates Sidebar behavior.
 * Manages collapsed state and provides ARIA attributes.
 *
 * @param props - Configuration options
 * @returns Props for the sidebar and toggle, plus state
 *
 * @example
 * ```tsx
 * const { sidebarProps, toggleProps, isCollapsed } = useSidebar();
 * ```
 */
export function useSidebar(props: UseSidebarProps = {}): UseSidebarReturn {
  const {
    isCollapsed: controlledCollapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    collapsible = true,
  } = props;

  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = controlledCollapsed ?? internalCollapsed;

  const toggle = useCallback(() => {
    if (!collapsible) return;
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }, [collapsible, isCollapsed, onCollapsedChange]);

  return {
    sidebarProps: {
      role: 'navigation',
      'aria-label': 'Sidebar',
      'data-collapsed': isCollapsed || undefined,
    } as React.HTMLAttributes<HTMLElement>,
    toggleProps: {
      type: 'button' as const,
      'aria-label': isCollapsed ? 'Expand sidebar' : 'Collapse sidebar',
      'aria-expanded': !isCollapsed,
      onClick: toggle,
      ...(collapsible ? {} : { disabled: true }),
    },
    isCollapsed,
    toggle,
  };
}
