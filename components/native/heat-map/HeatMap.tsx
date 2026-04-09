import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import type { StyledHeatMapProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text);
const HeatMap = forwardRef<React.ElementRef<typeof View>, StyledHeatMapProps>(({ data, title, showValues = true, ...props }, ref) => {
    const max = Math.max(...data.flat(), 1);
    return (
        <StyledView ref={ref} className="rounded-lg border p-4 bg-white" accessibilityRole="image" accessibilityLabel="Heat map" {...props}>
            {title && <StyledText className="font-semibold text-sm mb-2">{title}</StyledText>}
            {data.map((row, ri) => (
                <StyledView key={ri} className="flex-row gap-1 mb-1">{row.map((v, ci) => (
                    <StyledView key={ci} className="w-8 h-8 rounded items-center justify-center" style={{ backgroundColor: `rgba(59,130,246,${v / max * 0.85 + 0.1})` }}>
                        {showValues && <StyledText className="text-[10px]" style={{ color: v / max > 0.5 ? 'white' : '#374151' }}>{v}</StyledText>}
                    </StyledView>
                ))}</StyledView>
            ))}
        </StyledView>
    );
});
HeatMap.displayName = 'HeatMap';
export { HeatMap };
