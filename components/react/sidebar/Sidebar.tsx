import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useSidebar } from '@ds0/primitives';
import type { StyledSidebarProps } from '@ds0/primitives';

const sidebarVariants = cva(
  'flex flex-col border-r border-border bg-background transition-all duration-300 ease-in-out overflow-hidden',
  {
    variants: {
      variant: {
        default: '',
        compact: '',
        floating: 'absolute z-40 shadow-lg rounded-r-lg',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const widthMap = {
  sm: { expanded: 'w-[200px]', collapsed: 'w-12' },
  md: { expanded: 'w-64', collapsed: 'w-16' },
  lg: { expanded: 'w-80', collapsed: 'w-20' },
} as const;

/**
 * Chevron icon for collapse toggle.
 */
const ChevronIcon = ({ collapsed, className }: { collapsed: boolean; className?: string }) => (
  <svg
    className={cn('h-4 w-4 transition-transform duration-200', collapsed && 'rotate-180', className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

type SidebarVariants = VariantProps<typeof sidebarVariants>;

interface SidebarComponentProps
  extends Omit<StyledSidebarProps, keyof SidebarVariants>,
    SidebarVariants {}

/**
 * Styled Sidebar component.
 * Collapsible navigation panel with icon-only collapsed state.
 *
 * @example
 * ```tsx
 * <Sidebar collapsible>
 *   <a href="/dashboard">Dashboard</a>
 *   <a href="/settings">Settings</a>
 * </Sidebar>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/sidebar | Documentation}
 */
const Sidebar = forwardRef<HTMLElement, SidebarComponentProps>(
  (
    {
      className,
      variant,
      size = 'md',
      side = 'left',
      collapsible = true,
      isCollapsed: controlledCollapsed,
      defaultCollapsed,
      onCollapsedChange,
      header,
      footer,
      children,
      ...props
    },
    ref,
  ) => {
    const { sidebarProps, toggleProps, isCollapsed } = useSidebar({
      isCollapsed: controlledCollapsed,
      defaultCollapsed,
      onCollapsedChange,
      collapsible,
    });

    const resolvedSize: 'sm' | 'md' | 'lg' = size ?? 'md';
    const widths = widthMap[resolvedSize];

    return (
      <nav
        ref={ref}
        className={cn(
          sidebarVariants({ variant, size }),
          isCollapsed ? widths.collapsed : widths.expanded,
          side === 'right' && 'border-r-0 border-l',
          className,
        )}
        {...props}
        {...sidebarProps}
      >
        {header && (
          <div className="flex-shrink-0 p-4 border-b border-border">
            {header}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2">
          {children}
        </div>

        {(footer || collapsible) && (
          <div className="flex-shrink-0 p-2 border-t border-border">
            {footer}
            {collapsible && (
              <button
                className="flex items-center justify-center w-full h-8 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                {...toggleProps}
              >
                <ChevronIcon collapsed={isCollapsed} />
              </button>
            )}
          </div>
        )}
      </nav>
    );
  },
);

Sidebar.displayName = 'Sidebar';

export { Sidebar, sidebarVariants };
export type { SidebarComponentProps as SidebarProps };
