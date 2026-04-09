export interface UseMenubarProps { children?: React.ReactNode; }
export interface UseMenubarReturn { menubarProps: React.HTMLAttributes<HTMLDivElement>; }
export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; className?: string; }
export interface MenubarMenuProps { children: React.ReactNode; }
export interface MenubarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { children: React.ReactNode; className?: string; }
export interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; className?: string; }
export interface MenubarItemProps extends React.HTMLAttributes<HTMLDivElement> { isDisabled?: boolean; onSelect?: () => void; children: React.ReactNode; className?: string; }
export interface MenubarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> { className?: string; }
export type StyledMenubarProps = MenubarProps;
export type StyledMenubarMenuProps = MenubarMenuProps;
export type StyledMenubarTriggerProps = MenubarTriggerProps;
export type StyledMenubarContentProps = MenubarContentProps;
export type StyledMenubarItemProps = MenubarItemProps;
