import React, { forwardRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import type { StyledTerminalProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledScrollView = styled(ScrollView);
const Terminal = forwardRef<React.ElementRef<typeof View>, StyledTerminalProps>(({ lines = [], title, prompt = '$', ...props }, ref) => (
    <StyledView ref={ref} className="rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden" {...props}>
        <StyledView className="flex-row items-center gap-1.5 px-4 py-2 bg-zinc-900 border-b border-zinc-800">
            <StyledView className="w-3 h-3 rounded-full bg-red-500" /><StyledView className="w-3 h-3 rounded-full bg-yellow-500" /><StyledView className="w-3 h-3 rounded-full bg-green-500" />
            {title && <StyledText className="ml-2 text-xs text-zinc-500">{title}</StyledText>}
        </StyledView>
        <StyledScrollView className="p-4">{lines.map((l, i) => <StyledText key={i} className={`font-mono text-sm ${l.type === 'error' ? 'text-red-400' : l.type === 'input' ? 'text-emerald-400' : 'text-zinc-100'}`}>{l.type === 'input' ? `${l.prompt || prompt} ` : ''}{l.content}</StyledText>)}</StyledScrollView>
    </StyledView>
));
Terminal.displayName = 'Terminal';
export { Terminal };
