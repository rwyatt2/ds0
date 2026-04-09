import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './Combobox';
const meta: Meta<typeof Combobox> = { title: 'Components/Input/Combobox', component: Combobox, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Combobox>;
const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Qwik', 'Preact', 'Lit'];
export const Default: Story = { render: () => <Combobox items={frameworks} placeholder="Search framework..." className="w-64" /> };
