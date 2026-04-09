import React, { forwardRef, useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
const AlertDialog = forwardRef<View, { children: React.ReactNode }>(({ children, ...rest }, ref) => {
    const [open, setOpen] = useState(false);
    return <View ref={ref} {...rest}>{React.Children.map(children, c => React.isValidElement(c) ? React.cloneElement(c as React.ReactElement<Record<string, unknown>>, { _open: open, _setOpen: setOpen }) : c)}</View>;
});
AlertDialog.displayName = 'AlertDialog';
const AlertDialogTrigger = ({ _setOpen, children }: { _setOpen?: (o: boolean) => void; children: React.ReactNode }) => (<Pressable onPress={() => _setOpen?.(true)} accessibilityRole="button">{typeof children === 'string' ? <Text>{children}</Text> : children}</Pressable>);
const AlertDialogContent = ({ _open, _setOpen, children }: { _open?: boolean; _setOpen?: (o: boolean) => void; children: React.ReactNode }) => {
    if (!_open) return null;
    return <Modal transparent animationType="fade" onRequestClose={() => _setOpen?.(false)}><View style={s.overlay}><View style={s.content}>{children}</View></View></Modal>;
};
const AlertDialogAction = ({ onPress, children }: { onPress?: () => void; children: React.ReactNode }) => (<Pressable onPress={onPress} style={s.action}><Text style={s.actionText}>{typeof children === 'string' ? children : ''}</Text></Pressable>);
const AlertDialogCancel = ({ onPress, children }: { onPress?: () => void; children: React.ReactNode }) => (<Pressable onPress={onPress} style={s.cancel}><Text>{typeof children === 'string' ? children : ''}</Text></Pressable>);
const s = StyleSheet.create({ overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }, content: { backgroundColor: '#fff', borderRadius: 8, padding: 24, maxWidth: 400, width: '90%' }, action: { backgroundColor: '#2563eb', borderRadius: 6, paddingVertical: 8, paddingHorizontal: 16, marginTop: 8 }, actionText: { color: '#fff', fontWeight: '600', textAlign: 'center' }, cancel: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 6, paddingVertical: 8, paddingHorizontal: 16, marginTop: 8 } });
export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel };
