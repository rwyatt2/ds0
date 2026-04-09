import React, { forwardRef } from 'react';
import { View, type ViewProps } from 'react-native';
import { styled } from 'nativewind';

import { useStatusDot } from '@ds0/primitives';
import type { StyledStatusDotProps } from '@ds0/primitives';

const StyledView = styled(View);

/**
 * React Native StatusDot component.
 * Uses NativeWind for styling consistency with the web version.
 *
 * @example
 * ```tsx
 * <StatusDot variant="online" label="Online" />
 * <StatusDot variant="busy" pulse label="In a meeting" />
 * ```
 */
const StatusDot = forwardRef<React.ElementRef<typeof View>, StyledStatusDotProps>(
    ({ variant = 'neutral', size = 'md', label, ...props }, ref) => {
        const { statusDotProps } = useStatusDot({ variant, label });

        const sizeClasses = {
            sm: 'h-2 w-2',
            md: 'h-3 w-3',
            lg: 'h-4 w-4',
        };

        const variantClasses = {
            online: 'bg-emerald-500',
            offline: 'bg-gray-400',
            busy: 'bg-red-500',
            away: 'bg-amber-500',
            error: 'bg-red-500',
            warning: 'bg-amber-500',
            neutral: 'bg-gray-500',
        };

        return (
            <StyledView
                ref={ref}
                className={`rounded-full ${sizeClasses[size]} ${variantClasses[variant]}`}
                accessibilityRole="text"
                accessibilityLabel={statusDotProps['aria-label']}
                {...props}
            />
        );
    },
);

StatusDot.displayName = 'StatusDot';

export { StatusDot };
