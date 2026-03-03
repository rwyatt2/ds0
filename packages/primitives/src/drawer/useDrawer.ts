import { useCallback, useId } from 'react';
import { useControllable } from '../utils/useControllable';
import type { UseDrawerProps, UseDrawerReturn } from './Drawer.types';

export function useDrawer(props: UseDrawerProps = {}): UseDrawerReturn {
    const { open: controlledOpen, defaultOpen = false, onOpenChange } = props;
    const { value: isOpen, setValue: setIsOpen } = useControllable<boolean>({
        value: controlledOpen, defaultValue: defaultOpen, onChange: onOpenChange,
    });
    const baseId = useId();
    const ids = {
        content: `${baseId}-drawer-content`,
        title: `${baseId}-drawer-title`,
        description: `${baseId}-drawer-description`,
    };
    const open = useCallback(() => setIsOpen(true), [setIsOpen]);
    const close = useCallback(() => setIsOpen(false), [setIsOpen]);
    const toggle = useCallback(() => setIsOpen(!isOpen), [setIsOpen, isOpen]);

    return { isOpen, open, close, toggle, ids };
}
