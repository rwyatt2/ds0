import React, { forwardRef } from 'react';
import { View, type ViewProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

const Alert = forwardRef<React.ElementRef<typeof View>, ViewProps & { children: React.ReactNode }>(
    ({ children, ...props }, ref) => (
        <StyledView ref={ref} accessibilityRole="alert" className="rounded-lg border p-4" {...props}>
            {children}
        </StyledView>
    ),
);

Alert.displayName = 'Alert';
export { Alert };
