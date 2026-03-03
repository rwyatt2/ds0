import React, { forwardRef } from 'react';
import { View, type ViewProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

const ToggleGroup = forwardRef<React.ElementRef<typeof View>, ViewProps & { children: React.ReactNode }>(
    ({ children, ...props }, ref) => (
        <StyledView ref={ref} accessibilityRole="radiogroup" className="flex-row" {...props}>
            {children}
        </StyledView>
    ),
);

ToggleGroup.displayName = 'ToggleGroup';
export { ToggleGroup };
