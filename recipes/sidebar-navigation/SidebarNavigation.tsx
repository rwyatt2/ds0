import React, { useState } from 'react';

import { cn } from '@ds0/primitives';

import { Stack } from '@ds0/components/react/stack';
import { Text } from '@ds0/components/react/text';
import { Button } from '@ds0/components/react/button';
import { Divider } from '@ds0/components/react/divider';
import { Avatar } from '@ds0/components/react/avatar';
import { Badge } from '@ds0/components/react/badge';
import { Link } from '@ds0/components/react/link';
import { Tooltip } from '@ds0/components/react/tooltip';

/**
 * A navigation item.
 */
interface NavItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
    badge?: string | number;
    children?: NavItem[];
    disabled?: boolean;
}

/**
 * A group of navigation items.
 */
interface NavGroup {
    label?: string;
    items: NavItem[];
}

/**
 * Props for the SidebarNavigation recipe component.
 */
interface SidebarNavigationProps {
    /** Navigation groups */
    groups: NavGroup[];
    /** Currently active path */
    currentPath: string;
    /** Header content (avatar, name, etc.) */
    header?: React.ReactNode;
    /** Footer content (settings link, logout, etc.) */
    footer?: React.ReactNode;
    /** Whether the sidebar is collapsed to icons only */
    collapsed?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Chevron icon for expandable items.
 */
function ChevronIcon({ open }: { open: boolean }): React.ReactElement {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={cn('transition-transform', open && 'rotate-90')}
        >
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
}

/**
 * Individual nav item renderer.
 */
function NavItemRow({
    item,
    currentPath,
    collapsed,
    depth = 0,
}: {
    item: NavItem;
    currentPath: string;
    collapsed?: boolean;
    depth?: number;
}): React.ReactElement {
    const [expanded, setExpanded] = useState(
        item.children?.some((child) => child.href === currentPath) ?? false,
    );
    const isActive = item.href === currentPath;
    const hasChildren = item.children && item.children.length > 0;

    const content = (
        <a
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={item.disabled}
            className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive && 'bg-accent text-accent-foreground',
                item.disabled && 'opacity-50 pointer-events-none',
                depth > 0 && 'ml-6',
            )}
            onClick={
                hasChildren
                    ? (e) => {
                        e.preventDefault();
                        setExpanded(!expanded);
                    }
                    : undefined
            }
        >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {!collapsed && (
                <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge !== undefined && (
                        <Badge variant="secondary" size="sm">
                            {item.badge}
                        </Badge>
                    )}
                    {hasChildren && <ChevronIcon open={expanded} />}
                </>
            )}
        </a>
    );

    return (
        <div>
            {collapsed && item.icon ? (
                <Tooltip>
                    <Tooltip.Trigger asChild>{content}</Tooltip.Trigger>
                    <Tooltip.Content side="right">{item.label}</Tooltip.Content>
                </Tooltip>
            ) : (
                content
            )}
            {hasChildren && expanded && !collapsed && (
                <div className="mt-1">
                    {item.children!.map((child) => (
                        <NavItemRow
                            key={child.href}
                            item={child}
                            currentPath={currentPath}
                            collapsed={collapsed}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/**
 * SidebarNavigation recipe.
 * A vertical navigation sidebar with grouped links, collapsible sections,
 * and active state indication.
 *
 * @example
 * ```tsx
 * <SidebarNavigation
 *   groups={[{ label: 'Main', items: [{ label: 'Dashboard', href: '/', icon: <HomeIcon /> }] }]}
 *   currentPath="/"
 * />
 * ```
 */
function SidebarNavigation({
    groups,
    currentPath,
    header,
    footer,
    collapsed = false,
    className,
}: SidebarNavigationProps): React.ReactElement {
    return (
        <nav
            className={cn(
                'flex h-full flex-col border-r bg-card',
                collapsed ? 'w-16' : 'w-64',
                'transition-all duration-200',
                className,
            )}
            aria-label="Sidebar navigation"
        >
            {header && (
                <>
                    <div className="p-4">{header}</div>
                    <Divider />
                </>
            )}

            <div className="flex-1 overflow-y-auto p-3">
                <Stack gap="6">
                    {groups.map((group, index) => (
                        <div key={group.label ?? index}>
                            {group.label && !collapsed && (
                                <Text
                                    as="span"
                                    size="xs"
                                    weight="semibold"
                                    color="muted"
                                    className="mb-2 block px-3 uppercase tracking-wider"
                                >
                                    {group.label}
                                </Text>
                            )}
                            <Stack gap="1">
                                {group.items.map((item) => (
                                    <NavItemRow
                                        key={item.href}
                                        item={item}
                                        currentPath={currentPath}
                                        collapsed={collapsed}
                                    />
                                ))}
                            </Stack>
                        </div>
                    ))}
                </Stack>
            </div>

            {footer && (
                <>
                    <Divider />
                    <div className="p-4">{footer}</div>
                </>
            )}
        </nav>
    );
}

SidebarNavigation.displayName = 'SidebarNavigation';

export { SidebarNavigation };
export type { SidebarNavigationProps, NavGroup, NavItem };
