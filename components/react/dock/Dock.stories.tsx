import type { Meta, StoryObj } from '@storybook/react';
import { Dock } from './Dock';

const meta: Meta<typeof Dock> = {
  title: 'Components/Layout/Dock',
  component: Dock,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: ['default', 'floating', 'glass'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] } },
};
export default meta;
type Story = StoryObj<typeof Dock>;

export const Default: Story = { args: { children: <div><p className="text-sm">Draggable floating panel</p></div> } };
export const Glass: Story = { args: { variant: 'glass', children: <p className="text-sm">Glassmorphism panel</p> } };
export const Small: Story = { args: { size: 'sm', children: <p className="text-sm">Compact</p> } };
