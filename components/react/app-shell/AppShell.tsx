import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useAppShell } from '@ds0/primitives';
import type { StyledAppShellProps } from '@ds0/primitives';

const appShellVariants = cva('flex flex-col min-h-screen bg-background', {
  variants: {
    variant: {
      default: '',
      'fixed-header': '[&>header]:sticky [&>header]:top-0 [&>header]:z-50',
      'fixed-sidebar': '',
    },
    padding: {
      none: '',
      sm: '[&>div>main]:p-4',
      md: '[&>div>main]:p-6',
      lg: '[&>div>main]:p-8',
    },
  },
  defaultVariants: { variant: 'default', padding: 'md' },
});

type AppShellVariants = VariantProps<typeof appShellVariants>;
interface AppShellComponentProps extends Omit<StyledAppShellProps, keyof AppShellVariants>, AppShellVariants {}

/**
 * Styled AppShell component.
 * CSS Grid-based full-page layout with header, sidebar, content, and footer slots.
 *
 * @example
 * ```tsx
 * <AppShell header={<Header />} sidebar={<Sidebar />}>
 *   <h1>Dashboard</h1>
 * </AppShell>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/app-shell | Documentation}
 */
const AppShell = forwardRef<HTMLDivElement, AppShellComponentProps>(
  ({ className, variant, padding, header, sidebar, footer, children, ...props }, ref) => {
    const { shellProps } = useAppShell({ hasSidebar: !!sidebar });
    return (
      <div ref={ref} className={cn(appShellVariants({ variant, padding }), className)} {...props} {...shellProps}>
        {header && <header className="border-b border-border bg-background">{header}</header>}
        <div className="flex flex-1 min-h-0">
          {sidebar}
          <main className="flex-1 min-w-0 overflow-auto">{children}</main>
        </div>
        {footer && <footer className="border-t border-border bg-background">{footer}</footer>}
      </div>
    );
  },
);

AppShell.displayName = 'AppShell';
export { AppShell, appShellVariants };
export type { AppShellComponentProps as AppShellProps };
