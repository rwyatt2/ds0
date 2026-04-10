'use client';

import { ChatBubble } from '../../../../components/react/chat-bubble';

const messages = [
    { id: '1', content: 'Hey! How can I help you today?', sender: 'bot' as const, timestamp: '10:30 AM' },
    { id: '2', content: 'I need help setting up DS0 in my project.', sender: 'user' as const, timestamp: '10:31 AM' },
    { id: '3', content: 'Sure! First, install the package with npm install @ds0/react. Then import the components you need.', sender: 'bot' as const, timestamp: '10:32 AM' },
    { id: '4', content: 'That was easy. Thanks! 🎉', sender: 'user' as const, timestamp: '10:33 AM' },
];

export function ChatBubblePreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md">
            <ChatBubble
                messages={messages}
                title="Support Chat"
                placeholder="Type a message..."
                onSend={() => {}}
            />
        </div>
    );
}
