import React from 'react';
import { FlatList, type FlatListProps, type ViewStyle } from 'react-native';

type VirtualizedListNativeProps<T> = Omit<FlatListProps<T>, 'renderItem'> & { renderItem: (item: T, index: number) => React.ReactElement; };

function VirtualizedList<T>({ renderItem, ...props }: VirtualizedListNativeProps<T>) {
  return <FlatList {...props} renderItem={({ item, index }) => renderItem(item, index)} windowSize={5} />;
}
VirtualizedList.displayName = 'VirtualizedList';
export { VirtualizedList }; export type { VirtualizedListNativeProps };
