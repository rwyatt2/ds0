import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
    title: 'Components/Typography/Label',
    component: Label,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: ['sm', 'md'] },
        required: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = { args: { htmlFor: 'email', children: 'Email' } };
export const Required: Story = { args: { htmlFor: 'email', required: true, children: 'Email' } };
export const Disabled: Story = { args: { htmlFor: 'email', disabled: true, children: 'Email' } };
export const Small: Story = { args: { htmlFor: 'email', size: 'sm', children: 'Email' } };

export const WithInput: Story = {
    render: () => (
        <div className="flex flex-col gap-2">
            <Label htmlFor="demo-email" required>Email Address</Label>
            <input id="demo-email" type="email" className="border rounded px-3 py-2 text-sm" placeholder="you@example.com" />
        </div>
    ),
};
