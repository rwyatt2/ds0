import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
    title: 'Components/Data Input/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] }, isDisabled: { control: 'boolean' } },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = { args: { label: 'Notifications' } };
export const Checked: Story = { args: { label: 'Dark Mode', defaultChecked: true } };
export const Small: Story = { args: { label: 'Small switch', size: 'sm' } };
export const Large: Story = { args: { label: 'Large switch', size: 'lg' } };
export const WithDescription: Story = { args: { label: 'Marketing emails', description: 'Receive updates about new features and promotions' } };
export const Disabled: Story = { args: { label: 'Feature flag', isDisabled: true } };

export const SettingsExample: Story = {
    render: () => (
        <div className="flex flex-col gap-4 max-w-md divide-y">
            <Switch label="Notifications" description="Receive push notifications" defaultChecked />
            <Switch label="Dark Mode" description="Use dark theme across the app" className="pt-4" />
            <Switch label="Auto-save" description="Automatically save changes" defaultChecked className="pt-4" />
        </div>
    ),
};
