import React, { forwardRef, useState } from 'react';
import { Pressable, Text, View, type PressableProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

/**
 * React Native RadioGroup component.
 * Uses NativeWind for styling consistency with the web version.
 *
 * @example
 * ```tsx
 * <RadioGroup label="Plan" defaultValue="free">
 *   <RadioGroupItem value="free" label="Free" />
 *   <RadioGroupItem value="pro" label="Pro" />
 * </RadioGroup>
 * ```
 */
interface RadioGroupNativeProps {
    label: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'vertical' | 'horizontal';
    isDisabled?: boolean;
    children: React.ReactNode;
}

const RadioGroup = forwardRef<React.ElementRef<typeof View>, RadioGroupNativeProps>(
    ({ label, value, defaultValue, onValueChange, orientation = 'vertical', isDisabled = false, children }, ref) => {
        const [internalValue, setInternalValue] = useState(defaultValue ?? '');
        const currentValue = value ?? internalValue;

        const handleSelect = (val: string) => {
            if (isDisabled) return;
            if (value === undefined) setInternalValue(val);
            onValueChange?.(val);
        };

        return (
            <StyledView ref={ref} className={`gap-2 ${orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'}`} accessibilityRole="radiogroup">
                <StyledText className="text-sm font-medium">{label}</StyledText>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child as React.ReactElement<{ selectedValue?: string; onSelect?: (v: string) => void; groupDisabled?: boolean }>, {
                            selectedValue: currentValue,
                            onSelect: handleSelect,
                            groupDisabled: isDisabled,
                        });
                    }
                    return child;
                })}
            </StyledView>
        );
    },
);

RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemNativeProps extends Omit<PressableProps, 'children'> {
    value: string;
    label: string;
    description?: string;
    isDisabled?: boolean;
    selectedValue?: string;
    onSelect?: (value: string) => void;
    groupDisabled?: boolean;
}

const RadioGroupItem = forwardRef<React.ElementRef<typeof Pressable>, RadioGroupItemNativeProps>(
    ({ value, label, description, isDisabled = false, selectedValue, onSelect, groupDisabled, ...props }, ref) => {
        const isSelected = selectedValue === value;
        const isItemDisabled = groupDisabled || isDisabled;

        return (
            <StyledPressable
                ref={ref}
                className="flex-row items-center gap-3 p-2"
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected, disabled: isItemDisabled }}
                onPress={() => {
                    if (isItemDisabled) return;
                    onSelect?.(value);
                }}
                {...props}
            >
                <StyledView className={`h-5 w-5 rounded-full border-2 items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-400'} ${isItemDisabled ? 'opacity-50' : ''}`}>
                    {isSelected && <StyledView className="h-2 w-2 rounded-full bg-white" />}
                </StyledView>
                <StyledView className="flex-col gap-0.5">
                    <StyledText className="text-sm font-medium">{label}</StyledText>
                    {description && <StyledText className="text-xs text-gray-500">{description}</StyledText>}
                </StyledView>
            </StyledPressable>
        );
    },
);

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
