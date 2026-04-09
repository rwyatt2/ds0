import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble } from './ChatBubble';
const meta: Meta<typeof ChatBubble> = { title: 'Recipes/Commerce/ChatBubble', component: ChatBubble, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof ChatBubble>;
const msgs = [{ id: '1', content: 'Hi! How can I help?', sender: 'bot' as const }, { id: '2', content: 'I need help with my order', sender: 'user' as const }, { id: '3', content: 'Sure! What is your order number?', sender: 'bot' as const }];
export const Default: Story = { args: { messages: msgs, title: 'Support Chat', onSend: (m) => console.log(m) } };
export const ReadOnly: Story = { args: { messages: msgs, title: 'Chat History' } };
