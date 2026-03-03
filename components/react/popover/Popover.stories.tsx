import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './index';

const meta: Meta<typeof Popover> = { title: 'Components/Overlay/Popover', component: Popover, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
    render: () => (
        <Popover>
            <Popover.Trigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Open</Popover.Trigger>
            <Popover.Content>
                <p>This is a popover with some content.</p>
            </Popover.Content>
        </Popover>
    ),
};
