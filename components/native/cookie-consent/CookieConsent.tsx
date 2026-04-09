import React, { forwardRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';
import type { StyledCookieConsentProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledPressable = styled(Pressable);
const CookieConsent = forwardRef<React.ElementRef<typeof View>, StyledCookieConsentProps>(({ onAccept, onDecline, message, ...props }, ref) => (
    <StyledView ref={ref} className="absolute bottom-0 left-0 right-0 p-4" {...props}><StyledView className="rounded-lg border bg-white p-4 shadow-lg"><StyledText className="text-sm text-gray-600 mb-3">{message || 'We use cookies.'}</StyledText><StyledView className="flex-row gap-2"><StyledPressable onPress={onDecline} className="border rounded-md px-3 py-1.5"><StyledText className="text-sm">Decline</StyledText></StyledPressable><StyledPressable onPress={onAccept} className="bg-blue-600 rounded-md px-3 py-1.5"><StyledText className="text-white text-sm font-medium">Accept</StyledText></StyledPressable></StyledView></StyledView></StyledView>
));
CookieConsent.displayName = 'CookieConsent';
export { CookieConsent };
