import { useCallback, useEffect } from 'react';
import { useControllable } from '../utils/useControllable';
import type { UseAlertDialogProps, UseAlertDialogReturn } from './AlertDialog.types';

export function useAlertDialog(props: UseAlertDialogProps): UseAlertDialogReturn {
    const { open, defaultOpen = false, onOpenChange } = props;
    const { value: isOpen, setValue: setIsOpen } = useControllable({ value: open, defaultValue: defaultOpen, onChange: onOpenChange });
    const openDialog = useCallback(() => setIsOpen(true), [setIsOpen]);
    const closeDialog = useCallback(() => setIsOpen(false), [setIsOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDialog(); };
        document.addEventListener('keydown', handle);
        return () => document.removeEventListener('keydown', handle);
    }, [isOpen, closeDialog]);

    return {
        isOpen, openDialog, closeDialog,
        triggerProps: { type: 'button' as const, onClick: openDialog },
        overlayProps: { 'aria-hidden': true as const, onClick: closeDialog },
        contentProps: { role: 'alertdialog' as const, 'aria-modal': true as const },
    };
}
