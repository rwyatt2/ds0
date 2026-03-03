import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';

const meta: Meta<typeof DashboardLayout> = {
    title: 'Recipes/Dashboard/DashboardLayout',
    component: DashboardLayout,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof DashboardLayout>;

const SampleSidebar = () => (
    <nav className="flex h-full w-64 flex-col border-r bg-card p-4" aria-label="Dashboard nav">
        <div className="font-bold mb-6">MyApp</div>
        <ul className="space-y-2 text-sm">
            <li className="rounded-md bg-accent px-3 py-2">Dashboard</li>
            <li className="rounded-md px-3 py-2 text-muted-foreground">Projects</li>
            <li className="rounded-md px-3 py-2 text-muted-foreground">Settings</li>
        </ul>
    </nav>
);

const SampleHeader = () => (
    <header className="flex h-14 items-center border-b px-6">
        <span className="text-sm text-muted-foreground ml-10 lg:ml-0">Dashboard Overview</span>
    </header>
);

export const Default: Story = {
    args: {
        sidebar: <SampleSidebar />,
        header: <SampleHeader />,
        children: <div className="grid gap-4"><div className="rounded-lg border p-8 text-center text-muted-foreground">Main content area</div></div>,
    },
};

export const WithoutHeader: Story = {
    args: {
        sidebar: <SampleSidebar />,
        children: <div className="rounded-lg border p-8 text-center text-muted-foreground">Content without header</div>,
    },
};
