import React from 'react';
import { View, StyleSheet } from 'react-native';
interface NativeDividerProps { orientation?: 'horizontal' | 'vertical'; }
const Divider = ({ orientation = 'horizontal' }: NativeDividerProps) => (
    <View style={[styles.base, orientation === 'vertical' ? styles.vertical : styles.horizontal]} accessibilityRole="none" />
);
const styles = StyleSheet.create({ base: { backgroundColor: '#e2e8f0' }, horizontal: { height: 1, width: '100%' }, vertical: { width: 1, height: '100%' } });
export { Divider }; export type { NativeDividerProps as DividerProps };
