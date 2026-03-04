import React, { forwardRef, useState, useEffect } from 'react';
import { Modal, Pressable, Text, View, Animated, Dimensions, type ModalProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type DrawerSide = 'left' | 'right' | 'bottom';

interface DrawerNativeProps extends Omit<ModalProps, 'visible'> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: DrawerSide;
    children: React.ReactNode;
}

const getDrawerDimensions = (side: DrawerSide) => {
    switch (side) {
        case 'left':
        case 'right':
            return { width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT };
        case 'bottom':
            return { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.5 };
    }
};

const getInitialTranslation = (side: DrawerSide) => {
    switch (side) {
        case 'left': return { x: -SCREEN_WIDTH * 0.8, y: 0 };
        case 'right': return { x: SCREEN_WIDTH, y: 0 };
        case 'bottom': return { x: 0, y: SCREEN_HEIGHT };
    }
};

const Drawer = forwardRef<React.ElementRef<typeof Modal>, DrawerNativeProps>(
    ({ open, defaultOpen = false, onOpenChange, side = 'right', children, ...props }, ref) => {
        const [internalOpen, setInternalOpen] = useState(defaultOpen);
        const isOpen = open ?? internalOpen;
        const setOpen = (val: boolean) => {
            if (open === undefined) setInternalOpen(val);
            onOpenChange?.(val);
        };

        const slideAnim = React.useRef(new Animated.Value(0)).current;
        const fadeAnim = React.useRef(new Animated.Value(0)).current;

        useEffect(() => {
            if (isOpen) {
                Animated.parallel([
                    Animated.timing(slideAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
                    Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
                ]).start();
            } else {
                Animated.parallel([
                    Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
                    Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
                ]).start();
            }
        }, [isOpen, slideAnim, fadeAnim]);

        const dims = getDrawerDimensions(side);
        const initial = getInitialTranslation(side);

        const translateX = slideAnim.interpolate({ inputRange: [0, 1], outputRange: [initial.x, 0] });
        const translateY = slideAnim.interpolate({ inputRange: [0, 1], outputRange: [initial.y, 0] });

        const containerStyle: Record<string, string> = {
            left: 'flex-1 flex-row',
            right: 'flex-1 flex-row-reverse',
            bottom: 'flex-1 justify-end',
        };

        return (
            <Modal ref={ref} visible={isOpen} transparent animationType="none" onRequestClose={() => setOpen(false)} {...props}>
                <StyledView className={containerStyle[side]}>
                    <Animated.View
                        style={{
                            width: dims.width,
                            height: dims.height,
                            transform: [{ translateX }, { translateY }],
                            backgroundColor: '#fff',
                            shadowColor: '#000',
                            shadowOffset: { width: -2, height: 0 },
                            shadowOpacity: 0.25,
                            shadowRadius: 8,
                            elevation: 5,
                        }}
                        accessibilityRole="none"
                        accessibilityLabel="Drawer panel"
                    >
                        <StyledView className="flex-1 p-4">
                            {children}
                        </StyledView>
                    </Animated.View>
                    <Animated.View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', opacity: fadeAnim }}>
                        <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)} accessibilityLabel="Close drawer" />
                    </Animated.View>
                </StyledView>
            </Modal>
        );
    },
);
Drawer.displayName = 'Drawer';

interface DrawerTitleNativeProps { children: React.ReactNode; }
function DrawerTitle({ children }: DrawerTitleNativeProps) {
    return <StyledText className="text-lg font-semibold mb-2">{children}</StyledText>;
}

interface DrawerCloseNativeProps { children: React.ReactNode; onPress?: () => void; }
function DrawerClose({ children, onPress }: DrawerCloseNativeProps) {
    return (
        <StyledPressable className="rounded-md border px-4 py-2" onPress={onPress}>
            <StyledText>{children}</StyledText>
        </StyledPressable>
    );
}

export { Drawer, DrawerTitle, DrawerClose };
