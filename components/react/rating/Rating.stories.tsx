import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
    title: 'Components/Data Input/Rating',
    component: Rating,
    tags: ['autodocs'],
    argTypes: {
        value: { control: { type: 'number', min: 0, max: 10, step: 1 } },
        maxValue: { control: { type: 'number', min: 1, max: 10 } },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        isDisabled: { control: 'boolean' },
        isReadonly: { control: 'boolean' },
        allowHalf: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
    args: {
        value: 3,
    },
};

export const Empty: Story = {
    args: {
        value: 0,
    },
};

export const FullStars: Story = {
    args: {
        value: 5,
    },
};

export const Readonly: Story = {
    args: {
        value: 4,
        isReadonly: true,
    },
};

export const Disabled: Story = {
    args: {
        value: 2,
        isDisabled: true,
    },
};

export const Small: Story = {
    args: {
        value: 3,
        size: 'sm',
    },
};

export const Medium: Story = {
    args: {
        value: 3,
        size: 'md',
    },
};

export const Large: Story = {
    args: {
        value: 3,
        size: 'lg',
    },
};

export const TenStars: Story = {
    args: {
        value: 7,
        maxValue: 10,
    },
};

export const Interactive: Story = {
    render: () => {
        const [value, setValue] = useState(0);
        return (
            <div className="flex flex-col gap-2">
                <Rating value={value} onChange={setValue} />
                <p className="text-sm text-muted-foreground">
                    Selected: {value} / 5 stars
                </p>
            </div>
        );
    },
};

export const ProductReview: Story = {
    render: () => {
        const [rating, setRating] = useState(0);
        return (
            <div className="rounded-lg border p-4 max-w-sm space-y-3">
                <h3 className="font-semibold">Rate this product</h3>
                <Rating value={rating} onChange={setRating} size="lg" />
                <p className="text-xs text-muted-foreground">
                    {rating > 0
                        ? `You rated this ${rating} out of 5 stars`
                        : 'Click a star to rate'}
                </p>
            </div>
        );
    },
};
