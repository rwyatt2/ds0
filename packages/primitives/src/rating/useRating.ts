import { useCallback, useState } from 'react';

import type { UseRatingProps, UseRatingReturn } from './Rating.types';

/**
 * Hook that encapsulates Rating behavior.
 * Manages value state, hover preview, keyboard interactions, and ARIA attributes.
 *
 * @param props - Configuration options
 * @returns Props to spread onto elements and state values
 *
 * @example
 * ```tsx
 * const { ratingProps, getStarProps, hoverValue, currentValue } = useRating({
 *   value: 3,
 *   onChange: (v) => console.log(v),
 * });
 * ```
 */
export function useRating(props: UseRatingProps = {}): UseRatingReturn {
    const {
        value = 0,
        maxValue = 5,
        onChange,
        isDisabled = false,
        isReadonly = false,
        allowHalf = false,
    } = props;

    const [hoverValue, setHoverValue] = useState(-1);
    const isInteractive = !isDisabled && !isReadonly;

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (!isInteractive) return;

            const step = allowHalf ? 0.5 : 1;
            let newValue = value;

            switch (event.key) {
                case 'ArrowRight':
                case 'ArrowUp':
                    event.preventDefault();
                    newValue = Math.min(value + step, maxValue);
                    break;
                case 'ArrowLeft':
                case 'ArrowDown':
                    event.preventDefault();
                    newValue = Math.max(value - step, 0);
                    break;
                case 'Home':
                    event.preventDefault();
                    newValue = allowHalf ? 0.5 : 1;
                    break;
                case 'End':
                    event.preventDefault();
                    newValue = maxValue;
                    break;
                default:
                    return;
            }

            if (newValue !== value) {
                onChange?.(newValue);
            }
        },
        [isInteractive, value, maxValue, allowHalf, onChange],
    );

    const handleMouseLeave = useCallback(() => {
        if (isInteractive) {
            setHoverValue(-1);
        }
    }, [isInteractive]);

    const getStarProps = useCallback(
        (index: number): React.HTMLAttributes<HTMLSpanElement> & { 'aria-checked'?: boolean } => {
            const starValue = index + 1;

            return {
                role: 'radio' as const,
                'aria-checked': value >= starValue,
                'aria-label': `${starValue} star${starValue !== 1 ? 's' : ''}`,
                tabIndex: -1,
                onClick: isInteractive
                    ? (event: React.MouseEvent) => {
                        event.preventDefault();
                        onChange?.(starValue);
                    }
                    : undefined,
                onMouseEnter: isInteractive
                    ? () => setHoverValue(starValue)
                    : undefined,
                style: { cursor: isInteractive ? 'pointer' : 'default' },
            };
        },
        [value, isInteractive, onChange],
    );

    return {
        ratingProps: {
            role: 'radiogroup',
            'aria-label': `Rating: ${value} out of ${maxValue} stars`,
            'aria-disabled': isDisabled || undefined,
            tabIndex: isDisabled ? -1 : 0,
            onKeyDown: handleKeyDown,
            onMouseLeave: handleMouseLeave,
        },
        getStarProps,
        hoverValue,
        currentValue: value,
    };
}
