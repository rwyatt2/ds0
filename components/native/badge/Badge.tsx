import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
interface NativeBadgeProps { variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'outline'; children: React.ReactNode; }
const Badge = ({ children, ...rest }: NativeBadgeProps) => (<View style={styles.badge} {...rest}><Text style={styles.text}>{children}</Text></View>);
const styles = StyleSheet.create({ badge: { borderRadius: 9999, paddingHorizontal: 10, paddingVertical: 2, backgroundColor: '#2563eb' }, text: { fontSize: 12, fontWeight: '500', color: '#fff' } });
export { Badge };
export type { NativeBadgeProps as BadgeProps };
