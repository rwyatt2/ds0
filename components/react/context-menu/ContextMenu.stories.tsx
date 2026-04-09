import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from './ContextMenu';
const meta: Meta<typeof ContextMenu> = { title: 'Components/Navigation/ContextMenu', component: ContextMenu, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof ContextMenu>;
export const Default: Story = {
    render: () => (
        <ContextMenu>
            <ContextMenu.Trigger><div className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm">Right click here</div></ContextMenu.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item onSelect={() => {}}>Copy</ContextMenu.Item>
                <ContextMenu.Item onSelect={() => {}}>Paste</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item onSelect={() => {}}>Delete</ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu>
    ),
};
