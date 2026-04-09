import React, { forwardRef } from 'react';
import { View, Text, type ViewProps, StyleSheet, PanResponder } from 'react-native';

interface DockNativeProps extends ViewProps { children: React.ReactNode; }

const styles = StyleSheet.create({ container: { position: 'absolute', top: 20, left: 20, backgroundColor: '#fff', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 8, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden' }, handle: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', backgroundColor: '#f9fafb' }, content: { padding: 12 } });

const Dock = forwardRef<View, DockNativeProps>(({ children, style, ...props }, ref) => (
  <View ref={ref} style={[styles.container, style]} accessibilityRole="none" {...props}>
    <View style={styles.handle}><Text style={{ fontSize: 12, color: '#6b7280' }}>Panel</Text></View>
    <View style={styles.content}>{children}</View>
  </View>
));
Dock.displayName = 'Dock';
export { Dock }; export type { DockNativeProps };
