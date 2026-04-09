import { forwardRef } from 'react';
import type { AppShellProps } from './AppShell.types';
import { useAppShell } from './useAppShell';

/**
 * Headless AppShell primitive.
 * Provides semantic structure with header, sidebar, main, and footer landmarks.
 *
 * @example
 * ```tsx
 * <AppShellPrimitive header={<Header />} sidebar={<Nav />}>
 *   <h1>Dashboard</h1>
 * </AppShellPrimitive>
 * ```
 */
const AppShellPrimitive = forwardRef<HTMLDivElement, AppShellProps>(
  ({ header, sidebar, footer, children, hasSidebar: _hasSidebar, ...rest }, ref) => {
    const { shellProps } = useAppShell({ hasSidebar: !!sidebar });

    return (
      <div ref={ref} {...rest} {...shellProps}>
        {header && <header>{header}</header>}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {sidebar}
          <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
        </div>
        {footer && <footer>{footer}</footer>}
      </div>
    );
  },
);

AppShellPrimitive.displayName = 'AppShellPrimitive';
export { AppShellPrimitive };
