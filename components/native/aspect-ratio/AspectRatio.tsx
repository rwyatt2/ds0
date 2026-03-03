import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';

interface NativeAspectRatioProps extends ViewProps { ratio?: number; children: React.ReactNode; }

const AspectRatio = forwardRef<View, NativeAspectRatioProps>(
    ({ ratio = 1, children, style, ...rest }, ref) => (
        <View ref={ref} style={[styles.container, { aspectRatio: ratio }, style]} {...rest}>{children}</View>
    ),
);

AspectRatio.displayName = 'AspectRatio';
const styles = StyleSheet.create({ container: { width: '100%', overflow: 'hidden' } });
export { AspectRatio };
export type { NativeAspectRatioProps as AspectRatioProps };
