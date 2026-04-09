import React, { createContext, forwardRef, useContext, useState } from 'react';
import { cn } from '@ds0/primitives';
import type { StyledMenubarProps, StyledMenubarMenuProps, StyledMenubarTriggerProps, StyledMenubarContentProps, StyledMenubarItemProps, MenubarSeparatorProps } from '@ds0/primitives';

interface MenuCtx { openMenu: string | null; setOpenMenu: (id: string | null) => void; }
const MenubarCtx = createContext<MenuCtx>({ openMenu: null, setOpenMenu: () => {} });

const Menubar = forwardRef<HTMLDivElement, StyledMenubarProps>(({ children, className, ...props }, ref) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    return <MenubarCtx.Provider value={{ openMenu, setOpenMenu }}><div ref={ref} role="menubar" className={cn('flex h-10 items-center space-x-1 rounded-md border bg-background p-1', className)} {...props}>{children}</div></MenubarCtx.Provider>;
}) as MenubarComponent;
Menubar.displayName = 'Menubar';

const MenubarMenu = ({ children }: StyledMenubarMenuProps) => { const id = React.useId(); return <MenuItemCtx.Provider value={id}><div className="relative">{children}</div></MenuItemCtx.Provider>; };
const MenuItemCtx = createContext<string>('');

const MenubarTrigger = forwardRef<HTMLButtonElement, StyledMenubarTriggerProps>(({ children, className, onClick, ...props }, ref) => {
    const { openMenu, setOpenMenu } = useContext(MenubarCtx);
    const id = useContext(MenuItemCtx);
    return <button ref={ref} type="button" aria-haspopup="menu" aria-expanded={openMenu === id} className={cn('flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground', openMenu === id && 'bg-accent text-accent-foreground', className)} onClick={(e) => { setOpenMenu(openMenu === id ? null : id); onClick?.(e); }} {...props}>{children}</button>;
});
MenubarTrigger.displayName = 'MenubarTrigger';

const MenubarContent = forwardRef<HTMLDivElement, StyledMenubarContentProps>(({ children, className, ...props }, ref) => {
    const { openMenu } = useContext(MenubarCtx);
    const id = useContext(MenuItemCtx);
    if (openMenu !== id) return null;
    return <div ref={ref} role="menu" className={cn('absolute left-0 top-full z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95', className)} {...props}>{children}</div>;
});
MenubarContent.displayName = 'MenubarContent';

const MenubarItem = forwardRef<HTMLDivElement, StyledMenubarItemProps>(({ children, className, isDisabled, onSelect, onClick, ...props }, ref) => {
    const { setOpenMenu } = useContext(MenubarCtx);
    return <div ref={ref} role="menuitem" tabIndex={isDisabled ? -1 : 0} aria-disabled={isDisabled || undefined} className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground', isDisabled && 'pointer-events-none opacity-50', className)} onClick={(e) => { if (isDisabled) return; onSelect?.(); setOpenMenu(null); onClick?.(e); }} {...props}>{children}</div>;
});
MenubarItem.displayName = 'MenubarItem';

const MenubarSeparator = forwardRef<HTMLDivElement, MenubarSeparatorProps>(({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
));
MenubarSeparator.displayName = 'MenubarSeparator';

interface MenubarComponent extends React.ForwardRefExoticComponent<StyledMenubarProps & React.RefAttributes<HTMLDivElement>> { Menu: typeof MenubarMenu; Trigger: typeof MenubarTrigger; Content: typeof MenubarContent; Item: typeof MenubarItem; Separator: typeof MenubarSeparator; }
Menubar.Menu = MenubarMenu; Menubar.Trigger = MenubarTrigger; Menubar.Content = MenubarContent; Menubar.Item = MenubarItem; Menubar.Separator = MenubarSeparator;
export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator };
