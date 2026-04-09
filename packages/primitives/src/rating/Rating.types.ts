import type React from 'react';

/**
 * Props for the useRating hook.
 */
export interface UseRatingProps {
    /** Current rating value */
    value?: number;
    /** Maximum rating value */
    maxValue?: number;
    /** Called when rating changes */
    onChange?: (value: number) => void;
    /** Whether the rating is disabled */
    isDisabled?: boolean;
    /** Whether the rating is read-only */
    isReadonly?: boolean;
    /** Whether half-star values are allowed */
    allowHalf?: boolean;
}

/**
 * Return value of the useRating hook.
 */
export interface UseRatingReturn {
    /** Props to spread onto the root element */
    ratingProps: React.HTMLAttributes<HTMLDivElement>;
    /** Props for each star element */
    getStarProps: (index: number) => React.HTMLAttributes<HTMLSpanElement> & { 'aria-checked'?: boolean };
    /** Current hover preview value (-1 if not hovering) */
    hoverValue: number;
    /** Current confirmed value */
    currentValue: number;
}

/**
 * Props for the Rating primitive component.
 */
export interface RatingProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    UseRatingProps {
}

/**
 * Props for the styled Rating component.
 */
export interface StyledRatingProps extends RatingProps {
    /** Size of the star icons */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}
