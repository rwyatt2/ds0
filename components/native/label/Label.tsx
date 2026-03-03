import React, { forwardRef } from 'react';
import { Text as RNText, StyleSheet, type TextStyle } from 'react-native';

interface NativeLabelProps {
    required?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md';
    children: React.ReactNode;
}

const Label = forwardRef<RNText, NativeLabelProps>(
    ({ size = 'md', required, disabled, children, ...rest }, ref) => (
        <RNText ref={ref} style={[styles.base, size === 'sm' ? styles.sm : styles.md, disabled && styles.disabled]} accessibilityRole="text" {...rest}>
            {children}{required && <RNText style={styles.required}> *</RNText>}
        </RNText>
    ),
);
Label.displayName = 'Label';

const styles = StyleSheet.create({
    base: { fontWeight: '500' },
    sm: { fontSize: 12 },
    md: { fontSize: 14 },
    disabled: { opacity: 0.7 },
    required: { color: '#dc2626' },
});

export { Label };
export type { NativeLabelProps as LabelProps };
