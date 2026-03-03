import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
    title: 'Components/Actions/Toggle',
    component: Toggle,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline'],
            description: 'The visual style',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'The size',
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the toggle is disabled',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

const BoldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
);

const ItalicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="19" x2="10" y1="4" y2="4" /><line x1="14" x2="5" y1="20" y2="20" /><line x1="15" x2="9" y1="4" y2="20" />
    </svg>
);

export const Default: Story = {
    args: {
        children: 'Toggle',
    },
};

export const Pressed: Story = {
    args: {
        defaultPressed: true,
        children: 'Pressed',
    },
};

export const Controlled: Story = {
    render: () => {
        const [pressed, setPressed] = useState(false);
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Toggle bold">
                    <BoldIcon />
                </Toggle>
                <span style={{ fontSize: 14 }}>{pressed ? 'ON' : 'OFF'}</span>
            </div>
        );
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline',
    },
};

export const WithIcon: Story = {
    args: {
        'aria-label': 'Toggle bold',
        children: <BoldIcon />,
    },
};

export const WithTextAndIcon: Story = {
    render: () => (
        <Toggle aria-label="Toggle bold">
            <BoldIcon />
            Bold
        </Toggle>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Toggle size="sm" aria-label="Small"><BoldIcon /></Toggle>
            <Toggle size="md" aria-label="Medium"><BoldIcon /></Toggle>
            <Toggle size="lg" aria-label="Large"><BoldIcon /></Toggle>
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        isDisabled: true,
        children: 'Disabled',
    },
};

export const InToolbar: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 4, padding: 4, border: '1px solid #e5e7eb', borderRadius: 8 }}>
            <Toggle aria-label="Toggle bold"><BoldIcon /></Toggle>
            <Toggle aria-label="Toggle italic"><ItalicIcon /></Toggle>
        </div>
    ),
};
