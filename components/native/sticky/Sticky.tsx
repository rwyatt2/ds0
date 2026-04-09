import React, { forwardRef } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';

/**
 * React Native Sticky component.
 * Note: React Native does not natively support position:sticky.
 * This component provides a consistent API but relies on ScrollView
 * stickyHeaderIndices for actual sticky behavior.
 *
 * @example
 * ```tsx
 * <ScrollView stickyHeaderIndices={[0]}>
 *   <Sticky><Header /></Sticky>
 *   <Content />
 * </ScrollView>
 * ```
 */

interface StickyNativeProps extends ViewProps {
  /** Content to make sticky */
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    zIndex: 40,
    backgroundColor: '#fff',
  },
});

const Sticky = forwardRef<View, StickyNativeProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.container, style]}
        {...props}
      >
        {children}
      </View>
    );
  },
);

Sticky.displayName = 'Sticky';

export { Sticky };
export type { StickyNativeProps };
