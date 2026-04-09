import { forwardRef } from 'react';

import type { SidebarProps } from './Sidebar.types';
import { useSidebar } from './useSidebar';

/**
 * Headless Sidebar primitive.
 * Provides navigation landmark, collapse behavior, and ARIA attributes.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <SidebarPrimitive>
 *   <a href="/dashboard">Dashboard</a>
 *   <a href="/settings">Settings</a>
 * </SidebarPrimitive>
 * ```
 */
const SidebarPrimitive = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      children,
      header,
      footer,
      isCollapsed: controlledCollapsed,
      defaultCollapsed,
      onCollapsedChange,
      collapsible,
      side: _side,
      ...rest
    },
    ref,
  ) => {
    const { sidebarProps } = useSidebar({
      isCollapsed: controlledCollapsed,
      defaultCollapsed,
      onCollapsedChange,
      collapsible,
    });

    return (
      <nav ref={ref} {...rest} {...sidebarProps}>
        {header && <div>{header}</div>}
        <div>{children}</div>
        {footer && <div>{footer}</div>}
      </nav>
    );
  },
);

SidebarPrimitive.displayName = 'SidebarPrimitive';

export { SidebarPrimitive };
