import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useRating } from '@ds0/primitives';
import type { StyledRatingProps } from '@ds0/primitives';

const ratingVariants = cva(
    'inline-flex items-center gap-0.5',
    {
        variants: {
            size: {
                sm: '',
                md: '',
                lg: '',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    },
);

const starSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

type _RatingVariants = VariantProps<typeof ratingVariants>;

/**
 * Star icon component for the Rating.
 */
const StarIcon = ({ filled, className }: { filled: boolean; className?: string }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
    </svg>
);

/**
 * Styled Rating component.
 * A star-based rating input for collecting user feedback.
 *
 * @example
 * ```tsx
 * <Rating value={3} onChange={(v) => setValue(v)} />
 * <Rating value={4.5} isReadonly allowHalf />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/rating | Documentation}
 */
const Rating = forwardRef<HTMLDivElement, StyledRatingProps>(
    (
        {
            className,
            size = 'md',
            value,
            maxValue = 5,
            onChange,
            isDisabled,
            isReadonly,
            allowHalf,
            ...props
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

        const displayValue = hoverValue > -1 ? hoverValue : currentValue;

        return (
            <div
                ref={ref}
                className={cn(
                    ratingVariants({ size }),
                    isDisabled && 'opacity-50 pointer-events-none',
                    className,
                )}
                {...props}
                {...ratingProps}
            >
                {Array.from({ length: maxValue }, (_, i) => {
                    const starProps = getStarProps(i);
                    const isFilled = displayValue >= i + 1;

                    return (
                        <span
                            key={i}
                            {...starProps}
                            className={cn(
                                starSizeClasses[size],
                                'transition-colors',
                                isFilled ? 'text-amber-500' : 'text-muted-foreground/30',
                                !isDisabled && !isReadonly && 'hover:text-amber-400',
                            )}
                        >
                            <StarIcon filled={isFilled} className={starSizeClasses[size]} />
                        </span>
                    );
                })}
            </div>
        );
    },
);

Rating.displayName = 'Rating';

export { Rating, ratingVariants };
export type { StyledRatingProps as RatingProps };
