import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
    title: 'Components/Data Display/Badge', component: Badge, tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'success', 'warning', 'outline'] },
        size: { control: 'select', options: ['sm', 'md'] },
    },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: 'Badge' } };
export const Secondary: Story = { args: { children: 'Secondary', variant: 'secondary' } };
export const Destructive: Story = { args: { children: 'Error', variant: 'destructive' } };
export const Success: Story = { args: { children: 'Active', variant: 'success' } };
export const Warning: Story = { args: { children: 'Warning', variant: 'warning' } };
export const Outline: Story = { args: { children: 'Draft', variant: 'outline' } };
export const Small: Story = { args: { children: 'SM', size: 'sm' } };

export const AllVariants: Story = {
    render: () => (
        <div className="flex gap-2">
            <Badge>Default</Badge><Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Error</Badge><Badge variant="success">Active</Badge>
            <Badge variant="warning">Warning</Badge><Badge variant="outline">Draft</Badge>
        </div>
    ),
};
