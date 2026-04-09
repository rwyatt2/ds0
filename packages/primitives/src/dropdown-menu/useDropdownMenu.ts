import { useCallback, useId, useEffect } from 'react';
import { useControllable } from '../utils/useControllable';
import type { UseDropdownMenuProps, UseDropdownMenuReturn } from './DropdownMenu.types';

/**
 * Hook that encapsulates DropdownMenu behavior.
 * Manages open/close state, ARIA attributes, and keyboard interactions.
 */
export function useDropdownMenu(props: UseDropdownMenuProps): UseDropdownMenuReturn {
    const { open, defaultOpen = false, onOpenChange } = props;

    const { value: isOpen, setValue: setIsOpen } = useControllable({
        value: open,
        defaultValue: defaultOpen,
        onChange: onOpenChange,
    });

    const contentId = useId();

    const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);
    const openMenu = useCallback(() => setIsOpen(true), [setIsOpen]);
    const closeMenu = useCallback(() => setIsOpen(false), [setIsOpen]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeMenu]);

    return {
        isOpen,
        toggle,
        openMenu,
        closeMenu,
        triggerProps: {
            type: 'button' as const,
            'aria-haspopup': 'menu' as const,
            'aria-expanded': isOpen,
            'aria-controls': isOpen ? contentId : undefined,
            onClick: toggle,
        },
        contentProps: {
            id: contentId,
            role: 'menu' as const,
            'aria-orientation': 'vertical' as const,
        },
        contentId,
    };
}
