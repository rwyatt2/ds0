import React, { createContext, forwardRef, useContext, useState } from 'react';
import type { MenubarProps, MenubarMenuProps, MenubarTriggerProps, MenubarContentProps, MenubarItemProps, MenubarSeparatorProps } from './Menubar.types';

interface MenuCtx { openMenu: string | null; setOpenMenu: (id: string | null) => void; }
const MenubarCtx = createContext<MenuCtx>({ openMenu: null, setOpenMenu: () => {} });

const MenubarPrimitive = forwardRef<HTMLDivElement, MenubarProps>(({ children, ...props }, ref) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    return <MenubarCtx.Provider value={{ openMenu, setOpenMenu }}><div ref={ref} role="menubar" {...props}>{children}</div></MenubarCtx.Provider>;
});
MenubarPrimitive.displayName = 'MenubarPrimitive';

interface SubCtx { id: string; }
const SubMenuCtx = createContext<SubCtx>({ id: '' });

const MenubarMenuPrimitive = ({ children }: MenubarMenuProps) => {
    const id = React.useId();
    return <SubMenuCtx.Provider value={{ id }}><div role="none" style={{ position: 'relative', display: 'inline-block' }}>{children}</div></SubMenuCtx.Provider>;
};

const MenubarTriggerPrimitive = forwardRef<HTMLButtonElement, MenubarTriggerProps>(({ children, onClick, ...props }, ref) => {
    const { openMenu, setOpenMenu } = useContext(MenubarCtx);
    const { id } = useContext(SubMenuCtx);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { setOpenMenu(openMenu === id ? null : id); onClick?.(e); };
    return <button ref={ref} type="button" role="menuitem" aria-haspopup="menu" aria-expanded={openMenu === id} onClick={handleClick} {...props}>{children}</button>;
});
MenubarTriggerPrimitive.displayName = 'MenubarTriggerPrimitive';

const MenubarContentPrimitive = forwardRef<HTMLDivElement, MenubarContentProps>(({ children, ...props }, ref) => {
    const { openMenu } = useContext(MenubarCtx);
    const { id } = useContext(SubMenuCtx);
    if (openMenu !== id) return null;
    return <div ref={ref} role="menu" {...props}>{children}</div>;
});
MenubarContentPrimitive.displayName = 'MenubarContentPrimitive';

const MenubarItemPrimitive = forwardRef<HTMLDivElement, MenubarItemProps>(({ children, isDisabled, onSelect, onClick, ...props }, ref) => {
    const { setOpenMenu } = useContext(MenubarCtx);
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => { if (isDisabled) return; onSelect?.(); setOpenMenu(null); onClick?.(e); };
    return <div ref={ref} role="menuitem" tabIndex={isDisabled ? -1 : 0} aria-disabled={isDisabled || undefined} onClick={handleClick} {...props}>{children}</div>;
});
MenubarItemPrimitive.displayName = 'MenubarItemPrimitive';

const MenubarSeparatorPrimitive = forwardRef<HTMLDivElement, MenubarSeparatorProps>((props, ref) => <div ref={ref} role="separator" {...props} />);
MenubarSeparatorPrimitive.displayName = 'MenubarSeparatorPrimitive';

export { MenubarPrimitive, MenubarMenuPrimitive, MenubarTriggerPrimitive, MenubarContentPrimitive, MenubarItemPrimitive, MenubarSeparatorPrimitive };
