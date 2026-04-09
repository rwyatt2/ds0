import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Stepper, StepperItem } from './Stepper';

const meta: Meta<typeof Stepper> = {
    title: 'Components/Navigation/Stepper',
    component: Stepper,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['default', 'dot'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        activeStep: { control: { type: 'number', min: 0, max: 3 } },
    },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
    args: {
        activeStep: 1,
        children: [
            <StepperItem key={0} title="Account" />,
            <StepperItem key={1} title="Details" />,
            <StepperItem key={2} title="Confirm" />,
        ],
    },
};

export const DotVariant: Story = {
    args: { ...Default.args, variant: 'dot' },
};

export const Vertical: Story = {
    args: {
        ...Default.args,
        orientation: 'vertical',
        children: [
            <StepperItem key={0} title="Personal Info" description="Enter your details" />,
            <StepperItem key={1} title="Payment" description="Add payment method" />,
            <StepperItem key={2} title="Review" description="Confirm your order" />,
        ],
    },
};

export const AllCompleted: Story = {
    args: { ...Default.args, activeStep: 3 },
};

export const Small: Story = {
    args: { ...Default.args, size: 'sm' },
};

export const Large: Story = {
    args: { ...Default.args, size: 'lg' },
};

export const CheckoutFlow: Story = {
    name: 'Real World: Checkout',
    args: {
        activeStep: 2,
        children: [
            <StepperItem key={0} title="Cart" />,
            <StepperItem key={1} title="Shipping" />,
            <StepperItem key={2} title="Payment" />,
            <StepperItem key={3} title="Review" />,
        ],
    },
};
