import React, { forwardRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styled } from 'nativewind';
const StyledView = styled(View); const StyledText = styled(Text); const StyledInput = styled(TextInput);
const DatePicker = forwardRef<React.ElementRef<typeof View>, { value?: string; placeholder?: string }>(
    ({ value, placeholder = 'Select date', ...props }, ref) => (
        <StyledView ref={ref} className="flex-row items-center border border-border rounded-md" {...props}>
            <StyledInput className="flex-1 px-3 py-2 text-sm" value={value} placeholder={placeholder} editable={false} accessibilityLabel="Date" />
            <StyledText className="px-2">📅</StyledText>
        </StyledView>
    ),
);
DatePicker.displayName = 'DatePicker';
export { DatePicker };
