import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';

import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
    title: 'Components/Feedback/Progress',
    component: Progress,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'success', 'warning', 'destructive'],
            description: 'Color variant',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Bar thickness',
        },
        value: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Current progress value',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
    args: {
        value: 50,
        label: 'Loading',
    },
};

export const Empty: Story = {
    args: {
        value: 0,
        label: 'Not started',
    },
};

export const Full: Story = {
    args: {
        value: 100,
        label: 'Complete',
    },
};

export const Indeterminate: Story = {
    args: {
        indeterminate: true,
        label: 'Loading...',
    },
};

export const WithLabel: Story = {
    args: {
        value: 60,
        label: 'Uploading files',
    },
};

export const WithValue: Story = {
    args: {
        value: 42,
        label: 'Progress',
        showValue: true,
    },
};

export const Success: Story = {
    args: {
        value: 100,
        variant: 'success',
        label: 'Upload complete',
        showValue: true,
    },
};

export const Warning: Story = {
    args: {
        value: 80,
        variant: 'warning',
        label: 'Storage almost full',
        showValue: true,
    },
};

export const Destructive: Story = {
    args: {
        value: 90,
        variant: 'destructive',
        label: 'Critical usage',
        showValue: true,
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
            <Progress value={60} size="sm" label="Small" />
            <Progress value={60} size="md" label="Medium" />
            <Progress value={60} size="lg" label="Large" />
        </div>
    ),
};

export const Animated: Story = {
    render: () => {
        const [value, setValue] = useState(0);
        useEffect(() => {
            const timer = setInterval(() => {
                setValue((v) => (v >= 100 ? 0 : v + 5));
            }, 300);
            return () => clearInterval(timer);
        }, []);
        return <Progress value={value} label="Uploading" showValue style={{ width: 300 }} />;
    },
};

export const FileUpload: Story = {
    render: () => (
        <div style={{ width: 400 }}>
            <Progress value={67} label="document.pdf — 67% uploaded" showValue variant="default" />
        </div>
    ),
};
