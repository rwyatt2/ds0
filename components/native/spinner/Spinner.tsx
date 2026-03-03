import React from 'react';
import { ActivityIndicator, View } from 'react-native';
interface NativeSpinnerProps { size?: 'sm' | 'md' | 'lg'; label?: string; }
const sizeMap = { sm: 'small' as const, md: 'large' as const, lg: 'large' as const };
const Spinner = ({ size = 'md', label = 'Loading' }: NativeSpinnerProps) => (
    <View accessibilityRole="progressbar" accessibilityLabel={label}><ActivityIndicator size={sizeMap[size]} /></View>
);
export { Spinner }; export type { NativeSpinnerProps as SpinnerProps };
