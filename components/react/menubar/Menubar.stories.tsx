import type { Meta, StoryObj } from '@storybook/react';
import { Menubar } from './Menubar';
const meta: Meta<typeof Menubar> = { title: 'Components/Navigation/Menubar', component: Menubar, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Menubar>;
export const Default: Story = {
    render: () => (
        <Menubar>
            <Menubar.Menu><Menubar.Trigger>File</Menubar.Trigger><Menubar.Content><Menubar.Item>New</Menubar.Item><Menubar.Item>Open</Menubar.Item><Menubar.Separator /><Menubar.Item>Save</Menubar.Item></Menubar.Content></Menubar.Menu>
            <Menubar.Menu><Menubar.Trigger>Edit</Menubar.Trigger><Menubar.Content><Menubar.Item>Undo</Menubar.Item><Menubar.Item>Redo</Menubar.Item></Menubar.Content></Menubar.Menu>
        </Menubar>
    ),
};
