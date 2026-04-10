import React, { forwardRef, useRef, useEffect } from 'react';
import { cn } from '@ds0/primitives';
import { useChatBubble } from '@ds0/primitives';
import type { StyledChatBubbleProps } from '@ds0/primitives';

const ChatBubble = forwardRef<HTMLDivElement, StyledChatBubbleProps>(
    ({ className, variant = 'default', size = 'md', messages, onSend, title, placeholder, ...props }, ref) => {
        const { chatProps, inputProps } = useChatBubble({ messages, onSend });
        const scrollRef = useRef<HTMLDivElement>(null);
        useEffect(() => { if (scrollRef.current && typeof scrollRef.current.scrollTo === 'function') { scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); } }, [messages]);
        const fontSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';
        return (
            <div ref={ref} className={cn('flex flex-col rounded-xl border bg-card overflow-hidden', className)} {...props}>
                {title && <div className="px-4 py-3 border-b bg-muted/30 font-semibold text-sm">{title}</div>}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3" {...chatProps}>
                    {messages.map(m => (
                        <div key={m.id} className={cn('flex', m.sender === 'user' ? 'justify-end' : 'justify-start')}>
                            <div className={cn('max-w-[75%] rounded-2xl px-4 py-2', fontSize,
                                m.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : m.sender === 'system' ? 'bg-muted text-muted-foreground text-center max-w-full text-xs' : 'bg-muted rounded-bl-sm',
                            )}>{m.content}</div>
                        </div>
                    ))}
                </div>
                {onSend && (
                    <div className="border-t p-3 flex items-center gap-2">
                        <input {...inputProps} placeholder={placeholder || 'Type a message...'} className={cn('flex-1 bg-transparent outline-none', fontSize)} />
                        <button onClick={() => { const input = document.querySelector<HTMLInputElement>('[aria-label="Type a message"]'); if (input?.value) { onSend(input.value); input.value = ''; } }} className="rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                        </button>
                    </div>
                )}
            </div>
        );
    },
);
ChatBubble.displayName = 'ChatBubble';
export { ChatBubble };
export type { StyledChatBubbleProps as ChatBubbleProps };
