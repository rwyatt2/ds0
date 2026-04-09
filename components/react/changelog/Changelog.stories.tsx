import type { Meta, StoryObj } from '@storybook/react';
import { Changelog } from './Changelog';
const meta: Meta<typeof Changelog> = { title: 'Recipes/Commerce/Changelog', component: Changelog, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Changelog>;
const entries = [{ id: '1', version: '2.0.0', date: '2024-03-15', title: 'Major redesign', type: 'breaking' as const, description: 'Complete UI overhaul' }, { id: '2', version: '1.5.0', date: '2024-02-28', title: 'Dark mode support', type: 'feature' as const }, { id: '3', version: '1.4.2', date: '2024-02-15', title: 'Fix dropdown close', type: 'fix' as const }];
export const Default: Story = { args: { entries, title: 'Changelog' } };
export const Compact: Story = { args: { entries, variant: 'compact' } };
