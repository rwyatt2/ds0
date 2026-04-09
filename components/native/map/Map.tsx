import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import type { StyledMapProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text);
const Map = forwardRef<React.ElementRef<typeof View>, StyledMapProps>(({ center, markers = [], height = 300, ...props }, ref) => (
    <StyledView ref={ref} className="rounded-lg bg-slate-100 border items-center justify-center" style={{ height }} accessibilityRole="image" accessibilityLabel="Map" {...props}>
        <StyledText className="text-sm text-slate-400">Map Container</StyledText>
        <StyledText className="text-xs text-slate-300">{markers.length} markers</StyledText>
    </StyledView>
));
Map.displayName = 'Map';
export { Map };
