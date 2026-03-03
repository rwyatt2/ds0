import React, { forwardRef } from 'react';
import { View, TextInput, Text, StyleSheet, type TextInputProps, type ViewStyle, type TextStyle } from 'react-native';

type TextAreaSize = 'sm' | 'md' | 'lg';

interface NativeTextAreaProps extends Omit<TextInputProps, 'editable'> {
    label: string;
    helperText?: string;
    errorMessage?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isInvalid?: boolean;
    size?: TextAreaSize;
    rows?: number;
}

const sizeTextStyles: Record<TextAreaSize, TextStyle> = {
    sm: { fontSize: 12, padding: 8 },
    md: { fontSize: 14, padding: 8 },
    lg: { fontSize: 16, padding: 12 },
};

const TextArea = forwardRef<TextInput, NativeTextAreaProps>(
    ({ label, helperText, errorMessage, isDisabled = false, isRequired = false, isReadOnly = false, isInvalid = false, size = 'md', rows = 3, ...rest }, ref) => {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>
                    {label}
                    {isRequired && <Text style={styles.required}> *</Text>}
                </Text>
                <TextInput
                    ref={ref}
                    style={[styles.input, sizeTextStyles[size], { minHeight: rows * 24 }, isInvalid && styles.invalidInput, isDisabled && styles.disabled]}
                    multiline
                    numberOfLines={rows}
                    editable={!isDisabled && !isReadOnly}
                    accessibilityLabel={label}
                    accessibilityState={{ disabled: isDisabled }}
                    accessibilityHint={isInvalid ? errorMessage : helperText}
                    {...rest}
                />
                {isInvalid && errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : helperText ? (
                    <Text style={styles.helperText}>{helperText}</Text>
                ) : null}
            </View>
        );
    },
);

TextArea.displayName = 'TextArea';

const styles = StyleSheet.create({
    container: { gap: 6 },
    label: { fontSize: 14, fontWeight: '500' },
    required: { color: '#dc2626' },
    input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 6, backgroundColor: '#ffffff', color: '#0f172a', textAlignVertical: 'top' },
    invalidInput: { borderColor: '#dc2626' },
    disabled: { opacity: 0.5 },
    helperText: { fontSize: 14, color: '#94a3b8' },
    errorText: { fontSize: 14, color: '#dc2626' },
});

export { TextArea };
export type { NativeTextAreaProps as TextAreaProps };
