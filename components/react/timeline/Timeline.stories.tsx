import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem, TimelineDot, TimelineConnector, TimelineContent } from './Timeline';

const meta: Meta<typeof Timeline> = { title: 'Components/Data Display/Timeline', component: Timeline, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['default', 'alternate', 'right'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] } } };
export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = { render: (args) => (
    <Timeline {...args}>
        <TimelineItem><TimelineDot active /><TimelineConnector /><TimelineContent><strong>Order Placed</strong><span>March 20, 2026</span></TimelineContent></TimelineItem>
        <TimelineItem><TimelineDot /><TimelineConnector /><TimelineContent><strong>Shipped</strong><span>March 22, 2026</span></TimelineContent></TimelineItem>
        <TimelineItem><TimelineDot /><TimelineContent><strong>Delivered</strong><span>March 25, 2026</span></TimelineContent></TimelineItem>
    </Timeline>
) };

export const Small: Story = { ...Default, args: { size: 'sm' } };
export const Large: Story = { ...Default, args: { size: 'lg' } };
