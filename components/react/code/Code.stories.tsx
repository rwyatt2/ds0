import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';

const meta: Meta<typeof Code> = {
    title: 'Components/Typography/Code',
    component: Code,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['inline', 'block'] },
    },
};
export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = { args: { children: 'npm install ds0' } };
export const Inline: Story = { args: { variant: 'inline', children: 'const x = 1' } };
export const Block: Story = { args: { variant: 'block', children: 'const greeting = "Hello";\nconsole.log(greeting);' } };

export const InParagraph: Story = {
    render: () => (
        <p className="text-sm">
            Run <Code>npm install @ds0/primitives</Code> to get started.
        </p>
    ),
};
