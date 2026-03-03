import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = { title: 'Components/Data Input/Slider', component: Slider, tags: ['autodocs'], argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] }, min: { control: 'number' }, max: { control: 'number' }, step: { control: 'number' } } };
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = { args: { label: 'Volume', defaultValue: [50] } };
export const WithValue: Story = { args: { label: 'Brightness', defaultValue: [75], showValue: true } };
export const Small: Story = { args: { label: 'Small', size: 'sm', defaultValue: [30] } };
export const Large: Story = { args: { label: 'Large', size: 'lg', defaultValue: [60] } };
export const Disabled: Story = { args: { label: 'Disabled', isDisabled: true, defaultValue: [40] } };
export const CustomRange: Story = { args: { label: 'Price', min: 0, max: 1000, step: 10, defaultValue: [250], showValue: true } };

export const FormExample: Story = {
    render: () => (
        <div className="flex flex-col gap-6 max-w-md">
            <Slider label="Volume" defaultValue={[75]} showValue />
            <Slider label="Brightness" defaultValue={[50]} showValue />
            <Slider label="Contrast" defaultValue={[60]} showValue />
        </div>
    ),
};
