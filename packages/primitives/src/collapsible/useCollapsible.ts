import { useCallback, useId } from 'react';

import { useControllable } from '../utils/useControllable';
import type { UseCollapsibleProps, UseCollapsibleReturn } from './Collapsible.types';

/**
 * Hook that encapsulates Collapsible behavior.
 * Manages open/close state, ARIA attributes, and keyboard interactions.
 *
 * @param props - Configuration options
 * @returns State and props to spread onto trigger and content elements
 *
 * @example
 * ```tsx
 * const { isOpen, triggerProps, contentProps } = useCollapsible({ defaultOpen: false });
 * ```
 */
export function useCollapsible(props: UseCollapsibleProps): UseCollapsibleReturn {
    const { open, defaultOpen = false, onOpenChange } = props;

    const { value: isOpen, setValue: setIsOpen } = useControllable({
        value: open,
        defaultValue: defaultOpen,
        onChange: onOpenChange,
    });

    const contentId = useId();

    const toggle = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    return {
        isOpen,
        toggle,
        triggerProps: {
            type: 'button' as const,
            'aria-expanded': isOpen,
            'aria-controls': contentId,
            onClick: toggle,
        },
        contentProps: {
            id: contentId,
            role: 'region' as const,
            hidden: !isOpen || undefined,
        },
        contentId,
    };
}
