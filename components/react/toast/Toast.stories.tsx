import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Toaster, ToastAction } from './Toast';
import { useToast, toast as toastFn } from '@ds0/primitives';

const meta: Meta<typeof Toaster> = {
    title: 'Components/Feedback/Toast',
    component: Toaster,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ minHeight: 300, position: 'relative' }}>
                <Story />
                <Toaster position="bottom-right" />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

function ToastButton({ label, ...options }: { label: string } & Parameters<typeof toastFn>[0]) {
    return (
        <button
            onClick={() => toastFn(options)}
            style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ccc', cursor: 'pointer' }}
        >
            {label}
        </button>
    );
}

export const Default: Story = {
    render: () => <ToastButton label="Show Toast" title="Event created" description="Sunday, January 1, 2025" />,
};

export const Success: Story = {
    render: () => <ToastButton label="Success Toast" title="Saved" description="Changes saved successfully." variant="success" />,
};

export const Warning: Story = {
    render: () => <ToastButton label="Warning Toast" title="Caution" description="This action has side effects." variant="warning" />,
};

export const Destructive: Story = {
    render: () => <ToastButton label="Error Toast" title="Error" description="Something went wrong." variant="destructive" />,
};

export const WithAction: Story = {
    render: () => (
        <button
            onClick={() => toastFn({
                title: 'Item deleted',
                description: 'The item has been removed.',
                action: <ToastAction altText="Undo deletion" onClick={() => toastFn({ title: 'Undone!' })}>Undo</ToastAction>,
            })}
            style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ccc', cursor: 'pointer' }}
        >
            Delete Item
        </button>
    ),
};

export const Persistent: Story = {
    render: () => <ToastButton label="Persistent Toast" title="Notice" description="This won't auto-dismiss." duration={0} />,
};

export const MultipleToasts: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 8 }}>
            <ToastButton label="Toast 1" title="First" />
            <ToastButton label="Toast 2" title="Second" variant="success" />
            <ToastButton label="Toast 3" title="Third" variant="destructive" />
        </div>
    ),
};

export const Positions: Story = {
    render: () => (
        <div style={{ position: 'relative', minHeight: 400 }}>
            <Toaster position="top-right" />
            <button
                onClick={() => toastFn({ title: 'Top right!' })}
                style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ccc', cursor: 'pointer' }}
            >
                Show Top Right
            </button>
        </div>
    ),
};
