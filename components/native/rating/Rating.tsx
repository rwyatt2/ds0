import React, { forwardRef } from 'react';
import { Pressable, View, Text } from 'react-native';
import { styled } from 'nativewind';

import { useRating } from '@ds0/primitives';
import type { StyledRatingProps } from '@ds0/primitives';

const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

/**
 * React Native Rating component.
 * Uses NativeWind for styling consistency with the web version.
 *
 * @example
 * ```tsx
 * <Rating value={3} onChange={(v) => setValue(v)} />
 * ```
 */
const Rating = forwardRef<React.ElementRef<typeof View>, StyledRatingProps>(
    ({ value = 0, maxValue = 5, onChange, isDisabled, isReadonly, size = 'md', ...props }, ref) => {
        const { ratingProps, getStarProps, currentValue } = useRating({
            value,
            maxValue,
            onChange,
            isDisabled,
            isReadonly,
        });

        const textSize = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' };

        return (
            <StyledView
                ref={ref}
                className="flex-row items-center gap-1"
                accessibilityRole="radiogroup"
                accessibilityLabel={`Rating: ${currentValue} out of ${maxValue} stars`}
                {...props}
            >
                {Array.from({ length: maxValue }, (_, i) => {
                    const isFilled = currentValue >= i + 1;
                    return (
                        <StyledPressable
                            key={i}
                            onPress={() => {
                                if (!isDisabled && !isReadonly) onChange?.(i + 1);
                            }}
                            disabled={isDisabled}
                            accessibilityRole="radio"
                            accessibilityState={{ checked: isFilled, disabled: isDisabled }}
                        >
                            <StyledText className={`${textSize[size]} ${isFilled ? 'text-amber-500' : 'text-gray-300'}`}>
                                {isFilled ? '★' : '☆'}
                            </StyledText>
                        </StyledPressable>
                    );
                })}
            </StyledView>
        );
    },
);

Rating.displayName = 'Rating';

export { Rating };
