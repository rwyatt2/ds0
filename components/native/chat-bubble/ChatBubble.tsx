import React, { forwardRef } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { styled } from 'nativewind';
import type { StyledChatBubbleProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledScrollView = styled(ScrollView);
const ChatBubble = forwardRef<React.ElementRef<typeof View>, StyledChatBubbleProps>(({ messages, title, ...props }, ref) => (
    <StyledView ref={ref} className="rounded-xl border overflow-hidden bg-white" {...props}>
        {title && <StyledView className="px-4 py-3 border-b bg-gray-50"><StyledText className="font-semibold text-sm">{title}</StyledText></StyledView>}
        <StyledScrollView className="p-4">{messages.map(m => <StyledView key={m.id} className={`mb-2 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}><StyledView className={`rounded-2xl px-4 py-2 max-w-[75%] ${m.sender === 'user' ? 'bg-blue-600' : 'bg-gray-100'}`}><StyledText className={`text-sm ${m.sender === 'user' ? 'text-white' : ''}`}>{m.content}</StyledText></StyledView></StyledView>)}</StyledScrollView>
    </StyledView>
));
ChatBubble.displayName = 'ChatBubble';
export { ChatBubble };
