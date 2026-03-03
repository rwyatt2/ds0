import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
interface NativeSkeletonProps { width?: number; height?: number; variant?: 'text' | 'circular' | 'rectangular'; }
const Skeleton = ({ width = 200, height = 16, variant = 'text' }: NativeSkeletonProps) => {
    const opacity = useRef(new Animated.Value(0.3)).current;
    useEffect(() => {
        Animated.loop(Animated.sequence([Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }), Animated.timing(opacity, { toValue: 0.3, duration: 1000, useNativeDriver: true })])).start();
    }, [opacity]);
    return <Animated.View style={[styles.base, { width, height, opacity }, variant === 'circular' && styles.circular]} accessibilityElementsHidden />;
};
const styles = StyleSheet.create({ base: { backgroundColor: '#e2e8f0', borderRadius: 4 }, circular: { borderRadius: 9999 } });
export { Skeleton }; export type { NativeSkeletonProps as SkeletonProps };
