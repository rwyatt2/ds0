import React, { forwardRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import type { StyledCommandPaletteProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text);
const CommandPalette = forwardRef<React.ElementRef<typeof View>, StyledCommandPaletteProps>(({ items, open, onSelect, placeholder, ...props }, ref) => {
    if (!open) return null;
    return (<StyledView ref={ref} className="bg-white rounded-xl border shadow-lg p-2" {...props}><TextInput placeholder={placeholder || 'Search...'} className="border-b px-3 py-2 text-sm" /><ScrollView>{items.map(i => <Pressable key={i.id} onPress={() => { onSelect?.(i); i.onSelect?.(); }}><StyledView className="px-3 py-2"><StyledText className="text-sm">{i.label}</StyledText></StyledView></Pressable>)}</ScrollView></StyledView>);
});
CommandPalette.displayName = 'CommandPalette';
export { CommandPalette };
