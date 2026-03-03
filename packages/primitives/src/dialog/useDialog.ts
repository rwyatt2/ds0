import { useCallback, useId } from 'react';

import { useControllable } from '../utils/useControllable';
import type { UseDialogProps, UseDialogReturn } from './Dialog.types';

/**
 * Hook that encapsulates Dialog behavior.
 * Manages open/close state (controlled/uncontrolled) and
 * generates props for trigger, content, overlay, title, and description.
 *
 * Focus trap, scroll lock, and escape key are handled at the component level.
 *
 * @param props - Configuration options
 * @returns Open state, actions, and props for all sub-elements
 *
 * @example
 * ```tsx
 * const { isOpen, triggerProps, contentProps, overlayProps } = useDialog({
 *   onOpenChange: (open) => console.log(open),
 * });
 * ```
 */
export function useDialog(props: UseDialogProps = {}): UseDialogReturn {
    const { open: controlledOpen, defaultOpen = false, onOpenChange } = props;

    const { value: isOpen, setValue: setIsOpen } = useControllable<boolean>({
        value: controlledOpen,
        defaultValue: defaultOpen,
        onChange: onOpenChange,
    });

    const baseId = useId();
    const ids = {
        content: `${baseId}-dialog-content`,
        title: `${baseId}-dialog-title`,
        description: `${baseId}-dialog-description`,
    };

    const open = useCallback(() => setIsOpen(true), [setIsOpen]);
    const close = useCallback(() => setIsOpen(false), [setIsOpen]);
    const toggle = useCallback(() => setIsOpen(!isOpen), [setIsOpen, isOpen]);

    return {
        isOpen,
        open,
        close,
        toggle,
        triggerProps: {
            type: 'button',
            'aria-haspopup': 'dialog',
            'aria-expanded': isOpen,
            'aria-controls': isOpen ? ids.content : undefined,
            onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                open();
            },
        },
        contentProps: {
            id: ids.content,
            role: 'dialog',
            'aria-modal': true,
            'aria-labelledby': ids.title,
            'aria-describedby': ids.description,
        } as React.HTMLAttributes<HTMLDivElement> & { 'data-state': string },
        titleProps: {
            id: ids.title,
        },
        descriptionProps: {
            id: ids.description,
        },
        overlayProps: {
            'aria-hidden': true,
        } as React.HTMLAttributes<HTMLDivElement> & { 'data-state': string },
        ids,
    };
}
