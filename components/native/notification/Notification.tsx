import React, { forwardRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';
import type { StyledNotificationProps } from '@ds0/primitives';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const Notification = forwardRef<React.ElementRef<typeof View>, StyledNotificationProps>(
    ({ variant = 'info', title, isDismissible, onDismiss, children, ...props }, ref) => {
        const [dismissed, setDismissed] = useState(false);
        if (dismissed) return null;
        const colors = { info: 'border-blue-200 bg-blue-50', success: 'border-emerald-200 bg-emerald-50', warning: 'border-amber-200 bg-amber-50', error: 'border-red-200 bg-red-50' };
        return (
            <StyledView ref={ref} className={`rounded-lg border p-4 ${colors[variant]}`} accessibilityRole="alert" {...props}>
                {title && <StyledText className="font-semibold mb-1">{title}</StyledText>}
                <StyledText className="text-sm">{children}</StyledText>
                {isDismissible && <StyledPressable onPress={() => { setDismissed(true); onDismiss?.(); }} accessibilityLabel="Dismiss notification" className="absolute right-3 top-3"><StyledText>✕</StyledText></StyledPressable>}
            </StyledView>
        );
    },
);
Notification.displayName = 'Notification';
export { Notification };
