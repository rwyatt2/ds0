import { forwardRef } from 'react';

import type { RatingProps } from './Rating.types';
import { useRating } from './useRating';

/**
 * Headless Rating primitive.
 * Provides behavior, keyboard interactions, and ARIA attributes.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <RatingPrimitive value={3} onChange={(v) => setValue(v)} />
 * ```
 */
const RatingPrimitive = forwardRef<HTMLDivElement, RatingProps>(
    (
        {
            value,
            maxValue = 5,
            onChange,
            isDisabled,
            isReadonly,
            allowHalf,
            ...rest
        },
        ref,
    ) => {
        const { ratingProps, getStarProps, hoverValue, currentValue } = useRating({
            value,
            maxValue,
            onChange,
            isDisabled,
            isReadonly,
            allowHalf,
        });

        return (
            <div ref={ref} {...rest} {...ratingProps}>
                {Array.from({ length: maxValue }, (_, i) => {
                    const starProps = getStarProps(i);
                    const displayValue = hoverValue > -1 ? hoverValue : currentValue;
                    const isFilled = displayValue >= i + 1;

                    return (
                        <span key={i} {...starProps}>
                            {isFilled ? '★' : '☆'}
                        </span>
                    );
                })}
            </div>
        );
    },
);

RatingPrimitive.displayName = 'RatingPrimitive';

export { RatingPrimitive };
