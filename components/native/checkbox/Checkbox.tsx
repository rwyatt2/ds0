import React, { forwardRef, useState, useCallback } from 'react';
import { Pressable, View, Text, StyleSheet, type PressableProps } from 'react-native';

interface NativeCheckboxProps extends Omit<PressableProps, 'children'> {
    label: string;
    description?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    isDisabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const sizeMap = { sm: 16, md: 20, lg: 24 };

const Checkbox = forwardRef<React.ElementRef<typeof Pressable>, NativeCheckboxProps>(
    ({ label, description, checked: controlledChecked, defaultChecked = false, onCheckedChange, isDisabled = false, size = 'md', ...rest }, ref) => {
        const [internalChecked, setInternalChecked] = useState(defaultChecked);
        const isChecked = controlledChecked ?? internalChecked;
        const boxSize = sizeMap[size];

        const handlePress = useCallback(() => {
            if (isDisabled) return;
            const newChecked = !isChecked;
            if (controlledChecked === undefined) setInternalChecked(newChecked);
            onCheckedChange?.(newChecked);
        }, [isDisabled, isChecked, controlledChecked, onCheckedChange]);

        return (
            <Pressable ref={ref} style={[styles.container, isDisabled && styles.disabled]} onPress={handlePress} accessibilityRole="checkbox" accessibilityState={{ checked: isChecked, disabled: isDisabled }} {...rest}>
                <View style={[styles.box, { width: boxSize, height: boxSize }, isChecked && styles.checkedBox]}>
                    {isChecked && <Text style={styles.check}>✓</Text>}
                </View>
                <View>
                    <Text style={styles.label}>{label}</Text>
                    {description && <Text style={styles.description}>{description}</Text>}
                </View>
            </Pressable>
        );
    },
);

Checkbox.displayName = 'Checkbox';

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    disabled: { opacity: 0.5 },
    box: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
    checkedBox: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
    check: { color: '#fff', fontSize: 12, fontWeight: '700' },
    label: { fontSize: 14, fontWeight: '500' },
    description: { fontSize: 14, color: '#94a3b8' },
});

export { Checkbox };
export type { NativeCheckboxProps as CheckboxProps };
