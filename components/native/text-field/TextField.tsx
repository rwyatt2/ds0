import React, { forwardRef } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    type TextInputProps,
    type ViewStyle,
    type TextStyle,
} from 'react-native';

type TextFieldSize = 'sm' | 'md' | 'lg';

interface NativeTextFieldProps extends Omit<TextInputProps, 'editable'> {
    /** Visible label text */
    label: string;
    /** Helper text shown below the input */
    helperText?: string;
    /** Error message shown when invalid */
    errorMessage?: string;
    /** Whether the input is disabled */
    isDisabled?: boolean;
    /** Whether the input is required */
    isRequired?: boolean;
    /** Whether the input is read-only */
    isReadOnly?: boolean;
    /** Whether the input is in an invalid state */
    isInvalid?: boolean;
    /** Input size */
    size?: TextFieldSize;
}

const sizeStyles: Record<TextFieldSize, ViewStyle> = {
    sm: { height: 32, paddingHorizontal: 12 },
    md: { height: 40, paddingHorizontal: 12 },
    lg: { height: 48, paddingHorizontal: 16 },
};

const sizeTextStyles: Record<TextFieldSize, TextStyle> = {
    sm: { fontSize: 12 },
    md: { fontSize: 14 },
    lg: { fontSize: 16 },
};

/**
 * React Native TextField component.
 * Provides a labeled text input with error and helper text support.
 *
 * @example
 * ```tsx
 * <TextField label="Email" placeholder="you@example.com" />
 * ```
 */
const TextField = forwardRef<TextInput, NativeTextFieldProps>(
    (
        {
            label,
            helperText,
            errorMessage,
            isDisabled = false,
            isRequired = false,
            isReadOnly = false,
            isInvalid = false,
            size = 'md',
            ...rest
        },
        ref,
    ) => {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>
                    {label}
                    {isRequired && <Text style={styles.required}> *</Text>}
                </Text>

                <TextInput
                    ref={ref}
                    style={[
                        styles.input,
                        sizeStyles[size],
                        sizeTextStyles[size],
                        isInvalid && styles.invalidInput,
                        isDisabled && styles.disabled,
                    ]}
                    editable={!isDisabled && !isReadOnly}
                    accessibilityLabel={label}
                    accessibilityState={{
                        disabled: isDisabled,
                    }}
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

TextField.displayName = 'TextField';

const styles = StyleSheet.create({
    container: {
        gap: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
    },
    required: {
        color: '#dc2626',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
        backgroundColor: '#ffffff',
        color: '#0f172a',
    },
    invalidInput: {
        borderColor: '#dc2626',
    },
    disabled: {
        opacity: 0.5,
    },
    helperText: {
        fontSize: 14,
        color: '#94a3b8',
    },
    errorText: {
        fontSize: 14,
        color: '#dc2626',
    },
});

export { TextField };
export type { NativeTextFieldProps as TextFieldProps };
