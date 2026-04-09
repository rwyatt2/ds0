import { forwardRef } from 'react';
import type { ChatBubbleProps } from './ChatBubble.types';
import { useChatBubble } from './useChatBubble';
const ChatBubblePrimitive = forwardRef<HTMLDivElement, ChatBubbleProps>(({ messages, onSend, title, placeholder, ...rest }, ref) => {
    const { chatProps, inputProps } = useChatBubble({ messages, onSend });
    return (<div ref={ref} {...rest}>{title && <div>{title}</div>}<div {...chatProps}>{messages.map(m => <div key={m.id} style={{ textAlign: m.sender === 'user' ? 'right' : 'left' }}><p>{m.content}</p></div>)}</div>{onSend && <input {...inputProps} placeholder={placeholder || 'Type a message...'} />}</div>);
});
ChatBubblePrimitive.displayName = 'ChatBubblePrimitive';
export { ChatBubblePrimitive };
