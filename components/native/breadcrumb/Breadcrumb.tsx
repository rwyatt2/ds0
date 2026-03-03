import React, { forwardRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const Breadcrumb = forwardRef<React.ElementRef<typeof View>, { children: React.ReactNode }>(
    ({ children, ...props }, ref) => (
        <StyledView ref={ref} accessibilityRole="header" className="flex-row flex-wrap items-center gap-1.5" {...props}>
            {children}
        </StyledView>
    ),
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
