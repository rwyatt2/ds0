import React, { forwardRef, Children } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';

interface MasonryGridNativeProps extends ViewProps { columns?: number; gap?: number; children: React.ReactNode; }

const MasonryGrid = forwardRef<View, MasonryGridNativeProps>(({ columns = 2, gap = 8, children, style, ...props }, ref) => {
  const cols: React.ReactNode[][] = Array.from({ length: columns }, () => []);
  Children.forEach(children, (child, i) => { cols[i % columns].push(child); });
  return (
    <View ref={ref} style={[{ flexDirection: 'row', gap }, style]} accessibilityRole="list" {...props}>
      {cols.map((col, ci) => <View key={ci} style={{ flex: 1, gap }}>{col}</View>)}
    </View>
  );
});
MasonryGrid.displayName = 'MasonryGrid';
export { MasonryGrid }; export type { MasonryGridNativeProps };
