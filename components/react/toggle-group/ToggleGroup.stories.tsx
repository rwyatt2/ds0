import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { ToggleGroup } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
    title: 'Components/Actions/ToggleGroup',
    component: ToggleGroup,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
    render: () => (
        <ToggleGroup type="single" defaultValue="center">
            <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
            <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
            <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
        </ToggleGroup>
    ),
};

export const Multiple: Story = {
    render: () => (
        <ToggleGroup type="multiple" defaultValue={['bold']}>
            <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
            <ToggleGroup.Item value="italic">I</ToggleGroup.Item>
            <ToggleGroup.Item value="underline">U</ToggleGroup.Item>
        </ToggleGroup>
    ),
};

export const Outline: Story = {
    render: () => (
        <ToggleGroup type="single" variant="outline" defaultValue="list">
            <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
            <ToggleGroup.Item value="list">List</ToggleGroup.Item>
        </ToggleGroup>
    ),
};

export const SmallSize: Story = {
    render: () => (
        <ToggleGroup type="single" size="sm" defaultValue="a">
            <ToggleGroup.Item value="a">A</ToggleGroup.Item>
            <ToggleGroup.Item value="b">B</ToggleGroup.Item>
            <ToggleGroup.Item value="c">C</ToggleGroup.Item>
        </ToggleGroup>
    ),
};

export const LargeSize: Story = {
    render: () => (
        <ToggleGroup type="single" size="lg" defaultValue="a">
            <ToggleGroup.Item value="a">A</ToggleGroup.Item>
            <ToggleGroup.Item value="b">B</ToggleGroup.Item>
            <ToggleGroup.Item value="c">C</ToggleGroup.Item>
        </ToggleGroup>
    ),
};

export const Vertical: Story = {
    render: () => (
        <ToggleGroup type="single" orientation="vertical" defaultValue="top">
            <ToggleGroup.Item value="top">Top</ToggleGroup.Item>
            <ToggleGroup.Item value="middle">Middle</ToggleGroup.Item>
            <ToggleGroup.Item value="bottom">Bottom</ToggleGroup.Item>
        </ToggleGroup>
    ),
};

export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState<string | string[]>('center');
        return (
            <ToggleGroup type="single" value={value} onValueChange={setValue}>
                <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
                <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
                <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
            </ToggleGroup>
        );
    },
};

export const WithDisabledItem: Story = {
    render: () => (
        <ToggleGroup type="single" defaultValue="a">
            <ToggleGroup.Item value="a">A</ToggleGroup.Item>
            <ToggleGroup.Item value="b" isDisabled>B (disabled)</ToggleGroup.Item>
            <ToggleGroup.Item value="c">C</ToggleGroup.Item>
        </ToggleGroup>
    ),
};

export const DisabledAll: Story = {
    render: () => (
        <ToggleGroup type="single" isDisabled defaultValue="a">
            <ToggleGroup.Item value="a">A</ToggleGroup.Item>
            <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        </ToggleGroup>
    ),
};

export const TextFormatting: Story = {
    render: () => (
        <ToggleGroup type="multiple" variant="outline" defaultValue={['bold']}>
            <ToggleGroup.Item value="bold" className="font-bold">B</ToggleGroup.Item>
            <ToggleGroup.Item value="italic" className="italic">I</ToggleGroup.Item>
            <ToggleGroup.Item value="underline" className="underline">U</ToggleGroup.Item>
            <ToggleGroup.Item value="strikethrough" className="line-through">S</ToggleGroup.Item>
        </ToggleGroup>
    ),
};
