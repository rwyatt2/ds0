export interface UseNavigationMenuProps { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; }
export interface UseNavigationMenuReturn { activeValue: string; setActiveValue: (value: string) => void; }
export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> { children: React.ReactNode; className?: string; }
export interface NavigationMenuListProps extends React.HTMLAttributes<HTMLUListElement> { children: React.ReactNode; className?: string; }
export interface NavigationMenuItemProps extends React.HTMLAttributes<HTMLLIElement> { value?: string; children: React.ReactNode; className?: string; }
export interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { children: React.ReactNode; className?: string; }
export interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; className?: string; }
export interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { children: React.ReactNode; className?: string; active?: boolean; }
export type StyledNavigationMenuProps = NavigationMenuProps;
export type StyledNavigationMenuListProps = NavigationMenuListProps;
export type StyledNavigationMenuItemProps = NavigationMenuItemProps;
export type StyledNavigationMenuTriggerProps = NavigationMenuTriggerProps;
export type StyledNavigationMenuContentProps = NavigationMenuContentProps;
export type StyledNavigationMenuLinkProps = NavigationMenuLinkProps;
