import React, { forwardRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import type { StyledKanbanBoardProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledScrollView = styled(ScrollView);
const KanbanBoard = forwardRef<React.ElementRef<typeof View>, StyledKanbanBoardProps>(({ columns, ...props }, ref) => (
    <StyledScrollView ref={ref} horizontal className="flex-row gap-4 p-2" {...props}>
        {columns.map(col => (
            <StyledView key={col.id} className="w-64 bg-gray-50 rounded-lg p-3 mr-3">
                <StyledText className="font-semibold text-sm mb-2">{col.title} ({col.items.length})</StyledText>
                {col.items.map(item => <StyledView key={item.id} className="bg-white rounded-md border p-3 mb-2"><StyledText className="text-sm">{item.title}</StyledText></StyledView>)}
            </StyledView>
        ))}
    </StyledScrollView>
));
KanbanBoard.displayName = 'KanbanBoard';
export { KanbanBoard };
