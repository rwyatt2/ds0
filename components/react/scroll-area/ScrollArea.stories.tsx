import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
    title: 'Components/Layout/ScrollArea',
    component: ScrollArea,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ScrollArea>;

const tags = Array.from({ length: 50 }, (_, i) => `v1.${i}.0`);

export const Default: Story = {
    render: () => (
        <ScrollArea className="h-72 w-48 rounded-md border">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {tags.map((tag) => (
                    <div key={tag} className="text-sm py-1">{tag}</div>
                ))}
            </div>
        </ScrollArea>
    ),
};

export const Horizontal: Story = {
    render: () => (
        <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
                {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="w-32 h-20 rounded-md bg-secondary flex items-center justify-center text-sm">
                        Item {i + 1}
                    </div>
                ))}
            </div>
        </ScrollArea>
    ),
};
