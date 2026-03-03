import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
interface NativeStackProps { direction?: 'vertical' | 'horizontal'; gap?: number; children: React.ReactNode; }
const Stack = ({ direction = 'vertical', gap = 16, children }: NativeStackProps) => (
    <View style={[styles.base, { flexDirection: direction === 'horizontal' ? 'row' : 'column', gap }]}>{children}</View>
);
const styles = StyleSheet.create({ base: {} });
export { Stack }; export type { NativeStackProps as StackProps };
