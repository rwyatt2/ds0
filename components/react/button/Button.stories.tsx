import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Actions/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'destructive', 'ghost', 'outline'],
            description: 'The visual style of the button',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the button',
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the button is disabled',
        },
        isLoading: {
            control: 'boolean',
            description: 'Whether the button is in a loading state',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

// --- Default ---

export const Default: Story = {
    args: {
        children: 'Button',
    },
};

// --- Variants ---

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary',
    },
};

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        children: 'Destructive',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Ghost',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline',
    },
};

// --- Sizes ---

export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Small',
    },
};

export const Medium: Story = {
    args: {
        size: 'md',
        children: 'Medium',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Large',
    },
};

// --- States ---

export const Disabled: Story = {
    args: {
        isDisabled: true,
        children: 'Disabled',
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
        children: 'Loading',
    },
};

export const LoadingWithText: Story = {
    args: {
        isLoading: true,
        loadingText: 'Saving...',
        children: 'Save',
    },
};

// --- With Icons ---

const PlusIcon = () => (
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
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const ArrowRightIcon = () => (
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
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

export const WithLeftIcon: Story = {
    args: {
        leftIcon: <PlusIcon />,
        children: 'Add Item',
    },
};

export const WithRightIcon: Story = {
    args: {
        rightIcon: <ArrowRightIcon />,
        children: 'Next',
    },
};

// --- Layout ---

export const FullWidth: Story = {
    args: {
        className: 'w-full',
        children: 'Full Width',
    },
};

// --- Compositions ---

export const AllVariants: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex items-end gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
    ),
};

export const InForm: Story = {
    render: () => (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className="flex gap-2"
        >
            <Button type="submit" variant="primary">
                Submit
            </Button>
            <Button type="button" variant="ghost">
                Cancel
            </Button>
        </form>
    ),
};
