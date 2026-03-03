import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationSettings } from './NotificationSettings';

const meta: Meta<typeof NotificationSettings> = {
    title: 'Recipes/Settings/NotificationSettings',
    component: NotificationSettings,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof NotificationSettings>;

const settings = [
    { id: '1', category: 'Email', label: 'Marketing emails', description: 'Receive promotional emails and offers', enabled: true },
    { id: '2', category: 'Email', label: 'Product updates', description: 'New features, improvements, and releases', enabled: true },
    { id: '3', category: 'Email', label: 'Security alerts', description: 'Important security notifications', enabled: true },
    { id: '4', category: 'Push Notifications', label: 'Messages', description: 'Notifications for new messages', enabled: false },
    { id: '5', category: 'Push Notifications', label: 'Mentions', description: 'When someone mentions you', enabled: true },
    { id: '6', category: 'Push Notifications', label: 'Reminders', description: 'Task and event reminders', enabled: false },
];

export const Default: Story = { args: { settings, onSettingChange: (id, v) => console.log(id, v), onSave: () => { } } };
export const AllEnabled: Story = { args: { settings: settings.map(s => ({ ...s, enabled: true })), onSettingChange: (id, v) => console.log(id, v) } };
export const AllDisabled: Story = { args: { settings: settings.map(s => ({ ...s, enabled: false })), onSettingChange: (id, v) => console.log(id, v) } };
export const Loading: Story = { args: { settings, onSettingChange: (id, v) => console.log(id, v), onSave: () => { }, isLoading: true } };
export const SingleCategory: Story = { args: { settings: settings.filter(s => s.category === 'Email'), onSettingChange: (id, v) => console.log(id, v) } };
