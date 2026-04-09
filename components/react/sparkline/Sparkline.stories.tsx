import type { Meta, StoryObj } from '@storybook/react';
import { Sparkline } from './Sparkline';
const meta: Meta<typeof Sparkline> = { title: 'Components/Data Viz/Sparkline', component: Sparkline, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['default', 'success', 'danger'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] } } };
export default meta;
type Story = StoryObj<typeof Sparkline>;
const upData = [2, 4, 3, 7, 8, 6, 9, 11, 14, 12, 15];
const downData = [15, 14, 11, 12, 8, 9, 7, 5, 3, 4, 2];
export const Default: Story = { args: { data: upData } };
export const Success: Story = { args: { data: upData, variant: 'success' } };
export const Danger: Story = { args: { data: downData, variant: 'danger' } };
export const Large: Story = { args: { data: upData, size: 'lg', variant: 'success' } };
export const InStatCard: Story = {
    render: () => (
        <div className="flex items-center gap-4 rounded-lg border p-4">
            <div><p className="text-sm text-muted-foreground">Revenue</p><p className="text-2xl font-bold">$12,345</p></div>
            <Sparkline data={upData} variant="success" size="lg" />
        </div>
    ),
};
