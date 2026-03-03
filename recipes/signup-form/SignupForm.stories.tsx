import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SignupForm } from './SignupForm';

const meta: Meta<typeof SignupForm> = {
    title: 'Recipes/Authentication/SignupForm',
    component: SignupForm,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Default: Story = { args: { onSubmit: (data) => console.log('Submit:', data) } };
export const WithSocialProviders: Story = {
    args: {
        onSubmit: (data) => console.log('Submit:', data),
        onSocialSignup: (p) => console.log('Social:', p),
        socialProviders: [
            { name: 'Google', icon: <span>G</span> },
            { name: 'GitHub', icon: <span>GH</span> },
        ],
    },
};
export const WithPasswordRequirements: Story = {
    args: {
        onSubmit: (data) => console.log('Submit:', data),
        passwordRequirements: ['At least 8 characters', 'One uppercase letter', 'One number'],
    },
};
export const WithTermsCheckbox: Story = {
    args: {
        onSubmit: (data) => console.log('Submit:', data),
        termsUrl: '/terms',
        privacyUrl: '/privacy',
    },
};
export const WithError: Story = {
    args: { onSubmit: (data) => console.log('Submit:', data), error: 'An account with this email already exists.' },
};
export const Loading: Story = {
    args: { onSubmit: (data) => console.log('Submit:', data), isLoading: true },
};
export const Minimal: Story = {
    args: { onSubmit: (data) => console.log('Submit:', data) },
};
