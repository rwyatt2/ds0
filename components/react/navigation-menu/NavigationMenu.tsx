import React, { createContext, forwardRef, useContext } from 'react';
import { cn } from '@ds0/primitives';
import { useNavigationMenu } from '@ds0/primitives';
import type { StyledNavigationMenuProps, StyledNavigationMenuListProps, StyledNavigationMenuItemProps, StyledNavigationMenuTriggerProps, StyledNavigationMenuContentProps, StyledNavigationMenuLinkProps, UseNavigationMenuReturn } from '@ds0/primitives';

const NavCtx = createContext<UseNavigationMenuReturn>({ activeValue: '', setActiveValue: () => {} });

const NavigationMenu = forwardRef<HTMLElement, StyledNavigationMenuProps>(({ children, className, ...props }, ref) => {
    const nav = useNavigationMenu({});
    return <NavCtx.Provider value={nav}><nav ref={ref} className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)} {...props}>{children}</nav></NavCtx.Provider>;
}) as NavigationMenuComponent;
NavigationMenu.displayName = 'NavigationMenu';

const NavigationMenuList = forwardRef<HTMLUListElement, StyledNavigationMenuListProps>(({ children, className, ...props }, ref) => (
    <ul ref={ref} className={cn('group flex flex-1 list-none items-center justify-center space-x-1', className)} {...props}>{children}</ul>
));
NavigationMenuList.displayName = 'NavigationMenuList';

const ItemCtx = createContext<string>('');
const NavigationMenuItem = forwardRef<HTMLLIElement, StyledNavigationMenuItemProps>(({ children, value = '', className, ...props }, ref) => (
    <ItemCtx.Provider value={value}><li ref={ref} className={cn(className)} {...props}>{children}</li></ItemCtx.Provider>
));
NavigationMenuItem.displayName = 'NavigationMenuItem';

const NavigationMenuTrigger = forwardRef<HTMLButtonElement, StyledNavigationMenuTriggerProps>(({ children, className, onClick, ...props }, ref) => {
    const { activeValue, setActiveValue } = useContext(NavCtx);
    const itemValue = useContext(ItemCtx);
    return <button ref={ref} type="button" aria-expanded={activeValue === itemValue} className={cn('group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none', activeValue === itemValue && 'bg-accent/50', className)} onClick={(e) => { setActiveValue(activeValue === itemValue ? '' : itemValue); onClick?.(e); }} {...props}>{children}</button>;
});
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

const NavigationMenuContent = forwardRef<HTMLDivElement, StyledNavigationMenuContentProps>(({ children, className, ...props }, ref) => {
    const { activeValue } = useContext(NavCtx);
    const itemValue = useContext(ItemCtx);
    if (activeValue !== itemValue) return null;
    return <div ref={ref} className={cn('left-0 top-0 w-full animate-in fade-in-0 md:absolute md:w-auto', className)} {...props}>{children}</div>;
});
NavigationMenuContent.displayName = 'NavigationMenuContent';

const NavigationMenuLink = forwardRef<HTMLAnchorElement, StyledNavigationMenuLinkProps>(({ children, className, active, ...props }, ref) => (
    <a ref={ref} data-active={active || undefined} className={cn('block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground', active && 'bg-accent/50', className)} {...props}>{children}</a>
));
NavigationMenuLink.displayName = 'NavigationMenuLink';

interface NavigationMenuComponent extends React.ForwardRefExoticComponent<StyledNavigationMenuProps & React.RefAttributes<HTMLElement>> { List: typeof NavigationMenuList; Item: typeof NavigationMenuItem; Trigger: typeof NavigationMenuTrigger; Content: typeof NavigationMenuContent; Link: typeof NavigationMenuLink; }
NavigationMenu.List = NavigationMenuList; NavigationMenu.Item = NavigationMenuItem; NavigationMenu.Trigger = NavigationMenuTrigger; NavigationMenu.Content = NavigationMenuContent; NavigationMenu.Link = NavigationMenuLink;
export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink };
