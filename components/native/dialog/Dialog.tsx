import React, { forwardRef, useState } from 'react';
import { Modal, Pressable, Text, View, type ModalProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

interface DialogNativeProps extends Omit<ModalProps, 'visible'> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}

const Dialog = forwardRef<React.ElementRef<typeof Modal>, DialogNativeProps>(
    ({ open, defaultOpen = false, onOpenChange, children, ...props }, ref) => {
        const [internalOpen, setInternalOpen] = useState(defaultOpen);
        const isOpen = open ?? internalOpen;
        const setOpen = (val: boolean) => { if (open === undefined) setInternalOpen(val); onOpenChange?.(val); };

        return (
            <Modal ref={ref} visible={isOpen} transparent animationType="fade" onRequestClose={() => setOpen(false)} {...props}>
                <StyledView className="flex-1 justify-center items-center bg-black/80 p-4">
                    <StyledView className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl">
                        {typeof children === 'function' ? children({ close: () => setOpen(false) }) : children}
                    </StyledView>
                </StyledView>
            </Modal>
        );
    },
);
Dialog.displayName = 'Dialog';

interface DialogTitleNativeProps { children: React.ReactNode; }
function DialogTitle({ children }: DialogTitleNativeProps) {
    return <StyledText className="text-lg font-semibold mb-2">{children}</StyledText>;
}

interface DialogDescriptionNativeProps { children: React.ReactNode; }
function DialogDescription({ children }: DialogDescriptionNativeProps) {
    return <StyledText className="text-sm text-gray-500 mb-4">{children}</StyledText>;
}

interface DialogCloseNativeProps { children: React.ReactNode; onPress?: () => void; }
function DialogClose({ children, onPress }: DialogCloseNativeProps) {
    return <StyledPressable className="rounded-md border px-4 py-2" onPress={onPress}><StyledText>{children}</StyledText></StyledPressable>;
}

export { Dialog, DialogTitle, DialogDescription, DialogClose };
