import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';
const meta: Meta<typeof ColorPicker> = { title: 'Components/Data Input/ColorPicker', component: ColorPicker, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['default', 'inline'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] } } };
export default meta;
type Story = StoryObj<typeof ColorPicker>;
export const Default: Story = { args: { defaultValue: '#3B82F6' } };
export const WithSwatches: Story = { args: { defaultValue: '#3B82F6', swatches: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'] } };
export const Inline: Story = { args: { variant: 'inline', defaultValue: '#3B82F6' } };
export const Small: Story = { args: { size: 'sm', defaultValue: '#3B82F6' } };
