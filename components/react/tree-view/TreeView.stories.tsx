import type { Meta, StoryObj } from '@storybook/react';
import { TreeView } from './TreeView';
const data = [
    { key: 'docs', label: '📁 Documents', children: [{ key: 'readme', label: '📄 readme.md' }, { key: 'projects', label: '📁 Projects', children: [{ key: 'p1', label: '📄 project-a.ts' }] }] },
    { key: 'images', label: '📁 Images', children: [{ key: 'img1', label: '🖼 photo.jpg' }] },
];
const meta: Meta<typeof TreeView> = { title: 'Components/Data Display/TreeView', component: TreeView, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['default', 'compact'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] }, selectionMode: { control: 'select', options: ['none', 'single', 'multiple'] } } };
export default meta;
type Story = StoryObj<typeof TreeView>;
export const Default: Story = { args: { data } };
export const WithSelection: Story = { args: { data, selectionMode: 'single' } };
export const Compact: Story = { args: { data, variant: 'compact' } };
export const Small: Story = { args: { data, size: 'sm' } };
