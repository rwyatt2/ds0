import React, { createContext, forwardRef, useContext } from 'react';
import { useNavigationMenu } from './useNavigationMenu';
import type { NavigationMenuProps, NavigationMenuListProps, NavigationMenuItemProps, NavigationMenuTriggerProps, NavigationMenuContentProps, NavigationMenuLinkProps, UseNavigationMenuReturn } from './NavigationMenu.types';

const NavCtx = createContext<UseNavigationMenuReturn>({ activeValue: '', setActiveValue: () => {} });

const NavigationMenuPrimitive = forwardRef<HTMLElement, NavigationMenuProps>(({ children, ...props }, ref) => {
    const nav = useNavigationMenu({});
    return <NavCtx.Provider value={nav}><nav ref={ref} {...props}>{children}</nav></NavCtx.Provider>;
});
NavigationMenuPrimitive.displayName = 'NavigationMenuPrimitive';

const NavigationMenuListPrimitive = forwardRef<HTMLUListElement, NavigationMenuListProps>(({ children, ...props }, ref) => (
    <ul ref={ref} role="menubar" {...props}>{children}</ul>
));
NavigationMenuListPrimitive.displayName = 'NavigationMenuListPrimitive';

const ItemCtx = createContext<string>('');
const NavigationMenuItemPrimitive = forwardRef<HTMLLIElement, NavigationMenuItemProps>(({ children, value = '', ...props }, ref) => (
    <ItemCtx.Provider value={value}><li ref={ref} {...props}>{children}</li></ItemCtx.Provider>
));
NavigationMenuItemPrimitive.displayName = 'NavigationMenuItemPrimitive';

const NavigationMenuTriggerPrimitive = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(({ children, onClick, ...props }, ref) => {
    const { activeValue, setActiveValue } = useContext(NavCtx);
    const itemValue = useContext(ItemCtx);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { setActiveValue(activeValue === itemValue ? '' : itemValue); onClick?.(e); };
    return <button ref={ref} type="button" aria-expanded={activeValue === itemValue} onClick={handleClick} {...props}>{children}</button>;
});
NavigationMenuTriggerPrimitive.displayName = 'NavigationMenuTriggerPrimitive';

const NavigationMenuContentPrimitive = forwardRef<HTMLDivElement, NavigationMenuContentProps>(({ children, ...props }, ref) => {
    const { activeValue } = useContext(NavCtx);
    const itemValue = useContext(ItemCtx);
    if (activeValue !== itemValue) return null;
    return <div ref={ref} {...props}>{children}</div>;
});
NavigationMenuContentPrimitive.displayName = 'NavigationMenuContentPrimitive';

const NavigationMenuLinkPrimitive = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(({ children, active, ...props }, ref) => (
    <a ref={ref} data-active={active || undefined} {...props}>{children}</a>
));
NavigationMenuLinkPrimitive.displayName = 'NavigationMenuLinkPrimitive';

export { NavigationMenuPrimitive, NavigationMenuListPrimitive, NavigationMenuItemPrimitive, NavigationMenuTriggerPrimitive, NavigationMenuContentPrimitive, NavigationMenuLinkPrimitive };
