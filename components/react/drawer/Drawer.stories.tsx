import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Drawer } from './index';

const meta: Meta<typeof Drawer> = { title: 'Components/Overlay/Drawer', component: Drawer, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Right: Story = {
    render: () => (
        <Drawer>
            <Drawer.Trigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Open Right</Drawer.Trigger>
            <Drawer.Content><Drawer.Title>Menu</Drawer.Title><Drawer.Description>Navigation links</Drawer.Description><Drawer.Close>×</Drawer.Close></Drawer.Content>
        </Drawer>
    ),
};

export const Left: Story = {
    render: () => (
        <Drawer side="left">
            <Drawer.Trigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Open Left</Drawer.Trigger>
            <Drawer.Content><Drawer.Title>Sidebar</Drawer.Title><Drawer.Description>App navigation</Drawer.Description></Drawer.Content>
        </Drawer>
    ),
};

export const Bottom: Story = {
    render: () => (
        <Drawer side="bottom">
            <Drawer.Trigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Open Bottom</Drawer.Trigger>
            <Drawer.Content><Drawer.Title>Actions</Drawer.Title><Drawer.Description>Select an action</Drawer.Description></Drawer.Content>
        </Drawer>
    ),
};
