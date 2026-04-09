import React, { forwardRef } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';

interface SplitterGroupNativeProps extends ViewProps { direction?: 'horizontal' | 'vertical'; children: React.ReactNode; }
interface SplitterPanelNativeProps extends ViewProps { defaultSize?: number; children: React.ReactNode; }
interface SplitterHandleNativeProps extends ViewProps {}

const styles = StyleSheet.create({
  horizontal: { flexDirection: 'row', flex: 1 },
  vertical: { flexDirection: 'column', flex: 1 },
  handle: { width: 4, backgroundColor: '#e5e7eb' },
  handleVertical: { height: 4, backgroundColor: '#e5e7eb' },
});

const SplitterGroup = forwardRef<View, SplitterGroupNativeProps>(({ direction = 'horizontal', children, style, ...props }, ref) => (
  <View ref={ref} style={[direction === 'horizontal' ? styles.horizontal : styles.vertical, style]} {...props}>{children}</View>
));
SplitterGroup.displayName = 'SplitterGroup';

const SplitterPanel = forwardRef<View, SplitterPanelNativeProps>(({ defaultSize, children, style, ...props }, ref) => (
  <View ref={ref} style={[{ flex: defaultSize || 1 }, style]} {...props}>{children}</View>
));
SplitterPanel.displayName = 'SplitterPanel';

const SplitterHandle = forwardRef<View, SplitterHandleNativeProps>(({ style, ...props }, ref) => (
  <View ref={ref} style={[styles.handle, style]} accessibilityRole="adjustable" {...props} />
));
SplitterHandle.displayName = 'SplitterHandle';

export { SplitterGroup, SplitterPanel, SplitterHandle };
export type { SplitterGroupNativeProps, SplitterPanelNativeProps, SplitterHandleNativeProps };
