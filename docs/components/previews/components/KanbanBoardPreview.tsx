'use client';

import { KanbanBoard } from '../../../../components/react/kanban-board';

const columns = [
    {
        id: 'backlog',
        title: 'Backlog',
        items: [
            { id: '1', title: 'Research competitors', description: 'Analyze top 5 design systems' },
            { id: '2', title: 'Write docs for Sidebar' },
        ],
    },
    {
        id: 'in-progress',
        title: 'In Progress',
        items: [
            { id: '3', title: 'Build DataTable preview', description: 'Add sorting and pagination demo' },
        ],
    },
    {
        id: 'review',
        title: 'Review',
        items: [
            { id: '4', title: 'Calendar a11y audit', description: 'Test screen reader navigation' },
        ],
    },
    {
        id: 'done',
        title: 'Done',
        items: [
            { id: '5', title: 'Ship Carousel component' },
            { id: '6', title: 'Fix ColorPicker popover' },
        ],
    },
];

export function KanbanBoardPreview(): React.ReactElement {
    return (
        <div className="w-full overflow-x-auto">
            <KanbanBoard columns={columns} onColumnsChange={() => {}} />
        </div>
    );
}
