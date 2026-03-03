import React from 'react';
import { View, StyleSheet } from 'react-native';
interface NativeContainerProps { children: React.ReactNode; padding?: boolean; }
const Container = ({ children, padding = true }: NativeContainerProps) => (
    <View style={[styles.base, padding && styles.padding]}>{children}</View>
);
const styles = StyleSheet.create({ base: { width: '100%', alignSelf: 'center' }, padding: { paddingHorizontal: 16 } });
export { Container }; export type { NativeContainerProps as ContainerProps };
