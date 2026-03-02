import React, { forwardRef } from 'react';
import {
    Pressable,
    Text,
    ActivityIndicator,
    StyleSheet,
    type PressableProps,
    type ViewStyle,
    type TextStyle,
} from 'react-native';

/**
 * Button variant type.
 */
type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';

/**
 * Button size type.
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the React Native Button component.
 */
interface NativeButtonProps extends Omit<PressableProps, 'children'> {
    /** The visual style of the button */
    variant?: ButtonVariant;
    /** The size of the button */
    size?: ButtonSize;
    /** Whether the button is disabled */
    isDisabled?: boolean;
    /** Whether the button is in a loading state */
    isLoading?: boolean;
    /** Text to display while loading */
    loadingText?: string;
    /** Content to display inside the button */
    children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: { backgroundColor: '#2563eb' },
    secondary: { backgroundColor: '#f1f5f9' },
    destructive: { backgroundColor: '#dc2626' },
    ghost: { backgroundColor: 'transparent' },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#e2e8f0' },
};

const variantTextStyles: Record<ButtonVariant, TextStyle> = {
    primary: { color: '#ffffff' },
    secondary: { color: '#0f172a' },
    destructive: { color: '#ffffff' },
    ghost: { color: '#0f172a' },
    outline: { color: '#0f172a' },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
    sm: { height: 32, paddingHorizontal: 12, gap: 6 },
    md: { height: 40, paddingHorizontal: 16, gap: 8 },
    lg: { height: 48, paddingHorizontal: 24, gap: 8 },
};

const sizeTextStyles: Record<ButtonSize, TextStyle> = {
    sm: { fontSize: 12 },
    md: { fontSize: 14 },
    lg: { fontSize: 16 },
};

/**
 * React Native Button component.
 * Uses Pressable for touch handling and supports all standard Button variants.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Save Changes
 * </Button>
 * ```
 */
const Button = forwardRef<React.ElementRef<typeof Pressable>, NativeButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isDisabled = false,
            isLoading = false,
            loadingText,
            children,
            onPress,
            ...rest
        },
        ref,
    ) => {
        const isInteractionDisabled = isDisabled || isLoading;

        const handlePress = (event: Parameters<NonNullable<PressableProps['onPress']>>[0]) => {
            if (isInteractionDisabled) return;
            onPress?.(event);
        };

        return (
            <Pressable
                ref={ref}
                style={[
                    styles.base,
                    variantStyles[variant],
                    sizeStyles[size],
                    isInteractionDisabled && styles.disabled,
                ]}
                onPress={handlePress}
                accessibilityRole="button"
                accessibilityState={{
                    disabled: isDisabled,
                    busy: isLoading,
                }}
                {...rest}
            >
                {isLoading && (
                    <ActivityIndicator
                        size="small"
                        color={variantTextStyles[variant]?.color as string}
                    />
                )}
                <Text
                    style={[
                        styles.text,
                        variantTextStyles[variant],
                        sizeTextStyles[size],
                    ]}
                >
                    {isLoading && loadingText ? loadingText : children}
                </Text>
            </Pressable>
        );
    },
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    text: {
        fontWeight: '500',
    },
    disabled: {
        opacity: 0.5,
    },
});

export { Button };
export type { NativeButtonProps as ButtonProps };
