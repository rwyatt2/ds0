import React, { forwardRef } from 'react';
import {
    TextInput,
    StyleSheet,
    type TextInputProps,
    type ViewStyle,
    type TextStyle,
} from 'react-native';

/**
 * Input variant type.
 */
type InputVariant = 'default' | 'ghost';

/**
 * Input size type.
 */
type InputSize = 'sm' | 'md' | 'lg';

/**
 * Props for the React Native Input component.
 */
interface NativeInputProps extends Omit<TextInputProps, 'editable'> {
    /** The visual style of the input */
    variant?: InputVariant;
    /** The size of the input */
    size?: InputSize;
    /** Whether the input is disabled */
    isDisabled?: boolean;
    /** Whether the input is read-only */
    isReadOnly?: boolean;
    /** Whether the input value is invalid */
    isInvalid?: boolean;
}

const variantStyles: Record<InputVariant, ViewStyle> = {
    default: { borderWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#ffffff' },
    ghost: { borderWidth: 1, borderColor: 'transparent', backgroundColor: 'transparent' },
};

const sizeStyles: Record<InputSize, ViewStyle & TextStyle> = {
    sm: { height: 32, paddingHorizontal: 12, fontSize: 12 },
    md: { height: 40, paddingHorizontal: 16, fontSize: 14 },
    lg: { height: 48, paddingHorizontal: 24, fontSize: 16 },
};

/**
 * React Native Input component.
 * A bare text input wrapper with consistent behavior across platforms.
 *
 * @example
 * ```tsx
 * <Input placeholder="Search..." />
 * ```
 */
const Input = forwardRef<TextInput, NativeInputProps>(
    (
        {
            variant = 'default',
            size = 'md',
            isDisabled = false,
            isReadOnly = false,
            isInvalid = false,
            ...rest
        },
        ref,
    ) => {
        return (
            <TextInput
                ref={ref}
                style={[
                    styles.base,
                    variantStyles[variant],
                    sizeStyles[size],
                    isDisabled && styles.disabled,
                    isInvalid && styles.invalid,
                ]}
                editable={!isDisabled && !isReadOnly}
                accessibilityRole="none"
                accessibilityState={{
                    disabled: isDisabled,
                }}
                accessibilityHint={isInvalid ? 'This field has an error' : undefined}
                placeholderTextColor="#94a3b8"
                {...rest}
            />
        );
    },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
    base: {
        borderRadius: 6,
        color: '#0f172a',
    },
    disabled: {
        opacity: 0.5,
    },
    invalid: {
        borderColor: '#dc2626',
    },
});

export { Input };
export type { NativeInputProps as InputProps };
