import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

interface ToastProps {
    title?: string;
    description?: string;
    onDismiss?: () => void;
}

const Toast = ({ title, description, onDismiss }: ToastProps) => (
    <StyledView className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <StyledView className="flex-1">
            {title && <StyledText className="text-sm font-semibold">{title}</StyledText>}
            {description && <StyledText className="text-sm text-gray-500">{description}</StyledText>}
        </StyledView>
        {onDismiss && (
            <StyledPressable onPress={onDismiss} accessibilityRole="button" accessibilityLabel="Close notification">
                <StyledText>✕</StyledText>
            </StyledPressable>
        )}
    </StyledView>
);

Toast.displayName = 'Toast';

export { Toast };
