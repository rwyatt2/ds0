import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DashboardStats } from './DashboardStats';

const meta: Meta<typeof DashboardStats> = {
    title: 'Recipes/Dashboard/DashboardStats',
    component: DashboardStats,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DashboardStats>;

const stats = [
    { label: 'Total Revenue', value: '$45,231.89', change: 20.1, changePeriod: 'from last month' },
    { label: 'Subscriptions', value: '+2,350', change: 180.1, changePeriod: 'from last month' },
    { label: 'Sales', value: '+12,234', change: 19, changePeriod: 'from last month' },
    { label: 'Active Now', value: '+573', change: -2.4, changePeriod: 'since last hour' },
];

export const Default: Story = { args: { stats } };
export const TwoColumns: Story = { args: { stats: stats.slice(0, 2), columns: 2 } };
export const ThreeColumns: Story = { args: { stats: stats.slice(0, 3), columns: 3 } };
export const Loading: Story = { args: { stats, isLoading: true } };
export const WithoutTrends: Story = { args: { stats: stats.map(({ change, changePeriod, ...rest }) => rest) } };
