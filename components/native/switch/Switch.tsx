import React, { forwardRef, useState, useCallback } from 'react';
import { Pressable, View, Text, StyleSheet, Animated, type PressableProps } from 'react-native';

interface NativeSwitchProps extends Omit<PressableProps, 'children'> {
    label: string; description?: string; checked?: boolean; defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void; isDisabled?: boolean; size?: 'sm' | 'md' | 'lg';
}

const sizeMap = { sm: { track: { w: 36, h: 20 }, thumb: 16 }, md: { track: { w: 44, h: 24 }, thumb: 20 }, lg: { track: { w: 52, h: 28 }, thumb: 24 } };

const Switch = forwardRef<React.ElementRef<typeof Pressable>, NativeSwitchProps>(
    ({ label, description, checked: controlledChecked, defaultChecked = false, onCheckedChange, isDisabled = false, size = 'md', ...rest }, ref) => {
        const [internalChecked, setInternalChecked] = useState(defaultChecked);
        const isChecked = controlledChecked ?? internalChecked;
        const s = sizeMap[size];

        const handlePress = useCallback(() => {
            if (isDisabled) return;
            const newChecked = !isChecked;
            if (controlledChecked === undefined) setInternalChecked(newChecked);
            onCheckedChange?.(newChecked);
        }, [isDisabled, isChecked, controlledChecked, onCheckedChange]);

        return (
            <Pressable ref={ref} style={[styles.container, isDisabled && styles.disabled]} onPress={handlePress} accessibilityRole="switch" accessibilityState={{ checked: isChecked, disabled: isDisabled }} {...rest}>
                <View><Text style={styles.label}>{label}</Text>{description && <Text style={styles.description}>{description}</Text>}</View>
                <View style={[styles.track, { width: s.track.w, height: s.track.h }, isChecked && styles.checkedTrack]}>
                    <View style={[styles.thumb, { width: s.thumb, height: s.thumb }, isChecked && { transform: [{ translateX: s.track.w - s.thumb - 4 }] }]} />
                </View>
            </Pressable>
        );
    },
);

Switch.displayName = 'Switch';

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
    disabled: { opacity: 0.5 },
    track: { borderRadius: 9999, backgroundColor: '#e2e8f0', padding: 2, justifyContent: 'center' },
    checkedTrack: { backgroundColor: '#2563eb' },
    thumb: { borderRadius: 9999, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 },
    label: { fontSize: 14, fontWeight: '500' },
    description: { fontSize: 14, color: '#94a3b8' },
});

export { Switch };
export type { NativeSwitchProps as SwitchProps };
