import React, { forwardRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';

import type { StyledBannerProps } from '@ds0/primitives';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

/**
 * React Native Banner component.
 *
 * @example
 * ```tsx
 * <Banner variant="info">New version available!</Banner>
 * ```
 */
const Banner = forwardRef<React.ElementRef<typeof View>, StyledBannerProps>(
    ({ variant = 'info', size = 'md', isDismissible, onDismiss, children, ...props }, ref) => {
        const [dismissed, setDismissed] = useState(false);

        if (dismissed) return null;

        const variantClasses = {
            info: 'bg-blue-600',
            warning: 'bg-amber-500',
            error: 'bg-red-600',
            success: 'bg-emerald-600',
            promotional: 'bg-violet-600',
        };

        const sizeClasses = {
            sm: 'py-2 px-4',
            md: 'py-3 px-4',
            lg: 'py-4 px-4',
        };

        return (
            <StyledView
                ref={ref}
                className={`flex-row items-center justify-center gap-3 ${variantClasses[variant]} ${sizeClasses[size]}`}
                accessibilityRole="alert"
                {...props}
            >
                <StyledText className="text-white font-medium text-sm flex-1 text-center">
                    {children}
                </StyledText>
                {isDismissible && (
                    <StyledPressable
                        onPress={() => { setDismissed(true); onDismiss?.(); }}
                        accessibilityLabel="Dismiss banner"
                        className="p-1"
                    >
                        <StyledText className="text-white opacity-70">✕</StyledText>
                    </StyledPressable>
                )}
            </StyledView>
        );
    },
);

Banner.displayName = 'Banner';

export { Banner };
