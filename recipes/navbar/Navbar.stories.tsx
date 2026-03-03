import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { Button } from '../../components/react/button';

const meta: Meta<typeof Navbar> = {
    title: 'Recipes/Navigation/Navbar',
    component: Navbar,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Navbar>;

const links = [
    { label: 'Home', href: '/', isActive: true },
    { label: 'Products', href: '/products' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
];

export const Default: Story = { args: { logo: <span className="text-lg font-bold">DS0</span>, links } };
export const WithUser: Story = {
    args: {
        logo: <span className="text-lg font-bold">DS0</span>,
        links,
        user: { name: 'John Doe', email: 'john@example.com' },
        onLogout: () => console.log('Logout'),
    },
};
export const WithActions: Story = {
    args: {
        logo: <span className="text-lg font-bold">DS0</span>,
        links,
        actions: <><Button variant="ghost" size="sm">Sign in</Button><Button size="sm">Sign up</Button></>,
    },
};
export const Sticky: Story = {
    args: {
        logo: <span className="text-lg font-bold">DS0</span>,
        links,
        sticky: true,
    },
};
