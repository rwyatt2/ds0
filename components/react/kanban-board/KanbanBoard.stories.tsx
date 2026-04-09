import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard } from './KanbanBoard';
const meta: Meta<typeof KanbanBoard> = { title: 'Components/Data Display/KanbanBoard', component: KanbanBoard, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof KanbanBoard>;
const sampleColumns = [
    { id: 'backlog', title: 'Backlog', items: [{ id: '1', title: 'Research competitors', description: 'Market analysis' }, { id: '2', title: 'Design wireframes' }] },
    { id: 'inprogress', title: 'In Progress', items: [{ id: '3', title: 'Build landing page', description: 'Hero section first' }] },
    { id: 'review', title: 'Review', items: [{ id: '4', title: 'API documentation' }] },
    { id: 'done', title: 'Done', items: [{ id: '5', title: 'Set up CI/CD' }, { id: '6', title: 'Configure database' }] },
];
export const Default: Story = { args: { columns: sampleColumns } };
export const Compact: Story = { args: { columns: sampleColumns, variant: 'compact' } };
