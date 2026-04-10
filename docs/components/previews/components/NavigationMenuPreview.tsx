'use client';

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '../../../../components/react/navigation-menu';

export function NavigationMenuPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem value="getting-started">
                        <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="grid gap-3 p-4 w-[300px]">
                                <NavigationMenuLink href="#" className="block rounded-md p-3 hover:bg-accent transition-colors">
                                    <div className="text-sm font-medium">Installation</div>
                                    <p className="text-xs text-muted-foreground mt-1">Get up and running in minutes</p>
                                </NavigationMenuLink>
                                <NavigationMenuLink href="#" className="block rounded-md p-3 hover:bg-accent transition-colors">
                                    <div className="text-sm font-medium">Quick Start</div>
                                    <p className="text-xs text-muted-foreground mt-1">Build your first component</p>
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#" className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                            Documentation
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#" className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                            Components
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
