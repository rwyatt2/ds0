import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = { title: 'Components/Layout/AspectRatio', component: AspectRatio, tags: ['autodocs'], argTypes: { ratio: { control: 'number' } } };
export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Square: Story = { args: { ratio: 1, children: <div className="w-full h-full bg-muted flex items-center justify-center">1:1</div> } };
export const Landscape: Story = { args: { ratio: 16 / 9, children: <div className="w-full h-full bg-muted flex items-center justify-center">16:9</div> } };
export const Portrait: Story = { args: { ratio: 3 / 4, children: <div className="w-full h-full bg-muted flex items-center justify-center">3:4</div> } };

export const WithImage: Story = {
    render: () => (
        <div className="w-96">
            <AspectRatio ratio={16 / 9} className="rounded-md"><img src="https://picsum.photos/800/450" alt="Landscape" className="w-full h-full object-cover" /></AspectRatio>
        </div>
    ),
};
