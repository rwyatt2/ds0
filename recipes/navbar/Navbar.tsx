import React, { useState } from 'react';

import { cn } from '@ds0/primitives';

import { Container } from '@ds0/components/react/container';
import { Stack } from '@ds0/components/react/stack';
import { Button } from '@ds0/components/react/button';
import { Avatar } from '@ds0/components/react/avatar';
import { Link } from '@ds0/components/react/link';
import { Drawer } from '@ds0/components/react/drawer';
import { Popover } from '@ds0/components/react/popover';
import { Text } from '@ds0/components/react/text';
import { Divider } from '@ds0/components/react/divider';

/**
 * Props for the Navbar recipe component.
 */
interface NavbarProps {
    /** Logo content */
    logo: React.ReactNode;
    /** Navigation links */
    links?: Array<{ label: string; href: string; isActive?: boolean }>;
    /** Right-side actions (buttons, etc.) */
    actions?: React.ReactNode;
    /** User info for avatar menu */
    user?: { name: string; email: string; avatarUrl?: string };
    /** Logout handler */
    onLogout?: () => void;
    /** Whether the navbar is sticky */
    sticky?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Hamburger menu icon.
 */
function MenuIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}

/**
 * Navbar recipe.
 * A responsive top navigation bar with logo, nav links, and user menu.
 *
 * @example
 * ```tsx
 * <Navbar
 *   logo={<span>MyApp</span>}
 *   links={[{ label: 'Home', href: '/', isActive: true }]}
 *   user={{ name: 'John', email: 'john@example.com' }}
 * />
 * ```
 */
function Navbar({
    logo,
    links,
    actions,
    user,
    onLogout,
    sticky = false,
    className,
}: NavbarProps): React.ReactElement {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header
            className={cn(
                'w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
                sticky && 'sticky top-0 z-40',
                className,
            )}
        >
            <Container>
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <div className="shrink-0">{logo}</div>

                        {/* Desktop Links */}
                        {links && links.length > 0 && (
                            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                                {links.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        aria-current={link.isActive ? 'page' : undefined}
                                        className={cn(
                                            'text-sm font-medium transition-colors hover:text-foreground',
                                            link.isActive ? 'text-foreground' : 'text-muted-foreground',
                                        )}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        )}
                    </div>

                    {/* Desktop Right */}
                    <div className="hidden md:flex items-center gap-4">
                        {actions}

                        {user && (
                            <Popover>
                                <Popover.Trigger>
                                    <button type="button" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="User menu">
                                        <Avatar
                                            src={user.avatarUrl}
                                            alt={user.name}
                                            size="sm"
                                            fallback={user.name.slice(0, 2)}
                                        />
                                    </button>
                                </Popover.Trigger>
                                <Popover.Content align="end" className="w-56">
                                    <Stack gap="3">
                                        <div>
                                            <Text size="sm" weight="medium">{user.name}</Text>
                                            <Text size="xs" color="muted">{user.email}</Text>
                                        </div>
                                        {onLogout && (
                                            <>
                                                <Divider />
                                                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={onLogout}>
                                                    Log out
                                                </Button>
                                            </>
                                        )}
                                    </Stack>
                                </Popover.Content>
                            </Popover>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <MenuIcon />
                    </Button>
                </div>
            </Container>

            {/* Mobile Drawer */}
            <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} side="right">
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>Menu</Drawer.Title>
                    </Drawer.Header>
                    <Stack gap="4" className="p-4">
                        {links &&
                            links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    aria-current={link.isActive ? 'page' : undefined}
                                    className={cn(
                                        'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        link.isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        {actions && <Divider />}
                        {actions}
                        {user && (
                            <>
                                <Divider />
                                <Stack gap="2">
                                    <Text size="sm" weight="medium">{user.name}</Text>
                                    <Text size="xs" color="muted">{user.email}</Text>
                                    {onLogout && (
                                        <Button variant="ghost" size="sm" className="justify-start" onClick={onLogout}>
                                            Log out
                                        </Button>
                                    )}
                                </Stack>
                            </>
                        )}
                    </Stack>
                </Drawer.Content>
            </Drawer>
        </header>
    );
}

Navbar.displayName = 'Navbar';

export { Navbar };
export type { NavbarProps };
