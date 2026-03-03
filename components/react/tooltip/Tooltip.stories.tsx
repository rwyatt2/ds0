import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './index';

const meta: Meta<typeof Tooltip> = { title: 'Components/Overlay/Tooltip', component: Tooltip, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    render: () => (
        <Tooltip>
            <Tooltip.Trigger><button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm">Hover me</button></Tooltip.Trigger>
            <Tooltip.Content>This is a tooltip</Tooltip.Content>
        </Tooltip>
    ),
};

export const Instant: Story = {
    render: () => (
        <Tooltip delayDuration={0}>
            <Tooltip.Trigger><button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm">No delay</button></Tooltip.Trigger>
            <Tooltip.Content>Instant tooltip</Tooltip.Content>
        </Tooltip>
    ),
};
