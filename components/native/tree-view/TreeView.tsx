import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
const StyledView = styled(View); const StyledText = styled(Text); const StyledTouchable = styled(TouchableOpacity);
const TreeView = forwardRef<React.ElementRef<typeof View>, { data: { key: string; label: string }[] }>(
    ({ data, ...props }, ref) => (
        <StyledView ref={ref} accessibilityRole="list" {...props}>
            {data.map((node) => (
                <StyledTouchable key={node.key} className="py-1 px-2"><StyledText className="text-sm">{node.label}</StyledText></StyledTouchable>
            ))}
        </StyledView>
    ),
);
TreeView.displayName = 'TreeView';
export { TreeView };
