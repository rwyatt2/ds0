import React, { forwardRef } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';

interface SidebarNativeProps extends ViewProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const styles = StyleSheet.create({
  container: { flex: 0, width: 256, backgroundColor: '#fff', borderRightWidth: 1, borderRightColor: '#e5e7eb' },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  content: { flex: 1, padding: 8 },
  footer: { padding: 8, borderTopWidth: 1, borderTopColor: '#e5e7eb' },
});

const Sidebar = forwardRef<View, SidebarNativeProps>(({ children, header, footer, style, ...props }, ref) => (
  <View ref={ref} style={[styles.container, style]} accessibilityRole="menu" {...props}>
    {header && <View style={styles.header}>{header}</View>}
    <View style={styles.content}>{children}</View>
    {footer && <View style={styles.footer}>{footer}</View>}
  </View>
));

Sidebar.displayName = 'Sidebar';
export { Sidebar };
export type { SidebarNativeProps };
