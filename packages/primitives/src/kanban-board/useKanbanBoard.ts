import { useCallback, useState } from 'react';
import type { UseKanbanBoardProps, UseKanbanBoardReturn, KanbanColumn } from './KanbanBoard.types';

export function useKanbanBoard(props: UseKanbanBoardProps): UseKanbanBoardReturn {
    const { columns: controlledColumns, onColumnsChange } = props;
    const [internalColumns, setInternalColumns] = useState(controlledColumns);
    const cols = onColumnsChange ? controlledColumns : internalColumns;

    const moveItem = useCallback((itemId: string, fromColumnId: string, toColumnId: string, toIndex?: number) => {
        const newCols: KanbanColumn[] = cols.map(c => ({ ...c, items: [...c.items] }));
        const fromCol = newCols.find(c => c.id === fromColumnId);
        const toCol = newCols.find(c => c.id === toColumnId);
        if (!fromCol || !toCol) return;
        const itemIdx = fromCol.items.findIndex(i => i.id === itemId);
        if (itemIdx === -1) return;
        const [item] = fromCol.items.splice(itemIdx, 1);
        const insertIdx = toIndex !== undefined ? toIndex : toCol.items.length;
        toCol.items.splice(insertIdx, 0, item);
        if (onColumnsChange) onColumnsChange(newCols); else setInternalColumns(newCols);
    }, [cols, onColumnsChange]);

    return {
        kanbanBoardProps: { role: 'region', 'aria-label': 'Kanban board' },
        moveItem,
    };
}
