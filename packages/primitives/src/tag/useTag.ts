import { useCallback } from 'react';
import type { UseTagProps, UseTagReturn } from './Tag.types';

/**
 * Hook that encapsulates Tag behavior.
 * Manages remove button ARIA and keyboard interactions.
 *
 * @param props - Configuration options
 * @returns Props for the remove button
 */
export function useTag(props: UseTagProps): UseTagReturn {
    const { isRemovable = false, isDisabled = false, onRemove } = props;

    const handleRemove = useCallback(() => {
        if (isDisabled || !isRemovable) return;
        onRemove?.();
    }, [isDisabled, isRemovable, onRemove]);

    return {
        removeButtonProps: {
            type: 'button' as const,
            tabIndex: isRemovable && !isDisabled ? 0 : -1,
            'aria-label': 'Remove',
            'aria-hidden': !isRemovable || undefined,
            onClick: handleRemove,
        },
    };
}
