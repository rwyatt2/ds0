import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ErrorPage } from './ErrorPage';

const meta: Meta<typeof ErrorPage> = {
    title: 'Recipes/Feedback/ErrorPage',
    component: ErrorPage,
    tags: ['autodocs'],
    argTypes: {
        code: { control: 'text', description: 'Error code' },
        title: { control: 'text', description: 'Error heading' },
        description: { control: 'text', description: 'Error description' },
    },
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

export const NotFound: Story = {
    args: {
        code: 404,
        title: 'Page not found',
        description: 'The page you are looking for does not exist or has been moved.',
        onGoHome: () => { },
    },
};

export const ServerError: Story = {
    args: {
        code: 500,
        title: 'Internal server error',
        description: 'An unexpected error occurred. Please try again later.',
        onRetry: () => { },
        onGoHome: () => { },
    },
};

export const Forbidden: Story = {
    args: {
        code: 403,
        title: 'Access denied',
        description: 'You do not have permission to view this page.',
        onGoHome: () => { },
    },
};

export const Generic: Story = {
    args: {
        title: 'Something went wrong',
        description: 'An unexpected error occurred.',
        onRetry: () => { },
    },
};

export const WithRetry: Story = {
    args: {
        code: 503,
        title: 'Service unavailable',
        description: 'The service is temporarily down for maintenance.',
        onRetry: () => { },
    },
};

export const WithoutCode: Story = {
    args: {
        title: 'Connection lost',
        description: 'Please check your internet connection and try again.',
        onRetry: () => { },
        onGoHome: () => { },
    },
};
