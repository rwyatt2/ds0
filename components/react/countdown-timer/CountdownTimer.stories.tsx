import type { Meta, StoryObj } from '@storybook/react';
import { CountdownTimer } from './CountdownTimer';
const meta: Meta<typeof CountdownTimer> = { title: 'Components/Data Display/CountdownTimer', component: CountdownTimer, tags: ['autodocs'], argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] }, showLabels: { control: 'boolean' } } };
export default meta;
type Story = StoryObj<typeof CountdownTimer>;

const futureDate = new Date(Date.now() + 86400000 + 3661000); // ~1d 1h 1m 1s

export const Default: Story = { args: { targetDate: futureDate } };
export const Small: Story = { args: { targetDate: futureDate, size: 'sm' } };
export const Large: Story = { args: { targetDate: futureDate, size: 'lg' } };
export const NoLabels: Story = { args: { targetDate: futureDate, showLabels: false } };
export const FlashSale: Story = {
    render: () => (
        <div className="rounded-lg border p-6 text-center space-y-3 max-w-md">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Flash Sale Ends In</p>
            <CountdownTimer targetDate={new Date(Date.now() + 7200000)} size="lg" />
            <p className="text-xs text-muted-foreground">Don't miss out on 50% off!</p>
        </div>
    ),
};
