import React, { forwardRef } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import type { StyledCartProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledPressable = styled(Pressable);
const Cart = forwardRef<React.ElementRef<typeof View>, StyledCartProps>(({ items, onRemove, onCheckout, title, ...props }, ref) => {
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    return (<StyledView ref={ref} className="rounded-xl border bg-white" {...props}><StyledView className="p-4 border-b"><StyledText className="font-semibold">{title || 'Cart'}</StyledText></StyledView><ScrollView>{items.map(i => <StyledView key={i.id} className="flex-row items-center p-4 border-b"><StyledText className="flex-1 text-sm">{i.name}</StyledText><StyledText className="text-sm font-medium">${(i.price * i.quantity).toFixed(2)}</StyledText></StyledView>)}</ScrollView><StyledView className="p-4 border-t"><StyledView className="flex-row justify-between mb-3"><StyledText className="font-semibold">Total</StyledText><StyledText className="font-semibold">${total.toFixed(2)}</StyledText></StyledView>{onCheckout && <StyledPressable onPress={onCheckout} className="bg-blue-600 rounded-lg py-2.5 items-center"><StyledText className="text-white font-medium text-sm">Checkout</StyledText></StyledPressable>}</StyledView></StyledView>);
});
Cart.displayName = 'Cart';
export { Cart };
