import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { RadioGroup } from './index';

const meta: Meta<typeof RadioGroup> = {
    title: 'Components/Data Input/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: 'select',
            options: ['vertical', 'horizontal'],
            description: 'Layout direction',
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the group is disabled',
        },
        isRequired: {
            control: 'boolean',
            description: 'Whether a selection is required',
        },
        isInvalid: {
            control: 'boolean',
            description: 'Whether the group is in an error state',
        },
    },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
    args: {
        label: 'Favorite fruit',
        children: undefined,
    },
    render: (args) => (
        <RadioGroup {...args} label="Favorite fruit">
            <RadioGroup.Item value="apple" label="Apple" />
            <RadioGroup.Item value="banana" label="Banana" />
            <RadioGroup.Item value="cherry" label="Cherry" />
        </RadioGroup>
    ),
};

export const WithDefaultValue: Story = {
    render: () => (
        <RadioGroup label="Plan" defaultValue="pro">
            <RadioGroup.Item value="free" label="Free" />
            <RadioGroup.Item value="pro" label="Pro" />
            <RadioGroup.Item value="enterprise" label="Enterprise" />
        </RadioGroup>
    ),
};

export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState('medium');
        return (
            <div>
                <RadioGroup label="Priority" value={value} onValueChange={setValue}>
                    <RadioGroup.Item value="low" label="Low" />
                    <RadioGroup.Item value="medium" label="Medium" />
                    <RadioGroup.Item value="high" label="High" />
                </RadioGroup>
                <p className="mt-4 text-sm text-muted-foreground">Selected: {value}</p>
            </div>
        );
    },
};

export const Horizontal: Story = {
    render: () => (
        <RadioGroup label="Size" defaultValue="md" orientation="horizontal">
            <RadioGroup.Item value="sm" label="Small" />
            <RadioGroup.Item value="md" label="Medium" />
            <RadioGroup.Item value="lg" label="Large" />
        </RadioGroup>
    ),
};

export const WithDescriptions: Story = {
    render: () => (
        <RadioGroup label="Notification preference" defaultValue="email">
            <RadioGroup.Item
                value="email"
                label="Email"
                description="Get notified via email"
            />
            <RadioGroup.Item
                value="sms"
                label="SMS"
                description="Get notified via text message"
            />
            <RadioGroup.Item
                value="push"
                label="Push notification"
                description="Get notified on your device"
            />
        </RadioGroup>
    ),
};

export const WithDisabledItems: Story = {
    render: () => (
        <RadioGroup label="Shipping method" defaultValue="standard">
            <RadioGroup.Item value="standard" label="Standard" description="5-7 business days" />
            <RadioGroup.Item value="express" label="Express" description="2-3 business days" />
            <RadioGroup.Item
                value="overnight"
                label="Overnight"
                description="Next business day (unavailable)"
                isDisabled
            />
        </RadioGroup>
    ),
};

export const Disabled: Story = {
    render: () => (
        <RadioGroup label="Plan" defaultValue="free" isDisabled>
            <RadioGroup.Item value="free" label="Free" />
            <RadioGroup.Item value="pro" label="Pro" />
        </RadioGroup>
    ),
};

export const Invalid: Story = {
    render: () => (
        <RadioGroup label="Agreement" isInvalid isRequired errorMessage="Please select an option">
            <RadioGroup.Item value="agree" label="I agree" />
            <RadioGroup.Item value="disagree" label="I disagree" />
        </RadioGroup>
    ),
};

export const WithErrorMessage: Story = {
    render: () => (
        <RadioGroup
            label="Subscription"
            isInvalid
            errorMessage="You must select a subscription plan to continue"
        >
            <RadioGroup.Item value="monthly" label="Monthly" description="$9/month" />
            <RadioGroup.Item value="yearly" label="Yearly" description="$90/year" />
        </RadioGroup>
    ),
};

export const InForm: Story = {
    render: () => (
        <form
            className="flex flex-col gap-4 max-w-sm"
            onSubmit={(e) => {
                e.preventDefault();
                alert('Submitted!');
            }}
        >
            <RadioGroup label="Payment method" defaultValue="card" isRequired>
                <RadioGroup.Item value="card" label="Credit Card" />
                <RadioGroup.Item value="paypal" label="PayPal" />
                <RadioGroup.Item value="crypto" label="Cryptocurrency" />
            </RadioGroup>
            <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
                Submit
            </button>
        </form>
    ),
};
