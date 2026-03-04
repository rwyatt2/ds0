import React, { forwardRef, useState, useCallback, useMemo, createContext, useContext } from 'react';
import { Modal, Pressable, View, Text, StyleSheet, type ModalProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

// ─── Context ──────────────────────────────────────────────────

interface PopoverContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
    const ctx = useContext(PopoverContext);
    if (!ctx) throw new Error('Popover compound components must be used within <Popover>');
    return ctx;
}

// ─── Root ─────────────────────────────────────────────────────

interface PopoverProps {
    /** Controlled open state */
    open?: boolean;
    /** Default open state (uncontrolled) */
    defaultOpen?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}

function Popover({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: PopoverProps) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = controlledOpen ?? internalOpen;

    const setOpen = useCallback(
        (val: boolean) => {
            if (controlledOpen === undefined) setInternalOpen(val);
            onOpenChange?.(val);
        },
        [controlledOpen, onOpenChange],
    );

    const ctx = useMemo<PopoverContextValue>(
        () => ({
            isOpen,
            open: () => setOpen(true),
            close: () => setOpen(false),
            toggle: () => setOpen(!isOpen),
        }),
        [isOpen, setOpen],
    );

    return <PopoverContext.Provider value={ctx}>{children}</PopoverContext.Provider>;
}
Popover.displayName = 'Popover';

// ─── Trigger ──────────────────────────────────────────────────

interface PopoverTriggerProps {
    children: React.ReactNode;
    /** Additional accessibility label */
    accessibilityLabel?: string;
}

const PopoverTrigger = forwardRef<React.ElementRef<typeof Pressable>, PopoverTriggerProps>(
    ({ children, accessibilityLabel, ...rest }, ref) => {
        const { toggle, isOpen } = usePopoverContext();
        return (
            <Pressable
                ref={ref}
                onPress={toggle}
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabel ?? 'Toggle popover'}
                accessibilityState={{ expanded: isOpen }}
                {...rest}
            >
                {children}
            </Pressable>
        );
    },
);
PopoverTrigger.displayName = 'PopoverTrigger';

// ─── Content ──────────────────────────────────────────────────

interface PopoverContentProps extends Omit<ModalProps, 'visible'> {
    children: React.ReactNode;
}

const PopoverContent = forwardRef<React.ElementRef<typeof Modal>, PopoverContentProps>(
    ({ children, ...props }, ref) => {
        const { isOpen, close } = usePopoverContext();

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
                    <Pressable
                        onPress={(e) => e.stopPropagation?.()}
                        style={styles.content}
                    >
                        <StyledView className="bg-white rounded-xl p-4 shadow-2xl min-w-[200px]">
                            {children}
                        </StyledView>
                    </Pressable>
                </Pressable>
            </Modal>
        );
    },
);
PopoverContent.displayName = 'PopoverContent';

// ─── Close ────────────────────────────────────────────────────

interface PopoverCloseProps {
    children: React.ReactNode;
}

const PopoverClose = forwardRef<React.ElementRef<typeof Pressable>, PopoverCloseProps>(
    ({ children, ...rest }, ref) => {
        const { close } = usePopoverContext();
        return (
            <Pressable ref={ref} onPress={close} accessibilityRole="button" accessibilityLabel="Close popover" {...rest}>
                {children}
            </Pressable>
        );
    },
);
PopoverClose.displayName = 'PopoverClose';

// ─── Styles ───────────────────────────────────────────────────

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    content: {
        maxWidth: '90%',
    },
});

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
export type { PopoverProps, PopoverTriggerProps, PopoverContentProps, PopoverCloseProps };
