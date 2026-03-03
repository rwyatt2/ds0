import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileSettings } from './ProfileSettings';

const meta: Meta<typeof ProfileSettings> = {
    title: 'Recipes/Settings/ProfileSettings',
    component: ProfileSettings,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof ProfileSettings>;

const defaultValues = { name: 'John Doe', email: 'john@example.com', bio: 'Product designer and developer.', avatarUrl: '' };

export const Default: Story = { args: { initialValues: defaultValues, onSubmit: (d) => console.log(d), onCancel: () => { } } };
export const WithAvatar: Story = { args: { initialValues: { ...defaultValues, avatarUrl: 'https://i.pravatar.cc/150?u=ds0' }, onSubmit: (d) => console.log(d), onAvatarChange: () => { } } };
export const WithoutAvatar: Story = { args: { initialValues: defaultValues, onSubmit: (d) => console.log(d) } };
export const Loading: Story = { args: { initialValues: defaultValues, onSubmit: (d) => console.log(d), isLoading: true } };
export const WithError: Story = { args: { initialValues: defaultValues, onSubmit: (d) => console.log(d), error: 'Failed to save changes. Please try again.' } };
