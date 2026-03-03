import { useCallback, useId } from 'react';
import { useControllable } from '../utils/useControllable';
import type { UsePopoverProps, UsePopoverReturn } from './Popover.types';

export function usePopover(props: UsePopoverProps = {}): UsePopoverReturn {
    const { open: controlledOpen, defaultOpen = false, onOpenChange } = props;
    const { value: isOpen, setValue: setIsOpen } = useControllable<boolean>({
        value: controlledOpen, defaultValue: defaultOpen, onChange: onOpenChange,
    });
    const baseId = useId();
    const ids = { trigger: `${baseId}-popover-trigger`, content: `${baseId}-popover-content` };
    const open = useCallback(() => setIsOpen(true), [setIsOpen]);
    const close = useCallback(() => setIsOpen(false), [setIsOpen]);
    const toggle = useCallback(() => setIsOpen(!isOpen), [setIsOpen, isOpen]);
    return { isOpen, open, close, toggle, ids };
}
