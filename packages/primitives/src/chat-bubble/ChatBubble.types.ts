import type React from 'react';
export interface ChatMessage { id: string; content: string; sender: 'user' | 'bot' | 'system'; timestamp?: Date; avatar?: string; }
export interface UseChatBubbleProps { messages: ChatMessage[]; onSend?: (message: string) => void; }
export interface UseChatBubbleReturn { chatProps: React.HTMLAttributes<HTMLDivElement>; inputProps: React.InputHTMLAttributes<HTMLInputElement>; }
export interface ChatBubbleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseChatBubbleProps { title?: string; placeholder?: string; }
export interface StyledChatBubbleProps extends ChatBubbleProps { variant?: 'default' | 'minimal'; size?: 'sm' | 'md' | 'lg'; className?: string; }
