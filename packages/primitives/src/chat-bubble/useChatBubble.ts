import { useCallback } from 'react';
import type { UseChatBubbleProps, UseChatBubbleReturn } from './ChatBubble.types';
export function useChatBubble(props: UseChatBubbleProps): UseChatBubbleReturn {
    const { onSend } = props;
    return {
        chatProps: { role: 'log', 'aria-label': 'Chat messages', 'aria-live': 'polite' },
        inputProps: { type: 'text', 'aria-label': 'Type a message', autoComplete: 'off',
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter' && e.currentTarget.value.trim()) { e.preventDefault(); onSend?.(e.currentTarget.value.trim()); e.currentTarget.value = ''; } },
        },
    };
}
