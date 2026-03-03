import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AccountSettings } from './AccountSettings';

const meta: Meta<typeof AccountSettings> = {
    title: 'Recipes/Settings/AccountSettings',
    component: AccountSettings,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof AccountSettings>;

export const Default: Story = {
    args: {
        email: 'john@example.com',
        onChangePassword: (d) => console.log('Password:', d),
        onChangeEmail: (e) => console.log('Email:', e),
        onDeleteAccount: () => console.log('Delete'),
    },
};
