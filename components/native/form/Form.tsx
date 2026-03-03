import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const Form = forwardRef<React.ElementRef<typeof View>, { children: React.ReactNode; onSubmit?: () => void }>(
    ({ children, ...props }, ref) => (
        <StyledView ref={ref} className="gap-4" {...props}>
            {children}
        </StyledView>
    ),
);

Form.displayName = 'Form';

export { Form };
