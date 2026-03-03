import { useCallback, useId } from 'react';
import { useControllable } from '../utils/useControllable';
import type { UseTooltipProps, UseTooltipReturn } from './Tooltip.types';

export function useTooltip(props: UseTooltipProps = {}): UseTooltipReturn {
    const { open: controlledOpen, defaultOpen = false, onOpenChange } = props;
    const { value: isOpen, setValue: setIsOpen } = useControllable<boolean>({
        value: controlledOpen, defaultValue: defaultOpen, onChange: onOpenChange,
    });
    const baseId = useId();
    const ids = { trigger: `${baseId}-tooltip-trigger`, content: `${baseId}-tooltip-content` };
    const open = useCallback(() => setIsOpen(true), [setIsOpen]);
    const close = useCallback(() => setIsOpen(false), [setIsOpen]);
    return { isOpen, open, close, ids };
}
