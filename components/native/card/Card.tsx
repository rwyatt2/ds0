import React, { forwardRef } from 'react';
import { View, Text, type ViewProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const Card = forwardRef<React.ElementRef<typeof View>, ViewProps & { children: React.ReactNode }>(
    ({ children, ...props }, ref) => (
        <StyledView ref={ref} className="rounded-lg border bg-card p-4" {...props}>
            {children}
        </StyledView>
    ),
);

Card.displayName = 'Card';

export { Card };
