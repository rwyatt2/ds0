import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';
const meta: Meta<typeof FileUpload> = { title: 'Components/Data Input/FileUpload', component: FileUpload, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['dropzone', 'button'] }, size: { control: 'select', options: ['sm', 'md', 'lg'] } } };
export default meta;
type Story = StoryObj<typeof FileUpload>;
export const Default: Story = { args: { accept: '.jpg,.png,.pdf', maxSize: 5 * 1024 * 1024 } };
export const ButtonVariant: Story = { args: { variant: 'button' } };
export const Multiple: Story = { args: { multiple: true, maxFiles: 5 } };
export const Small: Story = { args: { size: 'sm' } };
