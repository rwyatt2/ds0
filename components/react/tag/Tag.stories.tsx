import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
    title: 'Components/Data Display/Tag',
    component: Tag,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['default', 'primary', 'secondary', 'destructive', 'outline'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        isRemovable: { control: 'boolean' },
        isDisabled: { control: 'boolean' },
    },
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = { args: { children: 'Tag' } };

export const Primary: Story = { args: { variant: 'primary', children: 'Primary' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Error' } };
export const Outline: Story = { args: { variant: 'outline', children: 'Outline' } };

export const Small: Story = { args: { size: 'sm', children: 'Small' } };
export const Large: Story = { args: { size: 'lg', children: 'Large' } };

export const Removable: Story = {
    args: { isRemovable: true, onRemove: () => {}, children: 'Removable' },
};

export const Disabled: Story = {
    args: { isDisabled: true, children: 'Disabled' },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <Tag variant="default">Default</Tag>
            <Tag variant="primary">Primary</Tag>
            <Tag variant="secondary">Secondary</Tag>
            <Tag variant="destructive">Error</Tag>
            <Tag variant="outline">Outline</Tag>
        </div>
    ),
};

export const TagList: Story = {
    render: () => {
        const [tags, setTags] = React.useState(['React', 'TypeScript', 'DS0', 'Tailwind']);
        return (
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Tag key={tag} isRemovable onRemove={() => setTags(tags.filter(t => t !== tag))}>
                        {tag}
                    </Tag>
                ))}
            </div>
        );
    },
};
