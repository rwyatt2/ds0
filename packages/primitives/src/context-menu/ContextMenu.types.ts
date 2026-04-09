export type ContextMenuType = 'default';

export interface UseContextMenuProps {
    onOpenChange?: (open: boolean) => void;
}

export interface UseContextMenuReturn {
    isOpen: boolean;
    position: { x: number; y: number };
    openMenu: (e: React.MouseEvent) => void;
    closeMenu: () => void;
    triggerProps: React.HTMLAttributes<HTMLDivElement>;
    contentProps: React.HTMLAttributes<HTMLDivElement> & { role?: string };
    contentId: string;
}

export interface ContextMenuProps extends UseContextMenuProps {
    children: React.ReactNode;
}
export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}
export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    isDisabled?: boolean;
    onSelect?: () => void;
    children: React.ReactNode;
    className?: string;
}
export interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export type StyledContextMenuProps = ContextMenuProps;
export type StyledContextMenuContentProps = ContextMenuContentProps;
export type StyledContextMenuItemProps = ContextMenuItemProps;
