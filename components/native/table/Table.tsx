import React, { forwardRef } from 'react';
import { View, type ViewProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

const Table = forwardRef<React.ElementRef<typeof View>, ViewProps & { children: React.ReactNode }>(
    ({ children, ...props }, ref) => (
        <StyledView ref={ref} {...props}>{children}</StyledView>
    ),
);

Table.displayName = 'Table';
export { Table };
