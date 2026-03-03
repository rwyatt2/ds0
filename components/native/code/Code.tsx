import React, { forwardRef } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

interface NativeCodeProps { variant?: 'inline' | 'block'; children: React.ReactNode; }

const Code = forwardRef<RNText, NativeCodeProps>(
    ({ variant = 'inline', children, ...rest }, ref) => (
        <RNText ref={ref} style={[styles.base, variant === 'block' ? styles.block : styles.inline]} {...rest}>
            {children}
        </RNText>
    ),
);
Code.displayName = 'Code';

const styles = StyleSheet.create({
    base: { fontFamily: 'monospace', fontSize: 14 },
    inline: { backgroundColor: '#f1f5f9', borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2 },
    block: { backgroundColor: '#f1f5f9', borderRadius: 8, padding: 16 },
});

export { Code };
export type { NativeCodeProps as CodeProps };
