import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useKanbanBoard } from '@ds0/primitives';
import type { StyledKanbanBoardProps } from '@ds0/primitives';

const KanbanBoard = forwardRef<HTMLDivElement, StyledKanbanBoardProps>(
    ({ className, variant = 'default', columns, onColumnsChange, renderItem, renderColumnHeader, ...props }, ref) => {
        const { kanbanBoardProps } = useKanbanBoard({ columns, onColumnsChange });
        return (
            <div ref={ref} className={cn('flex gap-4 overflow-x-auto pb-4', className)} {...props} {...kanbanBoardProps}>
                {columns.map(col => (
                    <div key={col.id} className={cn('flex-shrink-0 rounded-lg p-3', variant === 'compact' ? 'w-64' : 'w-72', 'bg-muted/40')}>
                        <div className="flex items-center justify-between mb-3 px-1">
                            {renderColumnHeader ? renderColumnHeader(col) : (
                                <><h3 className="text-sm font-semibold">{col.title}</h3><span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{col.items.length}</span></>
                            )}
                        </div>
                        <div className="space-y-2">
                            {col.items.map(item => renderItem ? renderItem(item) : (
                                <div key={item.id} className="rounded-md border bg-card p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                                    <p className="text-sm font-medium">{item.title}</p>
                                    {item.description && <p className="text-xs text-muted-foreground mt-1">{item.description}</p>}
                                </div>
                            ))}
                            {col.items.length === 0 && <div className="rounded-md border border-dashed p-4 text-center text-xs text-muted-foreground">No items</div>}
                        </div>
                    </div>
                ))}
            </div>
        );
    },
);
KanbanBoard.displayName = 'KanbanBoard';
export { KanbanBoard };
export type { StyledKanbanBoardProps as KanbanBoardProps };
