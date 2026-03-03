import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ForgotPasswordForm } from './ForgotPasswordForm';

const meta: Meta<typeof ForgotPasswordForm> = {
    title: 'Recipes/Authentication/ForgotPasswordForm',
    component: ForgotPasswordForm,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof ForgotPasswordForm>;

export const Default: Story = { args: { onSubmit: (data) => console.log('Submit:', data), onBack: () => { } } };
export const Loading: Story = { args: { onSubmit: (data) => console.log('Submit:', data), isLoading: true } };
export const Success: Story = { args: { onSubmit: (data) => console.log('Submit:', data), isSuccess: true, onBack: () => { } } };
export const WithError: Story = { args: { onSubmit: (data) => console.log('Submit:', data), error: 'No account found with this email address.' } };
