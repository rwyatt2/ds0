import type { Meta, StoryObj } from '@storybook/react';

import { StatusDot } from './StatusDot';

const meta: Meta<typeof StatusDot> = {
    title: 'Components/Feedback/StatusDot',
    component: StatusDot,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['online', 'offline', 'busy', 'away', 'error', 'warning', 'neutral'],
            description: 'Status variant controlling color',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the indicator',
        },
        pulse: {
            control: 'boolean',
            description: 'Whether to show pulse animation',
        },
        label: {
            control: 'text',
            description: 'Accessible label for screen readers',
        },
    },
};

export default meta;
type Story = StoryObj<typeof StatusDot>;

export const Default: Story = {
    args: {
        variant: 'neutral',
        label: 'Neutral',
    },
};

export const Online: Story = {
    args: {
        variant: 'online',
        label: 'Online',
    },
};

export const Offline: Story = {
    args: {
        variant: 'offline',
        label: 'Offline',
    },
};

export const Busy: Story = {
    args: {
        variant: 'busy',
        label: 'Busy',
    },
};

export const Away: Story = {
    args: {
        variant: 'away',
        label: 'Away',
    },
};

export const ErrorStatus: Story = {
    args: {
        variant: 'error',
        label: 'Error',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        label: 'Warning',
    },
};

export const WithPulse: Story = {
    args: {
        variant: 'online',
        pulse: true,
        label: 'Online',
    },
};

export const Small: Story = {
    args: {
        variant: 'online',
        size: 'sm',
        label: 'Online',
    },
};

export const Medium: Story = {
    args: {
        variant: 'online',
        size: 'md',
        label: 'Online',
    },
};

export const Large: Story = {
    args: {
        variant: 'online',
        size: 'lg',
        label: 'Online',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <StatusDot variant="online" label="Online" />
                <span className="text-sm">Online</span>
            </div>
            <div className="flex items-center gap-2">
                <StatusDot variant="offline" label="Offline" />
                <span className="text-sm">Offline</span>
            </div>
            <div className="flex items-center gap-2">
                <StatusDot variant="busy" label="Busy" />
                <span className="text-sm">Busy</span>
            </div>
            <div className="flex items-center gap-2">
                <StatusDot variant="away" label="Away" />
                <span className="text-sm">Away</span>
            </div>
            <div className="flex items-center gap-2">
                <StatusDot variant="error" label="Error" />
                <span className="text-sm">Error</span>
            </div>
            <div className="flex items-center gap-2">
                <StatusDot variant="warning" label="Warning" />
                <span className="text-sm">Warning</span>
            </div>
            <div className="flex items-center gap-2">
                <StatusDot variant="neutral" label="Neutral" />
                <span className="text-sm">Neutral</span>
            </div>
        </div>
    ),
};

export const ContactList: Story = {
    render: () => (
        <div className="flex flex-col gap-3 w-64">
            {[
                { name: 'Alice Johnson', variant: 'online' as const },
                { name: 'Bob Smith', variant: 'busy' as const },
                { name: 'Carol White', variant: 'away' as const },
                { name: 'Dave Brown', variant: 'offline' as const },
            ].map((contact) => (
                <div key={contact.name} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                    <StatusDot variant={contact.variant} label={`${contact.name} is ${contact.variant}`} />
                    <span className="text-sm font-medium">{contact.name}</span>
                </div>
            ))}
        </div>
    ),
};
