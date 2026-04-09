import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette } from './CommandPalette';
const meta: Meta<typeof CommandPalette> = { title: 'Recipes/Commerce/CommandPalette', component: CommandPalette, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof CommandPalette>;
const items = [{ id: '1', label: 'New File', shortcut: '⌘N', group: 'File' }, { id: '2', label: 'Open File', shortcut: '⌘O', group: 'File' }, { id: '3', label: 'Search', shortcut: '⌘K', group: 'Edit' }, { id: '4', label: 'Settings', shortcut: '⌘,', group: 'App' }];
export const Default: Story = { args: { items, open: true } };
