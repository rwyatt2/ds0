import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Confetti } from './Confetti';

const meta: Meta<typeof Confetti> = { title: 'Components/Feedback/Confetti', component: Confetti, tags: ['autodocs'], argTypes: { count: { control: { type: 'number', min: 10, max: 200 } }, duration: { control: { type: 'number', min: 1000, max: 10000 } }, pieceSize: { control: 'select', options: ['sm', 'md', 'lg'] } } };
export default meta;
type Story = StoryObj<typeof Confetti>;

export const Default: Story = { args: { isActive: true } };
export const SmallPieces: Story = { args: { isActive: true, pieceSize: 'sm', count: 120 } };
export const LargePieces: Story = { args: { isActive: true, pieceSize: 'lg', count: 40 } };
export const CustomColors: Story = { args: { isActive: true, colors: ['#ff0', '#f0f', '#0ff'] } };

export const TriggerButton: Story = {
    render: () => {
        const [active, setActive] = useState(false);
        return (
            <div className="space-y-4">
                <button className="rounded-md bg-primary text-primary-foreground px-4 py-2 font-medium" onClick={() => setActive(true)}>
                    🎉 Celebrate!
                </button>
                <Confetti isActive={active} onComplete={() => setActive(false)} />
            </div>
        );
    },
};
