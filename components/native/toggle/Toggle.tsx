import React, { forwardRef } from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';
import { styled } from 'nativewind';

import { useToggle } from '@ds0/primitives';
import type { StyledToggleProps } from '@ds0/primitives';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

/**
 * React Native Toggle component.
 * A two-state button that can be on or off.
 *
 * @example
 * ```tsx
 * <Toggle aria-label="Toggle bold">
 *   Bold
 * </Toggle>
 * ```
 */
const Toggle = forwardRef<React.ElementRef<typeof Pressable>, StyledToggleProps>(
    ({ variant = 'default', size = 'md', pressed, defaultPressed, onPressedChange, isDisabled, children, ...props }, ref) => {
        const { toggleProps, isPressed } = useToggle({ pressed, defaultPressed, onPressedChange, isDisabled });

        return (
            <StyledPressable
                ref={ref}
                className={`items-center justify-center rounded-md ${size === 'sm' ? 'h-8 px-2' : size === 'lg' ? 'h-12 px-4' : 'h-10 px-3'
                    } ${isPressed ? 'bg-gray-200' : 'bg-transparent'} ${isDisabled ? 'opacity-50' : ''}`}
                accessibilityRole="button"
                accessibilityState={{ disabled: isDisabled, selected: isPressed }}
                {...toggleProps}
                {...props}
            >
                <StyledText className="text-sm font-medium">
                    {children}
                </StyledText>
            </StyledPressable>
        );
    },
);

Toggle.displayName = 'Toggle';

export { Toggle };
