import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
    title: 'Components/Data Input/TextArea',
    component: TextArea,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the textarea',
        },
        resize: {
            control: 'select',
            options: ['none', 'vertical', 'horizontal', 'both'],
            description: 'Resize behavior',
        },
        isDisabled: { control: 'boolean' },
        isRequired: { control: 'boolean' },
        isInvalid: { control: 'boolean' },
        isReadOnly: { control: 'boolean' },
        showCount: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
    args: {
        label: 'Description',
        placeholder: 'Enter a description...',
    },
};

export const Small: Story = {
    args: { label: 'Notes', size: 'sm', placeholder: 'Small textarea' },
};

export const Large: Story = {
    args: { label: 'Content', size: 'lg', placeholder: 'Large textarea', rows: 5 },
};

export const WithHelperText: Story = {
    args: {
        label: 'Bio',
        helperText: 'Write a short bio for your profile',
        placeholder: 'Tell us about yourself...',
    },
};

export const WithCharacterCount: Story = {
    args: {
        label: 'Tweet',
        maxLength: 280,
        showCount: true,
        placeholder: "What's happening?",
    },
};

export const Required: Story = {
    args: {
        label: 'Message',
        isRequired: true,
        placeholder: 'Your message...',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Bio',
        isDisabled: true,
        defaultValue: 'This content cannot be edited.',
    },
};

export const ReadOnly: Story = {
    args: {
        label: 'Terms',
        isReadOnly: true,
        defaultValue: 'These are the terms and conditions...',
    },
};

export const Invalid: Story = {
    args: {
        label: 'Description',
        isInvalid: true,
        errorMessage: 'Description must be at least 10 characters',
        defaultValue: 'Too short',
    },
};

export const NoResize: Story = {
    args: {
        label: 'Comment',
        resize: 'none',
        placeholder: 'Cannot resize...',
    },
};

export const FormExample: Story = {
    render: () => (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className="flex flex-col gap-4 max-w-md"
        >
            <TextArea
                label="Subject"
                isRequired
                placeholder="What is this about?"
                rows={1}
            />
            <TextArea
                label="Message"
                isRequired
                placeholder="Describe your issue..."
                rows={5}
                maxLength={500}
                showCount
                helperText="Be as detailed as possible"
            />
        </form>
    ),
};
