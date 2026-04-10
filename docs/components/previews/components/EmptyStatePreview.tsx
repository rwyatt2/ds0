'use client';

import { EmptyState } from '../../../../components/react/empty-state';

const InboxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
);

export function EmptyStatePreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md">
            <EmptyState
                icon={<InboxIcon />}
                title="No messages yet"
                description="When you receive messages, they will appear here. Start a conversation to get going."
                action={
                    <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                        Compose Message
                    </button>
                }
            />
        </div>
    );
}
