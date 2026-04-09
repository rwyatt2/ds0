import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
const Menubar = ({ children }: { children: React.ReactNode }) => <View style={s.bar}>{children}</View>;
const MenubarTrigger = ({ children }: { children: React.ReactNode }) => <Pressable style={s.trigger} accessibilityRole="button">{typeof children === 'string' ? <Text style={s.text}>{children}</Text> : children}</Pressable>;
const s = StyleSheet.create({ bar: { flexDirection: 'row', alignItems: 'center', gap: 4, height: 40, borderRadius: 6, borderWidth: 1, borderColor: '#e2e8f0', padding: 4, backgroundColor: '#fff' }, trigger: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 }, text: { fontSize: 14, fontWeight: '500' } });
export { Menubar, MenubarTrigger };
