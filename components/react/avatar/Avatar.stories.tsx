import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = { title: 'Components/Data Display/Avatar', component: Avatar, tags: ['autodocs'], argTypes: { size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] }, shape: { control: 'select', options: ['circle', 'square'] } } };
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = { args: { alt: 'John Doe', fallback: 'JD' } };
export const WithImage: Story = { args: { src: 'https://i.pravatar.cc/100', alt: 'User' } };
export const Square: Story = { args: { alt: 'John', fallback: 'JD', shape: 'square' } };
export const AllSizes: Story = {
    render: () => (
        <div className="flex items-center gap-2">
            <Avatar alt="XS" fallback="XS" size="xs" />
            <Avatar alt="SM" fallback="SM" size="sm" />
            <Avatar alt="MD" fallback="MD" size="md" />
            <Avatar alt="LG" fallback="LG" size="lg" />
            <Avatar alt="XL" fallback="XL" size="xl" />
        </div>
    ),
};
