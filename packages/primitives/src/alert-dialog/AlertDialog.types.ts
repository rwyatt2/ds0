export interface UseAlertDialogProps { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; }
export interface UseAlertDialogReturn { isOpen: boolean; openDialog: () => void; closeDialog: () => void; triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>; overlayProps: React.HTMLAttributes<HTMLDivElement>; contentProps: React.HTMLAttributes<HTMLDivElement> & { role?: string }; }
export interface AlertDialogProps extends UseAlertDialogProps { children: React.ReactNode; }
export interface AlertDialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean; children: React.ReactNode; }
export interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; className?: string; }
export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; className?: string; }
export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; className?: string; }
export interface AlertDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { children: React.ReactNode; className?: string; }
export interface AlertDialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { children: React.ReactNode; className?: string; }
export interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { children: React.ReactNode; className?: string; }
export interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { children: React.ReactNode; className?: string; }
export type StyledAlertDialogProps = AlertDialogProps;
export type StyledAlertDialogContentProps = AlertDialogContentProps;
