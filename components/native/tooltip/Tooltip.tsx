import React, { forwardRef, useState, useCallback, useMemo, useRef, createContext, useContext } from 'react';
import { Modal, Pressable, View, Text, StyleSheet, type PressableProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

// ─── Context ──────────────────────────────────────────────────

interface TooltipContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
    const ctx = useContext(TooltipContext);
    if (!ctx) throw new Error('Tooltip compound components must be used within <Tooltip>');
    return ctx;
}

// ─── Root ─────────────────────────────────────────────────────

interface TooltipProps {
    /** Controlled open state */
    open?: boolean;
    /** Default open state (uncontrolled) */
    defaultOpen?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Delay in ms before showing the tooltip on long press (default: 500) */
    delayDuration?: number;
    children: React.ReactNode;
}

function Tooltip({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: TooltipProps) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = controlledOpen ?? internalOpen;

    const setOpen = useCallback(
        (val: boolean) => {
            if (controlledOpen === undefined) setInternalOpen(val);
            onOpenChange?.(val);
        },
        [controlledOpen, onOpenChange],
    );

    const ctx = useMemo<TooltipContextValue>(
        () => ({
            isOpen,
            open: () => setOpen(true),
            close: () => setOpen(false),
        }),
        [isOpen, setOpen],
    );

    return <TooltipContext.Provider value={ctx}>{children}</TooltipContext.Provider>;
}
Tooltip.displayName = 'Tooltip';

// ─── Trigger ──────────────────────────────────────────────────

interface TooltipTriggerProps {
    children: React.ReactNode;
    /** Delay in ms before showing on long press */
    delayLongPress?: number;
    accessibilityLabel?: string;
}

const TooltipTrigger = forwardRef<React.ElementRef<typeof Pressable>, TooltipTriggerProps>(
    ({ children, delayLongPress = 500, accessibilityLabel, ...rest }, ref) => {
        const { open, close, isOpen } = useTooltipContext();

        return (
            <Pressable
                ref={ref}
                onLongPress={open}
                onPressOut={close}
                delayLongPress={delayLongPress}
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabel}
                accessibilityState={{ expanded: isOpen }}
                {...rest}
            >
                {children}
            </Pressable>
        );
    },
);
TooltipTrigger.displayName = 'TooltipTrigger';

// ─── Content ──────────────────────────────────────────────────

interface TooltipContentProps {
    children: React.ReactNode;
}

const TooltipContent = forwardRef<React.ElementRef<typeof View>, TooltipContentProps>(
    ({ children, ...props }, ref) => {
        const { isOpen, close } = useTooltipContext();

        if (!isOpen) return null;

        return (
            <Modal visible transparent animationType="fade" onRequestClose={close}>
                <Pressable style={styles.backdrop} onPress={close}>
                    <View ref={ref} style={styles.tooltipContainer} {...props}>
                        <StyledView className="rounded-md bg-gray-900 px-3 py-1.5 shadow-lg">
                            {typeof children === 'string' ? (
                                <StyledText className="text-xs text-white">{children}</StyledText>
                            ) : (
                                children
                            )}
                        </StyledView>
                    </View>
                </Pressable>
            </Modal>
        );
    },
);
TooltipContent.displayName = 'TooltipContent';

// ─── Styles ───────────────────────────────────────────────────

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    tooltipContainer: {
        maxWidth: '80%',
    },
});

export { Tooltip, TooltipTrigger, TooltipContent };
export type { TooltipProps, TooltipTriggerProps, TooltipContentProps };
