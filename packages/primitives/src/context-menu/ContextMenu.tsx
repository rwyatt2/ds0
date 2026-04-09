import React, { createContext, forwardRef, useContext } from 'react';
import { useContextMenu } from './useContextMenu';
import type { ContextMenuProps, ContextMenuTriggerProps, ContextMenuContentProps, ContextMenuItemProps, ContextMenuSeparatorProps, UseContextMenuReturn } from './ContextMenu.types';

const Ctx = createContext<UseContextMenuReturn | null>(null);
function useCtx(): UseContextMenuReturn { const c = useContext(Ctx); if (!c) throw new Error('ContextMenu sub-components must be within ContextMenu'); return c; }

const ContextMenuPrimitive = forwardRef<HTMLDivElement, ContextMenuProps>(({ onOpenChange, children, ...props }, ref) => {
    const menu = useContextMenu({ onOpenChange });
    return <Ctx.Provider value={menu}><div ref={ref} {...props}>{children}</div></Ctx.Provider>;
});
ContextMenuPrimitive.displayName = 'ContextMenuPrimitive';

const ContextMenuTriggerPrimitive = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(({ children, ...props }, ref) => {
    const { triggerProps } = useCtx();
    return <div ref={ref} {...props} {...triggerProps}>{children}</div>;
});
ContextMenuTriggerPrimitive.displayName = 'ContextMenuTriggerPrimitive';

const ContextMenuContentPrimitive = forwardRef<HTMLDivElement, ContextMenuContentProps>(({ children, ...props }, ref) => {
    const { isOpen, position, contentProps } = useCtx();
    if (!isOpen) return null;
    return <div ref={ref} style={{ position: 'fixed', left: position.x, top: position.y, zIndex: 50 }} {...props} {...contentProps}>{children}</div>;
});
ContextMenuContentPrimitive.displayName = 'ContextMenuContentPrimitive';

const ContextMenuItemPrimitive = forwardRef<HTMLDivElement, ContextMenuItemProps>(({ children, isDisabled, onSelect, onClick, ...props }, ref) => {
    const { closeMenu } = useCtx();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => { if (isDisabled) return; onSelect?.(); closeMenu(); onClick?.(e); };
    return <div ref={ref} role="menuitem" tabIndex={isDisabled ? -1 : 0} aria-disabled={isDisabled || undefined} onClick={handleClick} {...props}>{children}</div>;
});
ContextMenuItemPrimitive.displayName = 'ContextMenuItemPrimitive';

const ContextMenuSeparatorPrimitive = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>((props, ref) => <div ref={ref} role="separator" {...props} />);
ContextMenuSeparatorPrimitive.displayName = 'ContextMenuSeparatorPrimitive';

export { ContextMenuPrimitive, ContextMenuTriggerPrimitive, ContextMenuContentPrimitive, ContextMenuItemPrimitive, ContextMenuSeparatorPrimitive };
