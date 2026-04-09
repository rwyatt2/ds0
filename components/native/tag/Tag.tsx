import React, { forwardRef } from 'react';
import { View, Text, Pressable, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';

type TagVariant = 'default' | 'primary' | 'secondary' | 'destructive' | 'outline';
type TagSize = 'sm' | 'md' | 'lg';

interface NativeTagProps {
    variant?: TagVariant; size?: TagSize; isRemovable?: boolean; isDisabled?: boolean;
    onRemove?: () => void; children: React.ReactNode;
}

const variantStyles: Record<TagVariant, ViewStyle> = {
    default: { backgroundColor: '#f1f5f9' }, primary: { backgroundColor: '#2563eb' },
    secondary: { backgroundColor: '#f1f5f9' }, destructive: { backgroundColor: '#dc2626' },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#e2e8f0' },
};
const variantText: Record<TagVariant, TextStyle> = {
    default: { color: '#0f172a' }, primary: { color: '#fff' }, secondary: { color: '#0f172a' },
    destructive: { color: '#fff' }, outline: { color: '#0f172a' },
};
const sizeStyles: Record<TagSize, ViewStyle> = {
    sm: { height: 24, paddingHorizontal: 8 }, md: { height: 28, paddingHorizontal: 10 },
    lg: { height: 32, paddingHorizontal: 12 },
};
const sizeText: Record<TagSize, TextStyle> = {
    sm: { fontSize: 12 }, md: { fontSize: 12 }, lg: { fontSize: 14 },
};

const Tag = forwardRef<View, NativeTagProps>(
    ({ variant='default', size='md', isRemovable, isDisabled, onRemove, children }, ref) => (
        <View ref={ref} style={[styles.base, variantStyles[variant], sizeStyles[size], isDisabled && styles.disabled]}>
            <Text style={[styles.text, variantText[variant], sizeText[size]]}>{children}</Text>
            {isRemovable && (
                <Pressable onPress={() => !isDisabled && onRemove?.()} accessibilityRole="button" accessibilityLabel="Remove">
                    <Text style={[variantText[variant], { fontSize: 14, marginLeft: 4 }]}>×</Text>
                </Pressable>
            )}
        </View>
    ),
);
Tag.displayName = 'Tag';

const styles = StyleSheet.create({
    base: { flexDirection: 'row', alignItems: 'center', borderRadius: 6 },
    text: { fontWeight: '500' },
    disabled: { opacity: 0.5 },
});

export { Tag };
export type { NativeTagProps as TagProps };
