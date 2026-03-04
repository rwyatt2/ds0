import React, { forwardRef, useState, useCallback, useMemo, createContext, useContext } from 'react';
import { Modal, Pressable, View, Text, ScrollView, StyleSheet, type PressableProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

// ─── Context ──────────────────────────────────────────────────

interface SelectOption {
    value: string;
    label: string;
}

interface SelectContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    selectedValue: string | undefined;
    selectedLabel: string | undefined;
    select: (value: string, label: string) => void;
    placeholder: string;
    isDisabled: boolean;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
    const ctx = useContext(SelectContext);
    if (!ctx) throw new Error('Select compound components must be used within <Select>');
    return ctx;
}

// ─── Root ─────────────────────────────────────────────────────

interface SelectProps {
    /** Controlled value */
    value?: string;
    /** Default value (uncontrolled) */
    defaultValue?: string;
    /** Callback when value changes */
    onValueChange?: (value: string) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Whether the select is disabled */
    isDisabled?: boolean;
    children: React.ReactNode;
}

function Select({
    value: controlledValue,
    defaultValue,
    onValueChange,
    placeholder = 'Select…',
    isDisabled = false,
    children,
}: SelectProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [internalLabel, setInternalLabel] = useState<string | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);

    const selectedValue = controlledValue ?? internalValue;

    const select = useCallback(
        (val: string, label: string) => {
            if (controlledValue === undefined) {
                setInternalValue(val);
                setInternalLabel(label);
            }
            onValueChange?.(val);
            setIsOpen(false);
        },
        [controlledValue, onValueChange],
    );

    const ctx = useMemo<SelectContextValue>(
        () => ({
            isOpen,
            open: () => { if (!isDisabled) setIsOpen(true); },
            close: () => setIsOpen(false),
            selectedValue,
            selectedLabel: internalLabel,
            select,
            placeholder,
            isDisabled,
        }),
        [isOpen, selectedValue, internalLabel, select, placeholder, isDisabled],
    );

    return <SelectContext.Provider value={ctx}>{children}</SelectContext.Provider>;
}
Select.displayName = 'Select';

// ─── Trigger ──────────────────────────────────────────────────

interface SelectTriggerProps {
    children?: React.ReactNode;
    accessibilityLabel?: string;
}

const SelectTrigger = forwardRef<React.ElementRef<typeof Pressable>, SelectTriggerProps>(
    ({ children, accessibilityLabel, ...rest }, ref) => {
        const { open, selectedLabel, placeholder, isDisabled, isOpen } = useSelectContext();
        const displayText = selectedLabel ?? placeholder;

        return (
            <StyledPressable
                ref={ref}
                onPress={open}
                disabled={isDisabled}
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabel ?? 'Open select menu'}
                accessibilityState={{ expanded: isOpen, disabled: isDisabled }}
                className="flex-row items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2"
                style={isDisabled ? styles.disabled : undefined}
                {...rest}
            >
                {children ?? (
                    <StyledText className={selectedLabel ? 'text-sm text-gray-900' : 'text-sm text-gray-400'}>
                        {displayText}
                    </StyledText>
                )}
                <StyledText className="ml-2 text-gray-400">▾</StyledText>
            </StyledPressable>
        );
    },
);
SelectTrigger.displayName = 'SelectTrigger';

// ─── Content ──────────────────────────────────────────────────

interface SelectContentProps {
    children: React.ReactNode;
}

const SelectContent = forwardRef<React.ElementRef<typeof Modal>, SelectContentProps>(
    ({ children, ...props }, ref) => {
        const { isOpen, close } = useSelectContext();

        return (
            <Modal
                ref={ref}
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={close}
                {...props}
            >
                <Pressable style={styles.backdrop} onPress={close}>
                    <View style={styles.contentContainer}>
                        <StyledView className="bg-white rounded-xl shadow-2xl overflow-hidden max-h-[300px] w-[280px]">
                            <ScrollView bounces={false}>
                                {children}
                            </ScrollView>
                        </StyledView>
                    </View>
                </Pressable>
            </Modal>
        );
    },
);
SelectContent.displayName = 'SelectContent';

// ─── Item ─────────────────────────────────────────────────────

interface SelectItemProps extends Omit<PressableProps, 'children'> {
    /** The value for this item */
    value: string;
    /** Display label (defaults to children text) */
    label?: string;
    /** Whether this item is disabled */
    isDisabled?: boolean;
    children: React.ReactNode;
}

const SelectItem = forwardRef<React.ElementRef<typeof Pressable>, SelectItemProps>(
    ({ value, label, isDisabled: itemDisabled = false, children, ...rest }, ref) => {
        const { selectedValue, select } = useSelectContext();
        const isSelected = selectedValue === value;
        const displayLabel = label ?? (typeof children === 'string' ? children : value);

        const handlePress = useCallback(() => {
            if (!itemDisabled) select(value, displayLabel);
        }, [itemDisabled, select, value, displayLabel]);

        return (
            <StyledPressable
                ref={ref}
                onPress={handlePress}
                disabled={itemDisabled}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected, disabled: itemDisabled }}
                className={`flex-row items-center justify-between px-3 py-2.5 ${isSelected ? 'bg-blue-50' : ''}`}
                style={itemDisabled ? styles.disabled : undefined}
                {...rest}
            >
                <StyledText className={`text-sm ${isSelected ? 'font-medium text-blue-600' : 'text-gray-900'}`}>
                    {children}
                </StyledText>
                {isSelected && <StyledText className="text-blue-600">✓</StyledText>}
            </StyledPressable>
        );
    },
);
SelectItem.displayName = 'SelectItem';

// ─── Separator ────────────────────────────────────────────────

function SelectSeparator() {
    return <StyledView className="h-px bg-gray-200 my-1" />;
}
SelectSeparator.displayName = 'SelectSeparator';

// ─── Styles ───────────────────────────────────────────────────

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    contentContainer: {
        maxWidth: '90%',
    },
    disabled: {
        opacity: 0.5,
    },
});

export { Select, SelectTrigger, SelectContent, SelectItem, SelectSeparator };
export type { SelectProps, SelectTriggerProps, SelectContentProps, SelectItemProps };
