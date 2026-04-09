import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
const meta: Meta<typeof DatePicker> = { title: 'Components/Data Input/DatePicker', component: DatePicker, tags: ['autodocs'], argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } } };
export default meta;
type Story = StoryObj<typeof DatePicker>;
export const Default: Story = { args: {} };
export const WithMinMax: Story = { args: { min: new Date('2026-01-01'), max: new Date('2026-12-31') } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
