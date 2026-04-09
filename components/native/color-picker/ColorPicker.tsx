import React, { forwardRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
const StyledView = styled(View); const StyledTouchable = styled(TouchableOpacity);
const ColorPicker = forwardRef<React.ElementRef<typeof View>, { value?: string; onChange?: (c: string) => void }>(
    ({ value = '#000000', ...props }, ref) => (
        <StyledView ref={ref} {...props}><StyledTouchable className="h-10 w-10 rounded-md border-2 border-border" style={{ backgroundColor: value }} accessibilityLabel={`Color: ${value}`} /></StyledView>
    ),
);
ColorPicker.displayName = 'ColorPicker';
export { ColorPicker };
