import type { Meta, StoryObj } from '@storybook/react';
import { RichText } from './RichText';
const meta: Meta<typeof RichText> = { title: 'Components/Data Input/RichText', component: RichText, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['default', 'minimal'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] } } };
export default meta;
type Story = StoryObj<typeof RichText>;
export const Default: Story = { args: { placeholder: 'Start writing...' } };
export const Minimal: Story = { args: { variant: 'minimal', placeholder: 'Add a comment...' } };
export const WithCharLimit: Story = { args: { maxLength: 500, placeholder: 'Write up to 500 characters...' } };
export const Large: Story = { args: { size: 'lg', placeholder: 'Write your article...' } };
