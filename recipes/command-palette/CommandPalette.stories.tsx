import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette } from './CommandPalette';
import { Button } from '../../components/react/button';

const meta: Meta<typeof CommandPalette> = {
    title: 'Recipes/Utility/CommandPalette',
    component: CommandPalette,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CommandPalette>;

const commands = [
    { id: '1', label: 'Go to Dashboard', group: 'Navigation', shortcut: '⌘D', onSelect: () => console.log('Dashboard') },
    { id: '2', label: 'Go to Settings', group: 'Navigation', shortcut: '⌘,', onSelect: () => console.log('Settings') },
    { id: '3', label: 'Go to Projects', group: 'Navigation', onSelect: () => console.log('Projects') },
    { id: '4', label: 'Create New Project', group: 'Actions', shortcut: '⌘N', onSelect: () => console.log('New Project') },
    { id: '5', label: 'Invite Team Member', group: 'Actions', onSelect: () => console.log('Invite') },
    { id: '6', label: 'Toggle Dark Mode', group: 'Preferences', onSelect: () => console.log('Dark Mode') },
    { id: '7', label: 'Sign Out', group: 'Account', onSelect: () => console.log('Sign Out') },
];

function CommandPaletteDemo() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setOpen(true);
            }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Open Command Palette (⌘K)</Button>
            <CommandPalette commands={commands} open={open} onOpenChange={setOpen} />
        </div>
    );
}

export const Default: Story = { render: () => <CommandPaletteDemo /> };
