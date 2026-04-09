import React, { forwardRef } from 'react';
import { ScrollView, StyleSheet, type ScrollViewProps } from 'react-native';

interface NativeScrollAreaProps extends ScrollViewProps {
    children: React.ReactNode;
}

const ScrollArea = forwardRef<ScrollView, NativeScrollAreaProps>(
    ({ children, style, ...rest }, ref) => (
        <ScrollView ref={ref} style={[styles.base, style]} showsVerticalScrollIndicator showsHorizontalScrollIndicator={false} {...rest}>
            {children}
        </ScrollView>
    ),
);
ScrollArea.displayName = 'ScrollArea';

const styles = StyleSheet.create({ base: { flex: 1 } });

export { ScrollArea };
export type { NativeScrollAreaProps as ScrollAreaProps };
