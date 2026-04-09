import React, { useState } from 'react';

import { cn } from '@ds0/primitives';

import { Stack } from '@ds0/components/react/stack';
import { Button } from '@ds0/components/react/button';
import { Container } from '@ds0/components/react/container';
import { Drawer } from '@ds0/components/react/drawer';

/**
 * Props for the DashboardLayout recipe component.
 */
interface DashboardLayoutProps {
    /** Sidebar content */
    sidebar: React.ReactNode;
    /** Optional header/navbar content */
    header?: React.ReactNode;
    /** Main content area */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Menu icon for mobile sidebar toggle.
 */
function MenuIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}

/**
 * DashboardLayout recipe.
 * A responsive dashboard shell with sidebar, header, and scrollable content area.
 * On mobile, the sidebar collapses into a drawer.
 *
 * @example
 * ```tsx
 * <DashboardLayout
 *   sidebar={<SidebarNavigation ... />}
 *   header={<Navbar ... />}
 * >
 *   <DashboardStats ... />
 * </DashboardLayout>
 * ```
 */
function DashboardLayout({
    sidebar,
    header,
    children,
    className,
}: DashboardLayoutProps): React.ReactElement {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className={cn('flex h-screen overflow-hidden bg-background', className)}>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:flex-shrink-0">
                {sidebar}
            </aside>

            {/* Mobile Sidebar Drawer */}
            <Drawer open={mobileOpen} onOpenChange={setMobileOpen} side="left">
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>Navigation</Drawer.Title>
                    </Drawer.Header>
                    {sidebar}
                </Drawer.Content>
            </Drawer>

            {/* Main Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                {header ? (
                    <div className="relative">
                        {/* Mobile sidebar toggle */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute left-2 top-1/2 -translate-y-1/2 lg:hidden z-10"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open sidebar"
                        >
                            <MenuIcon />
                        </Button>
                        {header}
                    </div>
                ) : (
                    <div className="flex h-14 items-center border-b px-4 lg:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open sidebar"
                        >
                            <MenuIcon />
                        </Button>
                    </div>
                )}

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Container size="xl">{children}</Container>
                </main>
            </div>
        </div>
    );
}

DashboardLayout.displayName = 'DashboardLayout';

export { DashboardLayout };
export type { DashboardLayoutProps };
