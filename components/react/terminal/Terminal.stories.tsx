import type { Meta, StoryObj } from '@storybook/react';
import { Terminal } from './Terminal';
const meta: Meta<typeof Terminal> = { title: 'Components/Data Display/Terminal', component: Terminal, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Terminal>;
const lines = [
    { type: 'input' as const, content: 'npm install @ds0/react' },
    { type: 'output' as const, content: 'added 42 packages in 3.2s' },
    { type: 'input' as const, content: 'npm run dev' },
    { type: 'output' as const, content: '  VITE v5.0.0  ready in 240ms\n\n  ➜  Local:   http://localhost:5173/' },
];
export const Default: Story = { args: { lines, readOnly: true, title: 'Terminal' } };
export const Light: Story = { args: { lines, readOnly: true, variant: 'light', title: 'Terminal' } };
export const WithError: Story = { args: { lines: [...lines, { type: 'error' as const, content: 'Error: Module not found' }], readOnly: true, title: 'Terminal' } };
export const Interactive: Story = { args: { lines: [{ type: 'output' as const, content: 'Type a command and press Enter' }], title: 'Interactive Terminal' } };
