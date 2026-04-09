import React, { createContext, forwardRef, useContext } from 'react';
import { useAlertDialog } from './useAlertDialog';
import type { AlertDialogProps, AlertDialogTriggerProps, AlertDialogContentProps, AlertDialogHeaderProps, AlertDialogFooterProps, AlertDialogTitleProps, AlertDialogDescriptionProps, AlertDialogActionProps, AlertDialogCancelProps, UseAlertDialogReturn } from './AlertDialog.types';

const Ctx = createContext<UseAlertDialogReturn | null>(null);
function useCtx() { const c = useContext(Ctx); if (!c) throw new Error('AlertDialog sub-components must be within AlertDialog'); return c; }

const AlertDialogPrimitive = forwardRef<HTMLDivElement, AlertDialogProps>(({ open, defaultOpen, onOpenChange, children, ...props }, ref) => {
    const dialog = useAlertDialog({ open, defaultOpen, onOpenChange });
    return <Ctx.Provider value={dialog}><div ref={ref} {...props}>{children}</div></Ctx.Provider>;
});
AlertDialogPrimitive.displayName = 'AlertDialogPrimitive';

const AlertDialogTriggerPrimitive = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(({ children, onClick, ...props }, ref) => {
    const { triggerProps } = useCtx();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { triggerProps.onClick?.(e); onClick?.(e); };
    return <button ref={ref} {...props} {...triggerProps} onClick={handleClick}>{children}</button>;
});
AlertDialogTriggerPrimitive.displayName = 'AlertDialogTriggerPrimitive';

const AlertDialogContentPrimitive = forwardRef<HTMLDivElement, AlertDialogContentProps>(({ children, ...props }, ref) => {
    const { isOpen, overlayProps, contentProps } = useCtx();
    if (!isOpen) return null;
    return (
        <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.5)' }} {...overlayProps} />
            <div ref={ref} style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 50 }} {...props} {...contentProps}>{children}</div>
        </>
    );
});
AlertDialogContentPrimitive.displayName = 'AlertDialogContentPrimitive';

const AlertDialogHeaderPrimitive = forwardRef<HTMLDivElement, AlertDialogHeaderProps>(({ children, ...props }, ref) => <div ref={ref} {...props}>{children}</div>);
AlertDialogHeaderPrimitive.displayName = 'AlertDialogHeaderPrimitive';
const AlertDialogFooterPrimitive = forwardRef<HTMLDivElement, AlertDialogFooterProps>(({ children, ...props }, ref) => <div ref={ref} {...props}>{children}</div>);
AlertDialogFooterPrimitive.displayName = 'AlertDialogFooterPrimitive';
const AlertDialogTitlePrimitive = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(({ children, ...props }, ref) => <h2 ref={ref} {...props}>{children}</h2>);
AlertDialogTitlePrimitive.displayName = 'AlertDialogTitlePrimitive';
const AlertDialogDescriptionPrimitive = forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(({ children, ...props }, ref) => <p ref={ref} {...props}>{children}</p>);
AlertDialogDescriptionPrimitive.displayName = 'AlertDialogDescriptionPrimitive';

const AlertDialogActionPrimitive = forwardRef<HTMLButtonElement, AlertDialogActionProps>(({ children, onClick, ...props }, ref) => {
    const { closeDialog } = useCtx();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { closeDialog(); onClick?.(e); };
    return <button ref={ref} {...props} onClick={handleClick}>{children}</button>;
});
AlertDialogActionPrimitive.displayName = 'AlertDialogActionPrimitive';

const AlertDialogCancelPrimitive = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(({ children, onClick, ...props }, ref) => {
    const { closeDialog } = useCtx();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { closeDialog(); onClick?.(e); };
    return <button ref={ref} {...props} onClick={handleClick}>{children}</button>;
});
AlertDialogCancelPrimitive.displayName = 'AlertDialogCancelPrimitive';

export { AlertDialogPrimitive, AlertDialogTriggerPrimitive, AlertDialogContentPrimitive, AlertDialogHeaderPrimitive, AlertDialogFooterPrimitive, AlertDialogTitlePrimitive, AlertDialogDescriptionPrimitive, AlertDialogActionPrimitive, AlertDialogCancelPrimitive };
