import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
    title: 'Components/Feedback/Banner',
    component: Banner,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['info', 'warning', 'error', 'success', 'promotional'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        isDismissible: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
    args: {
        children: 'We\'re launching a new feature next week!',
    },
};

export const Info: Story = {
    args: {
        variant: 'info',
        children: 'A new version of DS0 is available. Update to get the latest improvements.',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        children: 'Scheduled maintenance on Sunday, 2:00 AM — 4:00 AM UTC.',
    },
};

export const Error: Story = {
    args: {
        variant: 'error',
        children: 'Some services are currently experiencing issues. We\'re working on a fix.',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Your account has been successfully upgraded to Pro!',
    },
};

export const Promotional: Story = {
    args: {
        variant: 'promotional',
        children: '🎉 Spring sale — 20% off all plans through April 30th!',
    },
};

export const Dismissible: Story = {
    args: {
        variant: 'info',
        isDismissible: true,
        children: 'This banner can be dismissed by clicking the X button.',
    },
};

export const Small: Story = {
    args: {
        variant: 'info',
        size: 'sm',
        children: 'Small banner message',
    },
};

export const Large: Story = {
    args: {
        variant: 'info',
        size: 'lg',
        children: 'Large banner for high-impact announcements',
    },
};

export const InteractiveDismiss: Story = {
    render: () => {
        const [visible, setVisible] = useState(true);
        return (
            <div className="space-y-4">
                {visible ? (
                    <Banner variant="warning" isDismissible onDismiss={() => setVisible(false)}>
                        Scheduled maintenance on Sunday. Click X to dismiss.
                    </Banner>
                ) : (
                    <button
                        className="text-sm text-blue-600 underline"
                        onClick={() => setVisible(true)}
                    >
                        Show banner again
                    </button>
                )}
            </div>
        );
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="space-y-2">
            <Banner variant="info">Info: A new version is available.</Banner>
            <Banner variant="warning">Warning: Maintenance scheduled.</Banner>
            <Banner variant="error">Error: Service disruption detected.</Banner>
            <Banner variant="success">Success: Deployment completed.</Banner>
            <Banner variant="promotional">🎉 Promotional: 20% off all plans!</Banner>
        </div>
    ),
};
