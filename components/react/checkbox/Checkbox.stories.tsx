import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Data Input/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        isDisabled: { control: 'boolean' },
        isRequired: { control: 'boolean' },
        isInvalid: { control: 'boolean' },
        indeterminate: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { label: 'Accept terms and conditions' } };
export const Checked: Story = { args: { label: 'Remember me', defaultChecked: true } };
export const Small: Story = { args: { label: 'Small checkbox', size: 'sm' } };
export const Large: Story = { args: { label: 'Large checkbox', size: 'lg' } };
export const WithDescription: Story = { args: { label: 'Marketing emails', description: 'Receive updates about new features and promotions' } };
export const Required: Story = { args: { label: 'I agree to the terms', isRequired: true } };
export const Disabled: Story = { args: { label: 'Disabled option', isDisabled: true } };
export const DisabledChecked: Story = { args: { label: 'Disabled checked', isDisabled: true, defaultChecked: true } };
export const Invalid: Story = { args: { label: 'You must accept', isInvalid: true } };
export const Indeterminate: Story = { args: { label: 'Select all', indeterminate: true } };

export const CheckboxGroup: Story = {
    render: () => (
        <div className="flex flex-col gap-3">
            <Checkbox label="Option A" />
            <Checkbox label="Option B" defaultChecked />
            <Checkbox label="Option C" />
        </div>
    ),
};
