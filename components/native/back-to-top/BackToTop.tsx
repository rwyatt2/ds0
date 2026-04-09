import React, { forwardRef } from 'react';
import { Pressable, type PressableProps, type ViewStyle } from 'react-native';

/**
 * React Native BackToTop component.
 * Provides a scroll-to-top button for React Native ScrollView/FlatList.
 *
 * @example
 * ```tsx
 * <BackToTop onPress={() => scrollRef.current?.scrollTo({ y: 0 })} />
 * ```
 */

interface BackToTopNativeProps extends PressableProps {
  /** Whether the button is visible */
  isVisible?: boolean;
  /** Whether the button is disabled */
  isDisabled?: boolean;
}

const BackToTop = forwardRef<React.ElementRef<typeof Pressable>, BackToTopNativeProps>(
  ({ isVisible = true, isDisabled = false, style, ...props }, ref) => {
    if (!isVisible) return null;

    const buttonStyle: ViewStyle = {
      position: 'absolute',
      bottom: 24,
      right: 24,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#171717',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isDisabled ? 0.5 : 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    };

    return (
      <Pressable
        ref={ref}
        style={[buttonStyle, style as ViewStyle]}
        accessibilityRole="button"
        accessibilityLabel="Back to top"
        accessibilityState={{ disabled: isDisabled }}
        disabled={isDisabled}
        {...props}
      />
    );
  },
);

BackToTop.displayName = 'BackToTop';

export { BackToTop };
export type { BackToTopNativeProps };
