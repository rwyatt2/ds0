import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Card } from './Card';

const meta: Meta<typeof Card> = {
    title: 'Components/Data Display/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline', 'ghost', 'elevated'],
            description: 'The visual style',
        },
        padding: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg'],
            description: 'Internal padding',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    render: () => (
        <Card className="w-[350px]">
            <Card.Header>
                <Card.Title>Card Title</Card.Title>
                <Card.Description>Card description goes here.</Card.Description>
            </Card.Header>
            <Card.Content>
                <p className="text-sm">Card body content.</p>
            </Card.Content>
        </Card>
    ),
};

export const Outline: Story = {
    render: () => (
        <Card variant="outline" className="w-[350px]">
            <Card.Header>
                <Card.Title>Outline Card</Card.Title>
                <Card.Description>Border only, no background fill.</Card.Description>
            </Card.Header>
            <Card.Content>
                <p className="text-sm">Content area.</p>
            </Card.Content>
        </Card>
    ),
};

export const Ghost: Story = {
    render: () => (
        <Card variant="ghost" className="w-[350px]">
            <Card.Header>
                <Card.Title>Ghost Card</Card.Title>
                <Card.Description>No border or background.</Card.Description>
            </Card.Header>
            <Card.Content>
                <p className="text-sm">Content area.</p>
            </Card.Content>
        </Card>
    ),
};

export const Elevated: Story = {
    render: () => (
        <Card variant="elevated" className="w-[350px]">
            <Card.Header>
                <Card.Title>Elevated Card</Card.Title>
                <Card.Description>Raised with shadow.</Card.Description>
            </Card.Header>
            <Card.Content>
                <p className="text-sm">Content area.</p>
            </Card.Content>
        </Card>
    ),
};

export const WithHeaderOnly: Story = {
    render: () => (
        <Card className="w-[350px]">
            <Card.Header>
                <Card.Title>Header Only</Card.Title>
                <Card.Description>A card with just a header section.</Card.Description>
            </Card.Header>
        </Card>
    ),
};

export const WithFooter: Story = {
    render: () => (
        <Card className="w-[350px]">
            <Card.Header>
                <Card.Title>Card with Footer</Card.Title>
            </Card.Header>
            <Card.Content>
                <p className="text-sm">Main content area.</p>
            </Card.Content>
            <Card.Footer>
                <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Save</button>
            </Card.Footer>
        </Card>
    ),
};

export const WithAllSections: Story = {
    render: () => (
        <Card className="w-[350px]">
            <Card.Header>
                <Card.Title>Complete Card</Card.Title>
                <Card.Description>This card uses all sections.</Card.Description>
            </Card.Header>
            <Card.Content>
                <p className="text-sm">Main body content goes here with detailed information.</p>
            </Card.Content>
            <Card.Footer>
                <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Confirm</button>
                <button className="ml-2 rounded-md px-4 py-2 text-sm">Cancel</button>
            </Card.Footer>
        </Card>
    ),
};

export const Interactive: Story = {
    render: () => (
        <Card className="w-[350px] cursor-pointer transition-shadow hover:shadow-lg" role="link" tabIndex={0}>
            <Card.Header>
                <Card.Title>Clickable Card</Card.Title>
                <Card.Description>This entire card is interactive.</Card.Description>
            </Card.Header>
        </Card>
    ),
};

export const InGrid: Story = {
    render: () => (
        <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
                <Card key={i}>
                    <Card.Header>
                        <Card.Title>Card {i}</Card.Title>
                        <Card.Description>Description {i}</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p className="text-sm">Content for card {i}.</p>
                    </Card.Content>
                </Card>
            ))}
        </div>
    ),
};

export const WithImage: Story = {
    render: () => (
        <Card className="w-[350px] overflow-hidden">
            <div className="h-48 bg-muted" />
            <Card.Header>
                <Card.Title>Image Card</Card.Title>
                <Card.Description>Card with an image header.</Card.Description>
            </Card.Header>
            <Card.Content>
                <p className="text-sm">Content below the image.</p>
            </Card.Content>
        </Card>
    ),
};

export const WithBadge: Story = {
    render: () => (
        <Card className="w-[350px]">
            <Card.Header>
                <div className="flex items-center justify-between">
                    <Card.Title>Status Card</Card.Title>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Active</span>
                </div>
                <Card.Description>Card with a status badge.</Card.Description>
            </Card.Header>
        </Card>
    ),
};

export const WithForm: Story = {
    render: () => (
        <Card className="w-[400px]">
            <Card.Header>
                <Card.Title>Create Project</Card.Title>
                <Card.Description>Fill in the details for your new project.</Card.Description>
            </Card.Header>
            <Card.Content>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" placeholder="Project name" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" placeholder="Project description" />
                    </div>
                </div>
            </Card.Content>
            <Card.Footer>
                <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Create</button>
                <button className="ml-2 rounded-md px-4 py-2 text-sm">Cancel</button>
            </Card.Footer>
        </Card>
    ),
};
