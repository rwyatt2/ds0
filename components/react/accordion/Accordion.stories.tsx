import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
    title: 'Components/Data Display/Accordion',
    component: Accordion,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
    render: () => (
        <Accordion type="single" defaultValue="item-1" className="w-full">
            <Accordion.Item value="item-1">
                <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
                <Accordion.Content>Yes. It adheres to the WAI-ARIA Accordion pattern.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Trigger>Is it styled?</Accordion.Trigger>
                <Accordion.Content>Yes. It comes with default styles using Tailwind CSS.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-3">
                <Accordion.Trigger>Is it animated?</Accordion.Trigger>
                <Accordion.Content>Yes. It supports accordion-up and accordion-down animations.</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    ),
};

export const Multiple: Story = {
    render: () => (
        <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full">
            <Accordion.Item value="item-1">
                <Accordion.Trigger>Section 1</Accordion.Trigger>
                <Accordion.Content>Content for section 1. Multiple sections can be open.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Trigger>Section 2</Accordion.Trigger>
                <Accordion.Content>Content for section 2. This is also open by default.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-3">
                <Accordion.Trigger>Section 3</Accordion.Trigger>
                <Accordion.Content>Content for section 3.</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    ),
};

export const DefaultExpanded: Story = {
    render: () => (
        <Accordion type="single" defaultValue="item-2" className="w-full">
            <Accordion.Item value="item-1">
                <Accordion.Trigger>Section 1</Accordion.Trigger>
                <Accordion.Content>Content 1</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Trigger>Section 2 (default expanded)</Accordion.Trigger>
                <Accordion.Content>This section is expanded by default.</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    ),
};

export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState<string | string[]>('item-1');
        return (
            <Accordion type="single" value={value} onValueChange={setValue} className="w-full">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>Controlled Section 1</Accordion.Trigger>
                    <Accordion.Content>Controlled content 1.</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                    <Accordion.Trigger>Controlled Section 2</Accordion.Trigger>
                    <Accordion.Content>Controlled content 2.</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        );
    },
};

export const Collapsible: Story = {
    render: () => (
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <Accordion.Item value="item-1">
                <Accordion.Trigger>Click to collapse</Accordion.Trigger>
                <Accordion.Content>Click the trigger again to collapse this section.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Trigger>Another Section</Accordion.Trigger>
                <Accordion.Content>Content here.</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    ),
};

export const NonCollapsible: Story = {
    render: () => (
        <Accordion type="single" collapsible={false} defaultValue="item-1" className="w-full">
            <Accordion.Item value="item-1">
                <Accordion.Trigger>Always one open</Accordion.Trigger>
                <Accordion.Content>This section cannot be collapsed — one must always be open.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Trigger>Another Section</Accordion.Trigger>
                <Accordion.Content>Switch to this one.</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    ),
};

export const WithDisabledItem: Story = {
    render: () => (
        <Accordion type="single" defaultValue="item-1" className="w-full">
            <Accordion.Item value="item-1">
                <Accordion.Trigger>Active Section</Accordion.Trigger>
                <Accordion.Content>This section works normally.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2" isDisabled>
                <Accordion.Trigger>Disabled Section</Accordion.Trigger>
                <Accordion.Content>You cannot open this.</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    ),
};

export const DisabledAll: Story = {
    render: () => (
        <Accordion type="single" defaultValue="item-1" isDisabled className="w-full">
            <Accordion.Item value="item-1">
                <Accordion.Trigger>Section 1</Accordion.Trigger>
                <Accordion.Content>All items are disabled.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Trigger>Section 2</Accordion.Trigger>
                <Accordion.Content>Cannot interact.</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    ),
};

export const WithRichContent: Story = {
    render: () => (
        <Accordion type="single" defaultValue="item-1" className="w-full">
            <Accordion.Item value="item-1">
                <Accordion.Trigger>Rich Content</Accordion.Trigger>
                <Accordion.Content>
                    <div className="space-y-4">
                        <p className="text-sm">This section contains rich content including images and forms.</p>
                        <div className="h-32 w-full rounded bg-muted" />
                        <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Enter something" />
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    ),
};

export const FAQ: Story = {
    render: () => (
        <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                <Accordion.Item value="q1">
                    <Accordion.Trigger>What is DS0?</Accordion.Trigger>
                    <Accordion.Content>
                        DS0 is an open-source, AI-native design system framework. It provides headless primitives,
                        styled components, and AI manifests for building consistent UIs.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="q2">
                    <Accordion.Trigger>How do I install it?</Accordion.Trigger>
                    <Accordion.Content>
                        Install the primitives package via npm: <code>npm install @ds0/primitives</code>.
                        Then copy styled components using the CLI: <code>npx ds0 add button</code>.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="q3">
                    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
                    <Accordion.Content>
                        Yes! Every component follows WAI-ARIA Authoring Practices with full keyboard
                        navigation and screen reader support.
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    ),
};
