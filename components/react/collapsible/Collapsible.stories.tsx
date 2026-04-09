import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Collapsible } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
    title: 'Components/Layout/Collapsible',
    component: Collapsible,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

// --- Default (collapsed) ---

export const Default: Story = {
    render: () => (
        <Collapsible className="w-80">
            <Collapsible.Trigger>Toggle Details</Collapsible.Trigger>
            <Collapsible.Content>
                <div className="pt-2 text-sm text-muted-foreground">
                    This content is hidden by default and appears when you click the trigger.
                </div>
            </Collapsible.Content>
        </Collapsible>
    ),
};

// --- Default Open ---

export const DefaultOpen: Story = {
    render: () => (
        <Collapsible defaultOpen className="w-80">
            <Collapsible.Trigger>Toggle Details</Collapsible.Trigger>
            <Collapsible.Content>
                <div className="pt-2 text-sm text-muted-foreground">
                    This content is visible by default.
                </div>
            </Collapsible.Content>
        </Collapsible>
    ),
};

// --- With Chevron Icon ---

const ChevronIcon = ({ isOpen }: { isOpen?: boolean }) => (
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
        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

export const WithChevron: Story = {
    render: () => {
        const [open, setOpen] = React.useState(false);
        return (
            <Collapsible open={open} onOpenChange={setOpen} className="w-80">
                <Collapsible.Trigger className="flex items-center gap-2">
                    Advanced Options
                    <ChevronIcon isOpen={open} />
                </Collapsible.Trigger>
                <Collapsible.Content>
                    <div className="pt-2 space-y-2 text-sm text-muted-foreground">
                        <p>Option A: Enable feature X</p>
                        <p>Option B: Configure timeout</p>
                        <p>Option C: Set log level</p>
                    </div>
                </Collapsible.Content>
            </Collapsible>
        );
    },
};

// --- Multiple Sections ---

export const MultipleSections: Story = {
    render: () => (
        <div className="w-80 space-y-2">
            <Collapsible>
                <Collapsible.Trigger>Section 1</Collapsible.Trigger>
                <Collapsible.Content>
                    <div className="pt-2 text-sm text-muted-foreground">
                        Content for section 1.
                    </div>
                </Collapsible.Content>
            </Collapsible>
            <Collapsible>
                <Collapsible.Trigger>Section 2</Collapsible.Trigger>
                <Collapsible.Content>
                    <div className="pt-2 text-sm text-muted-foreground">
                        Content for section 2.
                    </div>
                </Collapsible.Content>
            </Collapsible>
            <Collapsible>
                <Collapsible.Trigger>Section 3</Collapsible.Trigger>
                <Collapsible.Content>
                    <div className="pt-2 text-sm text-muted-foreground">
                        Content for section 3.
                    </div>
                </Collapsible.Content>
            </Collapsible>
        </div>
    ),
};

// --- With Border ---

export const WithBorder: Story = {
    render: () => (
        <Collapsible className="w-80 rounded-md border border-input p-4">
            <Collapsible.Trigger>
                <span className="font-semibold">More Information</span>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <div className="pt-3 text-sm text-muted-foreground">
                    Additional details are revealed here. This pattern is useful for FAQ-style layouts.
                </div>
            </Collapsible.Content>
        </Collapsible>
    ),
};
