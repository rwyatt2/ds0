import React, { forwardRef } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';

interface AppShellNativeProps extends ViewProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  body: { flex: 1, flexDirection: 'row' },
  main: { flex: 1 },
});

const AppShell = forwardRef<View, AppShellNativeProps>(({ header, sidebar, footer, children, style, ...props }, ref) => (
  <View ref={ref} style={[styles.container, style]} {...props}>
    {header}
    <View style={styles.body}>
      {sidebar}
      <View style={styles.main}>{children}</View>
    </View>
    {footer}
  </View>
));

AppShell.displayName = 'AppShell';
export { AppShell };
export type { AppShellNativeProps };
