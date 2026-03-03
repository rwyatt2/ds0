import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
    title: 'Components/Feedback/Alert',
    component: Alert,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'info', 'success', 'warning', 'destructive'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
    render: () => (
        <Alert>
            <Alert.Title>Default Alert</Alert.Title>
            <Alert.Description>This is a default alert with no special styling.</Alert.Description>
        </Alert>
    ),
};

export const Info: Story = {
    render: () => (
        <Alert variant="info">
            <Alert.Title>Heads up!</Alert.Title>
            <Alert.Description>You can add components to your app using the CLI.</Alert.Description>
        </Alert>
    ),
};

export const Success: Story = {
    render: () => (
        <Alert variant="success">
            <Alert.Title>Success!</Alert.Title>
            <Alert.Description>Your changes have been saved successfully.</Alert.Description>
        </Alert>
    ),
};

export const Warning: Story = {
    render: () => (
        <Alert variant="warning">
            <Alert.Title>Warning</Alert.Title>
            <Alert.Description>Your session is about to expire. Please save your work.</Alert.Description>
        </Alert>
    ),
};

export const Destructive: Story = {
    render: () => (
        <Alert variant="destructive">
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>Something went wrong. Please try again later.</Alert.Description>
        </Alert>
    ),
};

export const Dismissible: Story = {
    render: () => (
        <Alert variant="info" isDismissible>
            <Alert.Title>Dismissible Alert</Alert.Title>
            <Alert.Description>Click the X button to dismiss this alert.</Alert.Description>
        </Alert>
    ),
};

export const DismissibleWithCallback: Story = {
    render: () => (
        <Alert
            variant="warning"
            isDismissible
            onDismiss={() => console.log('Alert dismissed!')}
        >
            <Alert.Title>Callback Alert</Alert.Title>
            <Alert.Description>Check the console when you dismiss this.</Alert.Description>
        </Alert>
    ),
};

export const TitleOnly: Story = {
    render: () => (
        <Alert variant="info">
            <Alert.Title>Just a title, no description.</Alert.Title>
        </Alert>
    ),
};

export const LongContent: Story = {
    render: () => (
        <Alert variant="info">
            <Alert.Title>Important Update</Alert.Title>
            <Alert.Description>
                We've made significant changes to our API. Please review the migration guide to ensure
                your application continues to work correctly. The changes include updated authentication
                flows, new rate limiting policies, and deprecation of several legacy endpoints.
            </Alert.Description>
        </Alert>
    ),
};

export const AllVariants: Story = {
    render: () => (
        <div className="space-y-4">
            <Alert variant="default">
                <Alert.Title>Default</Alert.Title>
                <Alert.Description>Default alert variant.</Alert.Description>
            </Alert>
            <Alert variant="info">
                <Alert.Title>Info</Alert.Title>
                <Alert.Description>Informational alert.</Alert.Description>
            </Alert>
            <Alert variant="success">
                <Alert.Title>Success</Alert.Title>
                <Alert.Description>Success alert.</Alert.Description>
            </Alert>
            <Alert variant="warning">
                <Alert.Title>Warning</Alert.Title>
                <Alert.Description>Warning alert.</Alert.Description>
            </Alert>
            <Alert variant="destructive">
                <Alert.Title>Destructive</Alert.Title>
                <Alert.Description>Destructive alert.</Alert.Description>
            </Alert>
        </div>
    ),
};
