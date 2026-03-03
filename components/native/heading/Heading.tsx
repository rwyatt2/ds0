import React, { forwardRef } from 'react';
import { Text as RNText, StyleSheet, type TextStyle } from 'react-native';

/**
 * Heading level type for React Native.
 */
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Props for the React Native Heading component.
 */
interface NativeHeadingProps {
    /** The heading level */
    as?: HeadingLevel;
    /** Override visual size */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    /** Font weight */
    weight?: 'regular' | 'medium' | 'semibold' | 'bold';
    /** Content to display inside the heading */
    children: React.ReactNode;
}

const sizeStyles: Record<string, TextStyle> = {
    xs: { fontSize: 12 },
    sm: { fontSize: 14 },
    md: { fontSize: 16 },
    lg: { fontSize: 18 },
    xl: { fontSize: 20 },
    '2xl': { fontSize: 24 },
    '3xl': { fontSize: 30 },
    '4xl': { fontSize: 36 },
};

const levelSizeMap: Record<HeadingLevel, string> = {
    h1: '4xl',
    h2: '3xl',
    h3: '2xl',
    h4: 'xl',
    h5: 'lg',
    h6: 'md',
};

const weightStyles: Record<string, TextStyle> = {
    regular: { fontWeight: '400' },
    medium: { fontWeight: '500' },
    semibold: { fontWeight: '600' },
    bold: { fontWeight: '700' },
};

/**
 * React Native Heading component.
 * Renders styled text with heading typography.
 *
 * @example
 * ```tsx
 * <Heading as="h1">Page Title</Heading>
 * ```
 */
const Heading = forwardRef<RNText, NativeHeadingProps>(
    (
        {
            as = 'h2',
            size,
            weight = 'bold',
            children,
            ...rest
        },
        ref,
    ) => {
        const resolvedSize = size ?? levelSizeMap[as];

        return (
            <RNText
                ref={ref}
                style={[
                    styles.base,
                    sizeStyles[resolvedSize],
                    weightStyles[weight],
                ]}
                accessibilityRole="header"
                {...rest}
            >
                {children}
            </RNText>
        );
    },
);

Heading.displayName = 'Heading';

const styles = StyleSheet.create({
    base: {
        color: '#0f172a',
    },
});

export { Heading };
export type { NativeHeadingProps as HeadingProps };
