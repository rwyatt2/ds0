import { useCallback, useId, useState, useEffect } from 'react';
import type { UseContextMenuProps, UseContextMenuReturn } from './ContextMenu.types';

export function useContextMenu(props: UseContextMenuProps): UseContextMenuReturn {
    const { onOpenChange } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const contentId = useId();

    const openMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setPosition({ x: e.clientX, y: e.clientY });
        setIsOpen(true);
        onOpenChange?.(true);
    }, [onOpenChange]);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
        onOpenChange?.(false);
    }, [onOpenChange]);

    useEffect(() => {
        if (!isOpen) return;
        const handle = () => closeMenu();
        document.addEventListener('click', handle);
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
        document.addEventListener('keydown', handleKey);
        return () => { document.removeEventListener('click', handle); document.removeEventListener('keydown', handleKey); };
    }, [isOpen, closeMenu]);

    return {
        isOpen, position, openMenu, closeMenu, contentId,
        triggerProps: { onContextMenu: openMenu as unknown as React.MouseEventHandler<HTMLDivElement> },
        contentProps: { id: contentId, role: 'menu' as const },
    };
}
