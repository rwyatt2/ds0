import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const ContextMenu = ({ children }: { children: React.ReactNode }): React.ReactElement => <View>{children}</View>;
const ContextMenuTrigger = ({ children }: { children: React.ReactNode }): React.ReactElement => <View>{typeof children === 'string' ? <Text>{children}</Text> : children}</View>;
const ContextMenuContent = ({ children }: { children: React.ReactNode }): React.ReactElement | null => null;
const ContextMenuItem = ({ children }: { children: React.ReactNode }): React.ReactElement => <View style={s.item}>{typeof children === 'string' ? <Text>{children}</Text> : children}</View>;
const s = StyleSheet.create({ item: { paddingHorizontal: 8, paddingVertical: 6 } });
export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem };
