import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';

import { useProgress } from '@ds0/primitives';
import type { StyledProgressProps } from '@ds0/primitives';

const StyledView = styled(View);

/**
 * React Native Progress component.
 *
 * @example
 * ```tsx
 * <Progress value={42} max={100} label="Loading" />
 * ```
 */
const Progress = forwardRef<React.ElementRef<typeof View>, StyledProgressProps>(
    ({ value = 0, max = 100, size = 'md', variant = 'default', indeterminate = false, ...props }, ref) => {
        const { progressProps, percentage } = useProgress({ value, max, indeterminate });
        const height = size === 'sm' ? 'h-1' : size === 'lg' ? 'h-4' : 'h-2';

        return (
            <StyledView
                ref={ref}
                className={`w-full overflow-hidden rounded-full bg-gray-200 ${height}`}
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 0, max, now: indeterminate ? undefined : value }}
                {...props}
            >
                <StyledView
                    className={`h-full rounded-full bg-blue-500`}
                    style={indeterminate ? { width: '33%' } : { width: `${percentage}%` }}
                />
            </StyledView>
        );
    },
);

Progress.displayName = 'Progress';

export { Progress };
