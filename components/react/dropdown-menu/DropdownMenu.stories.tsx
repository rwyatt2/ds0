import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
    title: 'Components/Navigation/DropdownMenu',
    component: DropdownMenu,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenu.Trigger className="rounded-md border px-4 py-2 text-sm">Open Menu</DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>My Account</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onSelect={() => {}}>Profile</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => {}}>Settings</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => {}}>Billing</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onSelect={() => {}}>Sign out</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu>
    ),
};

export const WithDisabledItem: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenu.Trigger className="rounded-md border px-4 py-2 text-sm">Actions</DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item onSelect={() => {}}>Edit</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => {}}>Duplicate</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item isDisabled>Archive</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => {}}>Delete</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu>
    ),
};
