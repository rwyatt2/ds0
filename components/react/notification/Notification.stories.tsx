import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';

const meta: Meta<typeof Notification> = {
    title: 'Components/Feedback/Notification',
    component: Notification,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        isDismissible: { control: 'boolean' },
        title: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = { args: { children: 'This is an informational message.' } };
export const Info: Story = { args: { variant: 'info', title: 'Information', children: 'A new version is available.' } };
export const Success: Story = { args: { variant: 'success', title: 'Success', children: 'Your changes have been saved.' } };
export const Warning: Story = { args: { variant: 'warning', title: 'Warning', children: 'Your session will expire in 5 minutes.' } };
export const Error: Story = { args: { variant: 'error', title: 'Error', children: 'Could not save changes. Please try again.' } };
export const Dismissible: Story = { args: { variant: 'info', isDismissible: true, children: 'This notification can be dismissed.' } };
export const Small: Story = { args: { variant: 'info', size: 'sm', children: 'Small notification.' } };
export const Large: Story = { args: { variant: 'info', size: 'lg', title: 'Large Notification', children: 'This is a larger notification with more visual weight.' } };

export const AllVariants: Story = {
    render: () => (
        <div className="space-y-3 max-w-lg">
            <Notification variant="info" title="Info">Informational message.</Notification>
            <Notification variant="success" title="Success">Action completed.</Notification>
            <Notification variant="warning" title="Warning">Please review.</Notification>
            <Notification variant="error" title="Error">Something went wrong.</Notification>
        </div>
    ),
};
