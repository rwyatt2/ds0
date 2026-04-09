import React, { forwardRef } from 'react';
import { View, ActivityIndicator, Text, type ViewProps, StyleSheet } from 'react-native';

interface InfiniteScrollNativeProps extends ViewProps { hasMore: boolean; isLoading?: boolean; onEndReached?: () => void; children: React.ReactNode; }
const styles = StyleSheet.create({ loader: { padding: 16, alignItems: 'center' }, end: { padding: 16, alignItems: 'center' } });

const InfiniteScroll = forwardRef<View, InfiniteScrollNativeProps>(({ hasMore, isLoading, children, style, ...props }, ref) => (
  <View ref={ref} style={style} accessibilityRole="list" {...props}>
    {children}
    {isLoading && <View style={styles.loader}><ActivityIndicator /></View>}
    {!hasMore && <View style={styles.end}><Text style={{ color: '#6b7280', fontSize: 14 }}>No more items</Text></View>}
  </View>
));
InfiniteScroll.displayName = 'InfiniteScroll';
export { InfiniteScroll }; export type { InfiniteScrollNativeProps };
