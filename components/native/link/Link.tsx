import React, { forwardRef } from 'react';
import { Text, Linking, Pressable, StyleSheet, type PressableProps } from 'react-native';

interface NativeLinkProps extends Omit<PressableProps, 'children'> {
    href: string; children: React.ReactNode; isExternal?: boolean; isDisabled?: boolean;
}

const Link = forwardRef<React.ElementRef<typeof Pressable>, NativeLinkProps>(
    ({ href, children, isExternal, isDisabled = false, ...rest }, ref) => {
        const handlePress = () => { if (!isDisabled) Linking.openURL(href); };
        return (
            <Pressable ref={ref} onPress={handlePress} accessibilityRole="link" accessibilityState={{ disabled: isDisabled }} style={[isDisabled && styles.disabled]} {...rest}>
                <Text style={styles.text}>{children}</Text>
            </Pressable>
        );
    },
);

Link.displayName = 'Link';
const styles = StyleSheet.create({ text: { color: '#2563eb', textDecorationLine: 'underline' }, disabled: { opacity: 0.5 } });
export { Link };
export type { NativeLinkProps as LinkProps };
