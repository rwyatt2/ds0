import React, { forwardRef } from 'react';
import { View, Image, Text, StyleSheet, type ViewProps } from 'react-native';

interface NativeAvatarProps extends ViewProps {
    src?: string; alt: string; fallback?: string; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; shape?: 'circle' | 'square';
}
const sizeMap = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

const Avatar = forwardRef<View, NativeAvatarProps>(
    ({ src, alt, fallback, size = 'md', shape = 'circle', ...rest }, ref) => {
        const sz = sizeMap[size];
        const radius = shape === 'circle' ? sz / 2 : 6;
        const initials = (fallback ?? alt).slice(0, 2).toUpperCase();
        return (
            <View ref={ref} style={[styles.container, { width: sz, height: sz, borderRadius: radius }]} accessibilityLabel={alt} {...rest}>
                {src ? <Image source={{ uri: src }} style={[styles.image, { borderRadius: radius }]} accessibilityLabel={alt} /> : <Text style={styles.initials}>{initials}</Text>}
            </View>
        );
    },
);

Avatar.displayName = 'Avatar';
const styles = StyleSheet.create({ container: { backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, image: { width: '100%', height: '100%' }, initials: { fontWeight: '500', fontSize: 14 } });
export { Avatar };
export type { NativeAvatarProps as AvatarProps };
