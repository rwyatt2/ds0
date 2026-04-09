import React, { forwardRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styled } from 'nativewind';
const StyledView = styled(View); const StyledText = styled(Text); const StyledInput = styled(TextInput);
const RichText = forwardRef<React.ElementRef<typeof View>, { placeholder?: string; value?: string; onChangeText?: (text: string) => void }>(
    ({ placeholder = 'Start writing...', value, onChangeText, ...props }, ref) => (
        <StyledView ref={ref} className="border border-border rounded-md overflow-hidden" {...props}>
            <StyledView className="flex-row gap-2 px-2 py-1.5 border-b border-border bg-muted/30">
                <StyledText className="font-bold text-sm px-2">B</StyledText>
                <StyledText className="italic text-sm px-2">I</StyledText>
                <StyledText className="underline text-sm px-2">U</StyledText>
            </StyledView>
            <StyledInput className="min-h-[120px] px-4 py-3 text-sm" multiline textAlignVertical="top" placeholder={placeholder} value={value} onChangeText={onChangeText} accessibilityLabel="Rich text editor" />
        </StyledView>
    ),
);
RichText.displayName = 'RichText';
export { RichText };
