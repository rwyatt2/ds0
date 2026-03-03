import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNavigation } from './SidebarNavigation';

const meta: Meta<typeof SidebarNavigation> = {
    title: 'Recipes/Navigation/SidebarNavigation',
    component: SidebarNavigation,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [(Story) => <div style={{ height: '600px' }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SidebarNavigation>;

const groups = [
    {
        label: 'Main', items: [
            { label: 'Dashboard', href: '/' },
            { label: 'Projects', href: '/projects', badge: 3 },
            { label: 'Tasks', href: '/tasks' },
        ]
    },
    {
        label: 'Settings', items: [
            { label: 'Profile', href: '/settings/profile' },
            { label: 'Team', href: '/settings/team' },
            { label: 'Billing', href: '/settings/billing', disabled: true },
        ]
    },
];

export const Default: Story = { args: { groups, currentPath: '/' } };
export const WithGroups: Story = { args: { groups, currentPath: '/projects' } };
export const WithBadges: Story = { args: { groups, currentPath: '/' } };
export const Collapsed: Story = { args: { groups, currentPath: '/', collapsed: true } };
export const WithHeaderAndFooter: Story = {
    args: {
        groups,
        currentPath: '/',
        header: <div className="text-sm font-semibold">My App</div>,
        footer: <button className="text-sm text-muted-foreground">Logout</button>,
    },
};
