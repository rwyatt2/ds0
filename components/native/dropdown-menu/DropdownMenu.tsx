import React, { forwardRef, useState } from 'react';
import { View, Pressable, Text, Modal, StyleSheet, type ViewProps } from 'react-native';

interface NativeDropdownMenuProps extends ViewProps { children: React.ReactNode; }

const DropdownMenu = forwardRef<View, NativeDropdownMenuProps>(({ children, ...rest }, ref) => {
    const [open, setOpen] = useState(false);
    return (
        <View ref={ref} {...rest}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, { _open: open, _setOpen: setOpen });
                }
                return child;
            })}
        </View>
    );
});
DropdownMenu.displayName = 'DropdownMenu';

interface TriggerP { _setOpen?: (o: boolean) => void; _open?: boolean; children: React.ReactNode; }
const DropdownMenuTrigger = ({ _setOpen, _open, children }: TriggerP): React.ReactElement => (
    <Pressable onPress={() => _setOpen?.(!_open)} accessibilityRole="button">
        {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Pressable>
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

interface ContentP { _open?: boolean; _setOpen?: (o: boolean) => void; children: React.ReactNode; }
const DropdownMenuContent = ({ _open, _setOpen, children }: ContentP): React.ReactElement | null => {
    if (!_open) return null;
    return (
        <Modal transparent animationType="fade" onRequestClose={() => _setOpen?.(false)}>
            <Pressable style={styles.overlay} onPress={() => _setOpen?.(false)}>
                <View style={styles.content}>{children}</View>
            </Pressable>
        </Modal>
    );
};
DropdownMenuContent.displayName = 'DropdownMenuContent';

interface ItemP { onSelect?: () => void; isDisabled?: boolean; children: React.ReactNode; }
const DropdownMenuItem = ({ onSelect, isDisabled, children }: ItemP): React.ReactElement => (
    <Pressable onPress={() => !isDisabled && onSelect?.()} disabled={isDisabled} accessibilityRole="menuitem" style={[styles.item, isDisabled && styles.disabled]}>
        {typeof children === 'string' ? <Text style={styles.itemText}>{children}</Text> : children}
    </Pressable>
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
    content: { backgroundColor: '#fff', borderRadius: 6, padding: 4, minWidth: 160, elevation: 4 },
    item: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 4 },
    itemText: { fontSize: 14 },
    disabled: { opacity: 0.5 },
});

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
export type { NativeDropdownMenuProps as DropdownMenuProps };
