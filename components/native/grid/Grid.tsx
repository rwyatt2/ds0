import React from 'react';
import { View, StyleSheet } from 'react-native';
interface NativeGridProps { columns?: number; gap?: number; children: React.ReactNode; }
const Grid = ({ columns = 1, gap = 16, children }: NativeGridProps) => (
    <View style={[styles.base, { gap }]}>{React.Children.map(children, child => (<View style={{ width: `${100 / columns}%` }}>{child}</View>))}</View>
);
const styles = StyleSheet.create({ base: { flexDirection: 'row', flexWrap: 'wrap' } });
export { Grid }; export type { NativeGridProps as GridProps };
