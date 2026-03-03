import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
const meta: Meta<typeof Divider> = { title: 'Components/Layout/Divider', component: Divider, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Divider>;
export const Horizontal: Story = { render: () => <div className="flex flex-col gap-4"><p>Above</p><Divider /><p>Below</p></div> };
export const Vertical: Story = { render: () => <div className="flex h-8 items-center gap-4"><span>Left</span><Divider orientation="vertical" /><span>Right</span></div> };
export const Semantic: Story = { render: () => <div className="flex flex-col gap-4"><p>Section A</p><Divider decorative={false} /><p>Section B</p></div> };
