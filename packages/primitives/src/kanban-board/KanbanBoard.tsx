import { forwardRef } from 'react';
import type { KanbanBoardProps } from './KanbanBoard.types';
import { useKanbanBoard } from './useKanbanBoard';

const KanbanBoardPrimitive = forwardRef<HTMLDivElement, KanbanBoardProps>(
    ({ columns, onColumnsChange, renderItem, renderColumnHeader, ...rest }, ref) => {
        const { kanbanBoardProps, moveItem } = useKanbanBoard({ columns, onColumnsChange });
        return (
            <div ref={ref} {...rest} {...kanbanBoardProps} style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
                {columns.map(col => (
                    <div key={col.id} style={{ minWidth: 250, flex: '0 0 auto' }}>
                        {renderColumnHeader ? renderColumnHeader(col) : <h3>{col.title} ({col.items.length})</h3>}
                        <div>{col.items.map(item => renderItem ? renderItem(item) : <div key={item.id}>{item.title}</div>)}</div>
                    </div>
                ))}
            </div>
        );
    },
);
KanbanBoardPrimitive.displayName = 'KanbanBoardPrimitive';
export { KanbanBoardPrimitive };
