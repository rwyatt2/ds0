import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
const StyledView = styled(View); const StyledText = styled(Text);
const Timeline = forwardRef<React.ElementRef<typeof View>, { items: { title: string; time?: string }[] }>(
    ({ items, ...props }, ref) => (
        <StyledView ref={ref} className="flex-col gap-4" accessibilityRole="list" {...props}>
            {items.map((item, i) => (
                <StyledView key={i} className="flex-row gap-3 items-start">
                    <StyledView className="h-3 w-3 rounded-full bg-primary mt-1" />
                    <StyledView className="flex-col">
                        <StyledText className="text-sm font-medium">{item.title}</StyledText>
                        {item.time && <StyledText className="text-xs text-muted-foreground">{item.time}</StyledText>}
                    </StyledView>
                </StyledView>
            ))}
        </StyledView>
    ),
);
Timeline.displayName = 'Timeline';
export { Timeline };
