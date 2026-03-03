import React, { forwardRef, useState, useCallback } from 'react';
import { View, Text, PanResponder, StyleSheet, type ViewProps } from 'react-native';

interface NativeSliderProps extends ViewProps {
    label: string; value?: number; defaultValue?: number; onValueChange?: (value: number) => void;
    min?: number; max?: number; step?: number; isDisabled?: boolean; showValue?: boolean;
}

const Slider = forwardRef<View, NativeSliderProps>(
    ({ label, value: controlledValue, defaultValue = 0, onValueChange, min = 0, max = 100, isDisabled = false, showValue, ...rest }, ref) => {
        const [internalValue, setInternalValue] = useState(defaultValue);
        const currentValue = controlledValue ?? internalValue;
        const percentage = ((currentValue - min) / (max - min)) * 100;

        return (
            <View ref={ref} style={styles.container} accessibilityRole="adjustable" accessibilityValue={{ min, max, now: currentValue }} accessibilityState={{ disabled: isDisabled }} {...rest}>
                <View style={styles.header}><Text style={styles.label}>{label}</Text>{showValue && <Text style={styles.value}>{currentValue}</Text>}</View>
                <View style={[styles.track, isDisabled && styles.disabled]}>
                    <View style={[styles.range, { width: `${percentage}%` }]} />
                    <View style={[styles.thumb, { left: `${percentage}%` }]} />
                </View>
            </View>
        );
    },
);

Slider.displayName = 'Slider';

const styles = StyleSheet.create({
    container: { gap: 8 },
    header: { flexDirection: 'row', justifyContent: 'space-between' },
    label: { fontSize: 14, fontWeight: '500' },
    value: { fontSize: 14, color: '#94a3b8' },
    track: { height: 8, backgroundColor: '#f1f5f9', borderRadius: 9999, position: 'relative' },
    range: { height: '100%', backgroundColor: '#2563eb', borderRadius: 9999, position: 'absolute' },
    thumb: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#2563eb', backgroundColor: '#fff', position: 'absolute', top: -6, marginLeft: -10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 },
    disabled: { opacity: 0.5 },
});

export { Slider };
export type { NativeSliderProps as SliderProps };
