import React, { forwardRef } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { styled } from 'nativewind';
import type { StyledCodeBlockProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledScrollView = styled(ScrollView); const StyledPressable = styled(Pressable);
import * as Clipboard from 'expo-clipboard';

const CodeBlock = forwardRef<React.ElementRef<typeof View>, StyledCodeBlockProps>(
    ({ code, language, showLineNumbers, title, ...props }, ref) => {
        const lines = code.split('\n');
        return (
            <StyledView ref={ref} className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950" {...props}>
                {title && <StyledView className="px-4 py-2 border-b border-zinc-800 bg-zinc-900 flex-row justify-between items-center"><StyledText className="text-xs text-zinc-400">{title}</StyledText><StyledPressable onPress={() => Clipboard.setStringAsync(code)}><StyledText className="text-xs text-zinc-400">Copy</StyledText></StyledPressable></StyledView>}
                <StyledScrollView horizontal className="p-4">
                    <StyledView>{lines.map((line, i) => <StyledView key={i} className="flex-row"><StyledText className="text-sm text-zinc-50 font-mono">{showLineNumbers ? `${String(i + 1).padStart(3, ' ')}  ` : ''}{line || ' '}</StyledText></StyledView>)}</StyledView>
                </StyledScrollView>
            </StyledView>
        );
    },
);
CodeBlock.displayName = 'CodeBlock';
export { CodeBlock };
