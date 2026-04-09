import React, { forwardRef, useEffect, useState } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import type { StyledConfettiProps } from '@ds0/primitives';

const { width, height } = Dimensions.get('window');
const COLORS = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const Confetti = forwardRef<React.ElementRef<typeof View>, StyledConfettiProps>(
    ({ count = 50, duration = 3000, isActive, onComplete, ...props }, ref) => {
        const [show, setShow] = useState(false);
        useEffect(() => { if (isActive) { setShow(true); setTimeout(() => { setShow(false); onComplete?.(); }, duration); } }, [isActive, duration, onComplete]);
        if (!show) return null;
        return (
            <View ref={ref} style={StyleSheet.absoluteFill} pointerEvents="none" accessibilityElementsHidden {...props}>
                {Array.from({ length: count }, (_, i) => {
                    const anim = new Animated.Value(0);
                    Animated.timing(anim, { toValue: 1, duration: 2000 + Math.random() * 1000, useNativeDriver: true, delay: Math.random() * 800 }).start();
                    return <Animated.View key={i} style={{ position: 'absolute', left: width * (0.1 + Math.random() * 0.8), top: -20, width: 10, height: 6, borderRadius: 2, backgroundColor: COLORS[i % COLORS.length], opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }), transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, height] }) }] }} />;
                })}
            </View>
        );
    },
);
Confetti.displayName = 'Confetti';
export { Confetti };
