import React, { forwardRef } from 'react';
import { Pressable, ActivityIndicator, StyleSheet } from 'react-native';
interface NativeIconButtonProps {
    icon: React.ReactNode;
    accessibilityLabel: string;
    variant?: 'primary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    isDisabled?: boolean;
    onPress?: () => void;
}
const sizeMap = { sm: 32, md: 40, lg: 48 };
const IconButton = forwardRef<any, NativeIconButtonProps>(
    ({ icon, accessibilityLabel, size = 'md', isLoading, isDisabled, onPress, ...rest }, ref) => (
        <Pressable ref={ref} accessibilityRole="button" accessibilityLabel={accessibilityLabel}
            accessibilityState={{ disabled: isDisabled }} disabled={isDisabled} onPress={onPress}
            style={[styles.base, { width: sizeMap[size], height: sizeMap[size] }]} {...rest}>
            {isLoading ? <ActivityIndicator size="small" /> : icon}
        </Pressable>
    ),
);
IconButton.displayName = 'IconButton';
const styles = StyleSheet.create({ base: { alignItems: 'center', justifyContent: 'center', borderRadius: 6 } });
export { IconButton };
export type { NativeIconButtonProps as IconButtonProps };
