import React, { createContext, forwardRef, useContext } from 'react';
import { cn } from '@ds0/primitives';
import { useContextMenu } from '@ds0/primitives';
import type { StyledContextMenuProps, StyledContextMenuContentProps, StyledContextMenuItemProps, ContextMenuTriggerProps, ContextMenuSeparatorProps, UseContextMenuReturn } from '@ds0/primitives';

const Ctx = createContext<UseContextMenuReturn | null>(null);
function useCtx(): UseContextMenuReturn { const c = useContext(Ctx); if (!c) throw new Error('ContextMenu sub-components must be within ContextMenu'); return c; }

const ContextMenu = forwardRef<HTMLDivElement, StyledContextMenuProps>(({ onOpenChange, children, ...props }, ref) => {
    const menu = useContextMenu({ onOpenChange });
    return <Ctx.Provider value={menu}><div ref={ref} {...props}>{children}</div></Ctx.Provider>;
}) as ContextMenuComponent;
ContextMenu.displayName = 'ContextMenu';

const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(({ children, ...props }, ref) => {
    const { triggerProps } = useCtx();
    return <div ref={ref} {...props} {...triggerProps}>{children}</div>;
});
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

const ContextMenuContent = forwardRef<HTMLDivElement, StyledContextMenuContentProps>(({ children, className, ...props }, ref) => {
    const { isOpen, position, contentProps } = useCtx();
    if (!isOpen) return null;
    return (
        <div ref={ref} style={{ position: 'fixed', left: position.x, top: position.y, zIndex: 50 }}
            className={cn('min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95', className)}
            {...props} {...contentProps}>{children}</div>
    );
});
ContextMenuContent.displayName = 'ContextMenuContent';

const ContextMenuItem = forwardRef<HTMLDivElement, StyledContextMenuItemProps>(({ children, className, isDisabled, onSelect, onClick, ...props }, ref) => {
    const { closeMenu } = useCtx();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => { if (isDisabled) return; onSelect?.(); closeMenu(); onClick?.(e); };
    return <div ref={ref} role="menuitem" tabIndex={isDisabled ? -1 : 0} aria-disabled={isDisabled || undefined} onClick={handleClick}
        className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground', isDisabled && 'pointer-events-none opacity-50', className)} {...props}>{children}</div>;
});
ContextMenuItem.displayName = 'ContextMenuItem';

const ContextMenuSeparator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

interface ContextMenuComponent extends React.ForwardRefExoticComponent<StyledContextMenuProps & React.RefAttributes<HTMLDivElement>> {
    Trigger: typeof ContextMenuTrigger; Content: typeof ContextMenuContent; Item: typeof ContextMenuItem; Separator: typeof ContextMenuSeparator;
}
ContextMenu.Trigger = ContextMenuTrigger; ContextMenu.Content = ContextMenuContent; ContextMenu.Item = ContextMenuItem; ContextMenu.Separator = ContextMenuSeparator;

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator };
