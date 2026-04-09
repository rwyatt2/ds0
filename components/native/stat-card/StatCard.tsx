import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import type { StyledStatCardProps } from '@ds0/primitives';
const StyledView = styled(View);
const StyledText = styled(Text);

const StatCard = forwardRef<React.ElementRef<typeof View>, StyledStatCardProps>(
    ({ label, value, trend, trendLabel, ...props }, ref) => {
        const dir = trend === undefined || trend === 0 ? 'neutral' : trend > 0 ? 'up' : 'down';
        return (
            <StyledView ref={ref} className="rounded-xl border p-4 bg-white" accessibilityRole="summary" accessibilityLabel={`${label}: ${value}`} {...props}>
                <StyledText className="text-sm text-gray-500">{label}</StyledText>
                <StyledText className="text-2xl font-bold mt-1">{value}</StyledText>
                {trend !== undefined && <StyledText className={`text-xs mt-1 ${dir === 'up' ? 'text-emerald-600' : dir === 'down' ? 'text-red-600' : 'text-gray-500'}`}>{dir === 'up' ? '↑' : '↓'} {Math.abs(trend)}%</StyledText>}
                {trendLabel && <StyledText className="text-xs text-gray-400 mt-0.5">{trendLabel}</StyledText>}
            </StyledView>
        );
    },
);
StatCard.displayName = 'StatCard';
export { StatCard };
