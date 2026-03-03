import React, { forwardRef } from 'react';
import { Text as RNText, StyleSheet, type TextStyle } from 'react-native';

interface NativeTextProps {
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    weight?: 'regular' | 'medium' | 'semibold' | 'bold';
    color?: 'default' | 'muted' | 'primary' | 'destructive' | 'success';
    align?: 'left' | 'center' | 'right';
    children: React.ReactNode;
}

const sizeStyles: Record<string, TextStyle> = {
    xs: { fontSize: 12 }, sm: { fontSize: 14 }, base: { fontSize: 16 },
    lg: { fontSize: 18 }, xl: { fontSize: 20 },
};
const weightStyles: Record<string, TextStyle> = {
    regular: { fontWeight: '400' }, medium: { fontWeight: '500' },
    semibold: { fontWeight: '600' }, bold: { fontWeight: '700' },
};
const colorStyles: Record<string, TextStyle> = {
    default: { color: '#0f172a' }, muted: { color: '#64748b' },
    primary: { color: '#2563eb' }, destructive: { color: '#dc2626' },
    success: { color: '#16a34a' },
};

const Text = forwardRef<RNText, NativeTextProps>(
    ({ size = 'base', weight = 'regular', color = 'default', align = 'left', children, ...rest }, ref) => (
        <RNText
            ref={ref}
            style={[styles.base, sizeStyles[size], weightStyles[weight], colorStyles[color], { textAlign: align }]}
            {...rest}
        >
            {children}
        </RNText>
    ),
);

Text.displayName = 'Text';
const styles = StyleSheet.create({ base: {} });

export { Text };
export type { NativeTextProps as TextProps };
