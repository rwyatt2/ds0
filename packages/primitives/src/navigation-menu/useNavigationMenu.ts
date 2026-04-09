import { useState, useCallback } from 'react';
import type { UseNavigationMenuProps, UseNavigationMenuReturn } from './NavigationMenu.types';
export function useNavigationMenu(props: UseNavigationMenuProps): UseNavigationMenuReturn {
    const { value, defaultValue = '', onValueChange } = props;
    const [internal, setInternal] = useState(defaultValue);
    const activeValue = value ?? internal;
    const setActiveValue = useCallback((v: string) => { setInternal(v); onValueChange?.(v); }, [onValueChange]);
    return { activeValue, setActiveValue };
}
