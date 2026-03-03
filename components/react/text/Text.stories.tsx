import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta: Meta<typeof Text> = {
    title: 'Components/Typography/Text',
    component: Text,
    tags: ['autodocs'],
    argTypes: {
        as: {
            control: 'select',
            options: ['p', 'span', 'div', 'em', 'strong'],
            description: 'The HTML element to render',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'base', 'lg', 'xl'],
            description: 'Font size',
        },
        weight: {
            control: 'select',
            options: ['regular', 'medium', 'semibold', 'bold'],
            description: 'Font weight',
        },
        color: {
            control: 'select',
            options: ['default', 'muted', 'primary', 'destructive', 'success'],
            description: 'Text color',
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description: 'Text alignment',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
    args: {
        children: 'The quick brown fox jumps over the lazy dog.',
    },
};

export const Muted: Story = {
    args: {
        color: 'muted',
        children: 'This is secondary helper text.',
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Small text for captions and fine print.',
    },
};

export const Bold: Story = {
    args: {
        weight: 'bold',
        children: 'Bold text for emphasis.',
    },
};

export const Centered: Story = {
    args: {
        align: 'center',
        children: 'Centered text.',
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-col gap-2">
            <Text size="xs">Extra small text (xs)</Text>
            <Text size="sm">Small text (sm)</Text>
            <Text size="base">Base text (base)</Text>
            <Text size="lg">Large text (lg)</Text>
            <Text size="xl">Extra large text (xl)</Text>
        </div>
    ),
};

export const AllColors: Story = {
    render: () => (
        <div className="flex flex-col gap-2">
            <Text color="default">Default color</Text>
            <Text color="muted">Muted color</Text>
            <Text color="primary">Primary color</Text>
            <Text color="destructive">Destructive color</Text>
            <Text color="success">Success color</Text>
        </div>
    ),
};

export const SemanticElements: Story = {
    render: () => (
        <div className="flex flex-col gap-2">
            <Text as="p">Paragraph element</Text>
            <Text as="em">Emphasized element</Text>
            <Text as="strong">Strong element</Text>
            <Text as="span">Span element</Text>
        </div>
    ),
};
