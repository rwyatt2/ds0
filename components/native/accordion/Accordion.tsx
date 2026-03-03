import React, { forwardRef } from 'react';
import { View, type ViewProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

const Accordion = forwardRef<React.ElementRef<typeof View>, ViewProps & { children: React.ReactNode }>(
    ({ children, ...props }, ref) => (
        <StyledView ref={ref} {...props}>{children}</StyledView>
    ),
);

Accordion.displayName = 'Accordion';
export { Accordion };
