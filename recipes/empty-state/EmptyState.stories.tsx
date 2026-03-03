import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
    title: 'Recipes/Feedback/EmptyState',
    component: EmptyState,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text', description: 'Heading text' },
        description: { control: 'text', description: 'Supporting description' },
    },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

const InboxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);

export const Default: Story = {
    args: {
        title: 'No results found',
        description: 'Try adjusting your search or filter to find what you are looking for.',
    },
};

export const WithIcon: Story = {
    args: {
        icon: <InboxIcon />,
        title: 'Your inbox is empty',
        description: 'New messages will appear here when you receive them.',
    },
};

export const WithAction: Story = {
    args: {
        icon: <SearchIcon />,
        title: 'No results found',
        description: 'We could not find anything matching your search.',
        action: { label: 'Clear search', onClick: () => { } },
    },
};

export const WithBothActions: Story = {
    args: {
        icon: <InboxIcon />,
        title: 'No projects yet',
        description: 'Get started by creating your first project.',
        action: { label: 'Create project', onClick: () => { } },
        secondaryAction: { label: 'Learn more', onClick: () => { } },
    },
};

export const WithoutDescription: Story = {
    args: {
        icon: <InboxIcon />,
        title: 'Nothing here',
    },
};

export const InCard: Story = {
    render: () => (
        <div className="rounded-lg border bg-card p-6 max-w-lg mx-auto">
            <EmptyState
                icon={<InboxIcon />}
                title="No notifications"
                description="You are all caught up!"
            />
        </div>
    ),
};

export const MinimalTitle: Story = {
    args: {
        title: 'No data available',
    },
};
