import React, { forwardRef } from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

/**
 * React Native Tabs component.
 * Uses NativeWind for styling consistency with the web version.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = forwardRef<React.ElementRef<typeof View>, ViewProps & { defaultValue?: string; children: React.ReactNode }>(
    ({ defaultValue, children, ...props }, ref) => {
        return (
            <StyledView ref={ref} {...props}>
                {children}
            </StyledView>
        );
    },
);

Tabs.displayName = 'Tabs';

export { Tabs };
