import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
const StyledView = styled(View); const StyledText = styled(Text); const StyledTouchable = styled(TouchableOpacity);
const FileUpload = forwardRef<React.ElementRef<typeof View>, { onPress?: () => void }>(
    ({ onPress, ...props }, ref) => (
        <StyledView ref={ref} {...props}><StyledTouchable onPress={onPress} className="border-2 border-dashed border-border rounded-lg py-8 items-center"><StyledText className="text-2xl mb-2">⬆</StyledText><StyledText className="text-sm text-muted-foreground">Tap to select files</StyledText></StyledTouchable></StyledView>
    ),
);
FileUpload.displayName = 'FileUpload';
export { FileUpload };
