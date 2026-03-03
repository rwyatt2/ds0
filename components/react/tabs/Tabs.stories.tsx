import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
    title: 'Components/Navigation/Tabs',
    component: Tabs,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    render: () => (
        <Tabs defaultValue="account">
            <Tabs.List>
                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                <Tabs.Trigger value="password">Password</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="account">
                <p className="text-sm text-muted-foreground">Make changes to your account here.</p>
            </Tabs.Content>
            <Tabs.Content value="password">
                <p className="text-sm text-muted-foreground">Change your password here.</p>
            </Tabs.Content>
        </Tabs>
    ),
};

export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState('account');
        return (
            <Tabs value={value} onValueChange={setValue}>
                <Tabs.List>
                    <Tabs.Trigger value="account">Account</Tabs.Trigger>
                    <Tabs.Trigger value="password">Password</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="account">Account settings content</Tabs.Content>
                <Tabs.Content value="password">Password settings content</Tabs.Content>
            </Tabs>
        );
    },
};

export const Vertical: Story = {
    render: () => (
        <Tabs defaultValue="general" orientation="vertical">
            <Tabs.List>
                <Tabs.Trigger value="general">General</Tabs.Trigger>
                <Tabs.Trigger value="security">Security</Tabs.Trigger>
                <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="general">General settings</Tabs.Content>
            <Tabs.Content value="security">Security settings</Tabs.Content>
            <Tabs.Content value="notifications">Notification preferences</Tabs.Content>
        </Tabs>
    ),
};

export const ManualActivation: Story = {
    render: () => (
        <Tabs defaultValue="tab1" activationMode="manual">
            <Tabs.List>
                <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">Content for Tab 1. Use Enter/Space to activate tabs.</Tabs.Content>
            <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
            <Tabs.Content value="tab3">Content for Tab 3</Tabs.Content>
        </Tabs>
    ),
};

export const WithDisabledTab: Story = {
    render: () => (
        <Tabs defaultValue="tab1">
            <Tabs.List>
                <Tabs.Trigger value="tab1">Active</Tabs.Trigger>
                <Tabs.Trigger value="tab2" isDisabled>Disabled</Tabs.Trigger>
                <Tabs.Trigger value="tab3">Another</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">First tab content</Tabs.Content>
            <Tabs.Content value="tab2">You cannot see this</Tabs.Content>
            <Tabs.Content value="tab3">Third tab content</Tabs.Content>
        </Tabs>
    ),
};

export const WithIcons: Story = {
    render: () => (
        <Tabs defaultValue="overview">
            <Tabs.List>
                <Tabs.Trigger value="overview">📊 Overview</Tabs.Trigger>
                <Tabs.Trigger value="analytics">📈 Analytics</Tabs.Trigger>
                <Tabs.Trigger value="reports">📄 Reports</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="overview">Overview dashboard content</Tabs.Content>
            <Tabs.Content value="analytics">Analytics charts and data</Tabs.Content>
            <Tabs.Content value="reports">Generated reports</Tabs.Content>
        </Tabs>
    ),
};

export const WithBadgeCounts: Story = {
    render: () => (
        <Tabs defaultValue="inbox">
            <Tabs.List>
                <Tabs.Trigger value="inbox">Inbox (12)</Tabs.Trigger>
                <Tabs.Trigger value="drafts">Drafts (3)</Tabs.Trigger>
                <Tabs.Trigger value="sent">Sent</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="inbox">12 unread messages</Tabs.Content>
            <Tabs.Content value="drafts">3 draft messages</Tabs.Content>
            <Tabs.Content value="sent">Sent messages</Tabs.Content>
        </Tabs>
    ),
};

export const FullWidthTriggers: Story = {
    render: () => (
        <Tabs defaultValue="tab1">
            <Tabs.List className="w-full">
                <Tabs.Trigger value="tab1" className="flex-1">Tab 1</Tabs.Trigger>
                <Tabs.Trigger value="tab2" className="flex-1">Tab 2</Tabs.Trigger>
                <Tabs.Trigger value="tab3" className="flex-1">Tab 3</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">Full width content 1</Tabs.Content>
            <Tabs.Content value="tab2">Full width content 2</Tabs.Content>
            <Tabs.Content value="tab3">Full width content 3</Tabs.Content>
        </Tabs>
    ),
};

export const InCard: Story = {
    render: () => (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Tabs defaultValue="overview">
                <Tabs.List>
                    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                    <Tabs.Trigger value="details">Details</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="overview">
                    <p className="text-sm">Project overview content inside a card.</p>
                </Tabs.Content>
                <Tabs.Content value="details">
                    <p className="text-sm">Detailed project information.</p>
                </Tabs.Content>
            </Tabs>
        </div>
    ),
};

export const WithForm: Story = {
    render: () => (
        <Tabs defaultValue="account">
            <Tabs.List>
                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="account">
                <div className="space-y-4 pt-4">
                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" placeholder="Enter name" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" placeholder="Enter email" />
                    </div>
                </div>
            </Tabs.Content>
            <Tabs.Content value="billing">
                <div className="space-y-4 pt-4">
                    <div>
                        <label className="text-sm font-medium">Card Number</label>
                        <input className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" placeholder="4242 4242 4242 4242" />
                    </div>
                </div>
            </Tabs.Content>
        </Tabs>
    ),
};
