import React, { createContext, forwardRef, useContext } from 'react';
import { cn } from '@ds0/primitives';
import { useAlertDialog } from '@ds0/primitives';
import type { StyledAlertDialogProps, StyledAlertDialogContentProps, AlertDialogTriggerProps, AlertDialogHeaderProps, AlertDialogFooterProps, AlertDialogTitleProps, AlertDialogDescriptionProps, AlertDialogActionProps, AlertDialogCancelProps, UseAlertDialogReturn } from '@ds0/primitives';

const Ctx = createContext<UseAlertDialogReturn | null>(null);
function useCtx() { const c = useContext(Ctx); if (!c) throw new Error('AlertDialog sub-components must be within AlertDialog'); return c; }

const AlertDialog = forwardRef<HTMLDivElement, StyledAlertDialogProps>(({ open, defaultOpen, onOpenChange, children, ...props }, ref) => {
    const dialog = useAlertDialog({ open, defaultOpen, onOpenChange });
    return <Ctx.Provider value={dialog}><div ref={ref} {...props}>{children}</div></Ctx.Provider>;
}) as AlertDialogComponent;
AlertDialog.displayName = 'AlertDialog';

const AlertDialogTrigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(({ children, className, onClick, ...props }, ref) => {
    const { triggerProps } = useCtx();
    return <button ref={ref} className={cn(className)} {...props} {...triggerProps} onClick={(e) => { triggerProps.onClick?.(e); onClick?.(e); }}>{children}</button>;
});
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

const AlertDialogContent = forwardRef<HTMLDivElement, StyledAlertDialogContentProps>(({ children, className, ...props }, ref) => {
    const { isOpen, overlayProps, contentProps } = useCtx();
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0" {...overlayProps} />
            <div ref={ref} className={cn('fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg animate-in fade-in-0 zoom-in-95', className)} {...props} {...contentProps}>{children}</div>
        </>
    );
});
AlertDialogContent.displayName = 'AlertDialogContent';

const AlertDialogHeader = forwardRef<HTMLDivElement, AlertDialogHeaderProps>(({ children, className, ...props }, ref) => <div ref={ref} className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props}>{children}</div>);
AlertDialogHeader.displayName = 'AlertDialogHeader';
const AlertDialogFooter = forwardRef<HTMLDivElement, AlertDialogFooterProps>(({ children, className, ...props }, ref) => <div ref={ref} className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props}>{children}</div>);
AlertDialogFooter.displayName = 'AlertDialogFooter';
const AlertDialogTitle = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(({ children, className, ...props }, ref) => <h2 ref={ref} className={cn('text-lg font-semibold', className)} {...props}>{children}</h2>);
AlertDialogTitle.displayName = 'AlertDialogTitle';
const AlertDialogDescription = forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(({ children, className, ...props }, ref) => <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props}>{children}</p>);
AlertDialogDescription.displayName = 'AlertDialogDescription';

const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(({ children, className, onClick, ...props }, ref) => {
    const { closeDialog } = useCtx();
    return <button ref={ref} className={cn('inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)} onClick={(e) => { closeDialog(); onClick?.(e); }} {...props}>{children}</button>;
});
AlertDialogAction.displayName = 'AlertDialogAction';

const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(({ children, className, onClick, ...props }, ref) => {
    const { closeDialog } = useCtx();
    return <button ref={ref} className={cn('inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)} onClick={(e) => { closeDialog(); onClick?.(e); }} {...props}>{children}</button>;
});
AlertDialogCancel.displayName = 'AlertDialogCancel';

interface AlertDialogComponent extends React.ForwardRefExoticComponent<StyledAlertDialogProps & React.RefAttributes<HTMLDivElement>> {
    Trigger: typeof AlertDialogTrigger; Content: typeof AlertDialogContent; Header: typeof AlertDialogHeader; Footer: typeof AlertDialogFooter;
    Title: typeof AlertDialogTitle; Description: typeof AlertDialogDescription; Action: typeof AlertDialogAction; Cancel: typeof AlertDialogCancel;
}
AlertDialog.Trigger = AlertDialogTrigger; AlertDialog.Content = AlertDialogContent; AlertDialog.Header = AlertDialogHeader; AlertDialog.Footer = AlertDialogFooter;
AlertDialog.Title = AlertDialogTitle; AlertDialog.Description = AlertDialogDescription; AlertDialog.Action = AlertDialogAction; AlertDialog.Cancel = AlertDialogCancel;

export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel };
