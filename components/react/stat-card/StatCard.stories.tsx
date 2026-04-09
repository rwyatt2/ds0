import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = { title: 'Components/Data Display/StatCard', component: StatCard, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['default', 'outlined'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] } } };
export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = { args: { label: 'Total Revenue', value: '$12,345' } };
export const WithTrendUp: Story = { args: { label: 'Active Users', value: '2,847', trend: 12, trendLabel: 'vs last month' } };
export const WithTrendDown: Story = { args: { label: 'Bounce Rate', value: '38.2%', trend: -5.4, trendLabel: 'vs last month' } };
export const Outlined: Story = { args: { label: 'Conversions', value: '847', variant: 'outlined', trend: 3.2 } };
export const Small: Story = { args: { label: 'Revenue', value: '$12K', size: 'sm' } };
export const Large: Story = { args: { label: 'Total Revenue', value: '$1,234,567', size: 'lg', trend: 18.2, trendLabel: 'vs last quarter' } };

export const Dashboard: Story = {
    render: () => (
        <div className="grid grid-cols-4 gap-4">
            <StatCard label="Revenue" value="$45,231.89" trend={20.1} trendLabel="from last month" />
            <StatCard label="Subscriptions" value="+2,350" trend={180.1} trendLabel="from last month" />
            <StatCard label="Sales" value="+12,234" trend={19} trendLabel="from last month" />
            <StatCard label="Active Now" value="+573" trend={-2} trendLabel="since last hour" />
        </div>
    ),
};
