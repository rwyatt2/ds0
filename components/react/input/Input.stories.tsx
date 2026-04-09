import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Components/Data Input/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'ghost'],
            description: 'The visual style of the input',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the input',
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the input is disabled',
        },
        isReadOnly: {
            control: 'boolean',
            description: 'Whether the input is read-only',
        },
        isInvalid: {
            control: 'boolean',
            description: 'Whether the input is in an error state',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

// --- Default ---

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
        'aria-label': 'Default input',
    },
};

// --- Variants ---

export const DefaultVariant: Story = {
    args: {
        variant: 'default',
        placeholder: 'Default variant',
        'aria-label': 'Default variant input',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        placeholder: 'Ghost variant',
        'aria-label': 'Ghost variant input',
    },
};

// --- Sizes ---

export const Small: Story = {
    args: {
        size: 'sm',
        placeholder: 'Small input',
        'aria-label': 'Small input',
    },
};

export const Medium: Story = {
    args: {
        size: 'md',
        placeholder: 'Medium input',
        'aria-label': 'Medium input',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        placeholder: 'Large input',
        'aria-label': 'Large input',
    },
};

// --- States ---

export const Disabled: Story = {
    args: {
        isDisabled: true,
        placeholder: 'Disabled input',
        'aria-label': 'Disabled input',
    },
};

export const ReadOnly: Story = {
    args: {
        isReadOnly: true,
        defaultValue: 'Read-only value',
        'aria-label': 'Read-only input',
    },
};

export const Invalid: Story = {
    args: {
        isInvalid: true,
        defaultValue: 'invalid@',
        'aria-label': 'Invalid input',
    },
};

// --- Types ---

export const Email: Story = {
    args: {
        type: 'email',
        placeholder: 'you@example.com',
        'aria-label': 'Email input',
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter password...',
        'aria-label': 'Password input',
    },
};

// --- Compositions ---

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-80">
            <Input variant="default" placeholder="Default" aria-label="Default" />
            <Input variant="ghost" placeholder="Ghost" aria-label="Ghost" />
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-80">
            <Input size="sm" placeholder="Small" aria-label="Small" />
            <Input size="md" placeholder="Medium" aria-label="Medium" />
            <Input size="lg" placeholder="Large" aria-label="Large" />
        </div>
    ),
};

export const WithLabel: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <label htmlFor="email-demo" className="text-sm font-medium">
                Email
            </label>
            <Input id="email-demo" type="email" placeholder="you@example.com" />
        </div>
    ),
};

export const InSearchContext: Story = {
    render: () => (
        <div className="relative w-80">
            <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <Input className="pl-10" placeholder="Search..." aria-label="Search" />
        </div>
    ),
};
