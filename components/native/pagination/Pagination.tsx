import React, { forwardRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const Pagination = forwardRef<React.ElementRef<typeof View>, { children: React.ReactNode }>(
    ({ children, ...props }, ref) => (
        <StyledView ref={ref} className="flex-row items-center gap-1" accessibilityRole="menu" {...props}>
            {children}
        </StyledView>
    ),
);

Pagination.displayName = 'Pagination';

export { Pagination };
