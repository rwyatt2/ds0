import type React from 'react';

export interface KanbanItem { id: string; title: string; description?: string; [key: string]: unknown; }
export interface KanbanColumn { id: string; title: string; items: KanbanItem[]; }

export interface UseKanbanBoardProps { columns: KanbanColumn[]; onColumnsChange?: (columns: KanbanColumn[]) => void; }
export interface UseKanbanBoardReturn { kanbanBoardProps: React.HTMLAttributes<HTMLDivElement>; moveItem: (itemId: string, fromColumnId: string, toColumnId: string, toIndex?: number) => void; }

export interface KanbanBoardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseKanbanBoardProps { renderItem?: (item: KanbanItem) => React.ReactNode; renderColumnHeader?: (column: KanbanColumn) => React.ReactNode; }
export interface StyledKanbanBoardProps extends KanbanBoardProps { variant?: 'default' | 'compact'; className?: string; }
