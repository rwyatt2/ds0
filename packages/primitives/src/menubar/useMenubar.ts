import type { UseMenubarProps, UseMenubarReturn } from './Menubar.types';
export function useMenubar(_props: UseMenubarProps): UseMenubarReturn {
    return { menubarProps: { role: 'menubar' as const } };
}
