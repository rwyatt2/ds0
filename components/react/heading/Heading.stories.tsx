import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
    title: 'Components/Typography/Heading',
    component: Heading,
    tags: ['autodocs'],
    argTypes: {
        as: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            description: 'The semantic heading level',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
            description: 'Override visual size',
        },
        weight: {
            control: 'select',
            options: ['regular', 'medium', 'semibold', 'bold'],
            description: 'Font weight',
        },
        tracking: {
            control: 'select',
            options: ['tighter', 'tight', 'normal'],
            description: 'Letter spacing',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Heading>;

// --- Default ---

export const Default: Story = {
    args: {
        children: 'Heading',
    },
};

// --- Levels ---

export const H1: Story = {
    args: {
        as: 'h1',
        children: 'Heading Level 1',
    },
};

export const H2: Story = {
    args: {
        as: 'h2',
        children: 'Heading Level 2',
    },
};

export const H3: Story = {
    args: {
        as: 'h3',
        children: 'Heading Level 3',
    },
};

export const H4: Story = {
    args: {
        as: 'h4',
        children: 'Heading Level 4',
    },
};

export const H5: Story = {
    args: {
        as: 'h5',
        children: 'Heading Level 5',
    },
};

export const H6: Story = {
    args: {
        as: 'h6',
        children: 'Heading Level 6',
    },
};

// --- Sizes ---

export const SizeXs: Story = {
    args: { size: 'xs', children: 'Extra Small' },
};

export const Size4xl: Story = {
    args: { size: '4xl', children: 'Extra Extra Extra Large' },
};

// --- Weights ---

export const WeightRegular: Story = {
    args: { weight: 'regular', children: 'Regular Weight' },
};

export const WeightBold: Story = {
    args: { weight: 'bold', children: 'Bold Weight' },
};

// --- Compositions ---

export const AllLevels: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Heading as="h1">h1 — Page Title</Heading>
            <Heading as="h2">h2 — Section Title</Heading>
            <Heading as="h3">h3 — Subsection Title</Heading>
            <Heading as="h4">h4 — Group Title</Heading>
            <Heading as="h5">h5 — Sub-group Title</Heading>
            <Heading as="h6">h6 — Small Title</Heading>
        </div>
    ),
};

export const SizeOverride: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Heading as="h3" size="4xl">
                h3 with 4xl visual size
            </Heading>
            <Heading as="h1" size="sm">
                h1 with sm visual size
            </Heading>
        </div>
    ),
};
