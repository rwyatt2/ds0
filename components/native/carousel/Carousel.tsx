import React, { forwardRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';
const StyledView = styled(View); const StyledScrollView = styled(ScrollView); const StyledText = styled(Text);
const Carousel = forwardRef<React.ElementRef<typeof View>, { children: React.ReactNode }>(
    ({ children, ...props }, ref) => (
        <StyledView ref={ref} {...props}><StyledScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>{children}</StyledScrollView></StyledView>
    ),
);
Carousel.displayName = 'Carousel';
export { Carousel };
