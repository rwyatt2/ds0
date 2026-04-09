import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
const NavigationMenu = ({ children }: { children: React.ReactNode }) => <View style={s.container}>{children}</View>;
const NavigationMenuLink = ({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) => <Pressable onPress={onPress} style={s.link} accessibilityRole="link">{typeof children === 'string' ? <Text>{children}</Text> : children}</Pressable>;
const s = StyleSheet.create({ container: { flexDirection: 'row', alignItems: 'center' }, link: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 } });
export { NavigationMenu, NavigationMenuLink };
