import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField';

const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
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
);

const MailIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const meta: Meta<typeof TextField> = {
    title: 'Components/Data Input/TextField',
    component: TextField,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the input',
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'],
            description: 'The HTML input type',
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the input is disabled',
        },
        isRequired: {
            control: 'boolean',
            description: 'Whether the input is required',
        },
        isInvalid: {
            control: 'boolean',
            description: 'Whether the input is in an error state',
        },
        isReadOnly: {
            control: 'boolean',
            description: 'Whether the input is read-only',
        },
    },
};

export default meta;
type Story = StoryObj<typeof TextField>;

// --- Default ---

export const Default: Story = {
    args: {
        label: 'Name',
        placeholder: 'Enter your name',
    },
};

// --- Sizes ---

export const Small: Story = {
    args: {
        label: 'Name',
        size: 'sm',
        placeholder: 'Small input',
    },
};

export const Medium: Story = {
    args: {
        label: 'Name',
        size: 'md',
        placeholder: 'Medium input',
    },
};

export const Large: Story = {
    args: {
        label: 'Name',
        size: 'lg',
        placeholder: 'Large input',
    },
};

// --- Types ---

export const Email: Story = {
    args: {
        label: 'Email',
        type: 'email',
        placeholder: 'you@example.com',
    },
};

export const Password: Story = {
    args: {
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
    },
};

export const Search: Story = {
    args: {
        label: 'Search',
        type: 'search',
        placeholder: 'Search...',
        leftIcon: <SearchIcon />,
    },
};

// --- States ---

export const Required: Story = {
    args: {
        label: 'Email',
        type: 'email',
        isRequired: true,
        placeholder: 'you@example.com',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Name',
        isDisabled: true,
        defaultValue: 'John Doe',
    },
};

export const ReadOnly: Story = {
    args: {
        label: 'API Key',
        isReadOnly: true,
        defaultValue: 'sk-abc123def456',
    },
};

export const WithHelperText: Story = {
    args: {
        label: 'Username',
        helperText: 'Must be 3-20 characters, letters and numbers only',
        placeholder: 'Choose a username',
    },
};

export const Invalid: Story = {
    args: {
        label: 'Email',
        type: 'email',
        isInvalid: true,
        errorMessage: 'Please enter a valid email address',
        defaultValue: 'not-an-email',
    },
};

// --- With Icons ---

export const WithLeftIcon: Story = {
    args: {
        label: 'Email',
        type: 'email',
        leftIcon: <MailIcon />,
        placeholder: 'you@example.com',
    },
};

export const WithRightIcon: Story = {
    args: {
        label: 'Search',
        rightIcon: <SearchIcon />,
        placeholder: 'Search...',
    },
};

// --- Compositions ---

export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4 max-w-md">
            <TextField label="Small" size="sm" placeholder="Small" />
            <TextField label="Medium" size="md" placeholder="Medium" />
            <TextField label="Large" size="lg" placeholder="Large" />
        </div>
    ),
};

export const FormExample: Story = {
    render: () => (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className="flex flex-col gap-4 max-w-md"
        >
            <TextField
                label="Full Name"
                isRequired
                placeholder="John Doe"
            />
            <TextField
                label="Email"
                type="email"
                isRequired
                leftIcon={<MailIcon />}
                placeholder="you@example.com"
                helperText="We'll never share your email"
            />
            <TextField
                label="Password"
                type="password"
                isRequired
                placeholder="Create a password"
                helperText="Must be at least 8 characters"
            />
        </form>
    ),
};
