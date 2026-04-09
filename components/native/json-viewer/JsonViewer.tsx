import React, { forwardRef } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { styled } from 'nativewind';
import type { StyledJsonViewerProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledScrollView = styled(ScrollView);

const JsonViewer = forwardRef<React.ElementRef<typeof View>, StyledJsonViewerProps>(
    ({ data, ...props }, ref) => (
        <StyledScrollView ref={ref} className="border rounded-lg p-3 bg-gray-50" {...props}>
            <StyledText className="font-mono text-sm">{JSON.stringify(data, null, 2)}</StyledText>
        </StyledScrollView>
    ),
);
JsonViewer.displayName = 'JsonViewer';
export { JsonViewer };
