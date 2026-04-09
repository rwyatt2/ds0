import React, { forwardRef } from 'react';
import { View, Text, ScrollView, type ViewProps } from 'react-native';
import { styled } from 'nativewind';

import { useDataTable } from '@ds0/primitives';
import type { StyledDataTableProps, ColumnDef } from '@ds0/primitives';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

/**
 * React Native DataTable component.
 * Uses NativeWind for styling consistency with the web version.
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={[{ accessorKey: 'name', header: 'Name' }]}
 * />
 * ```
 */
const DataTable = forwardRef<React.ElementRef<typeof ScrollView>, StyledDataTableProps<Record<string, unknown>>>(
    ({ data, columns, sortable = true, size = 'md', ...props }, ref) => {
        const { processedData, toggleSort, getSortDirection } = useDataTable({
            data,
            columns: columns as ColumnDef<Record<string, unknown>>[],
            sortable,
        });

        return (
            <StyledScrollView ref={ref} horizontal className="border border-border rounded-md">
                <StyledView>
                    {/* Header */}
                    <StyledView className="flex-row border-b border-border bg-muted/50">
                        {columns.map((col) => (
                            <StyledView key={col.accessorKey} className="px-4 py-2 min-w-[120px]">
                                <StyledText
                                    className="text-sm font-medium text-muted-foreground"
                                    onPress={sortable ? () => toggleSort(col.accessorKey) : undefined}
                                    accessibilityRole="button"
                                >
                                    {col.header}
                                    {getSortDirection(col.accessorKey) === 'asc' ? ' ↑' : getSortDirection(col.accessorKey) === 'desc' ? ' ↓' : ''}
                                </StyledText>
                            </StyledView>
                        ))}
                    </StyledView>
                    {/* Body */}
                    {processedData.map((row, index) => (
                        <StyledView key={index} className="flex-row border-b border-border">
                            {columns.map((col) => (
                                <StyledView key={col.accessorKey} className="px-4 py-2 min-w-[120px]">
                                    <StyledText className="text-sm text-foreground">
                                        {String(row[col.accessorKey] ?? '')}
                                    </StyledText>
                                </StyledView>
                            ))}
                        </StyledView>
                    ))}
                </StyledView>
            </StyledScrollView>
        );
    },
);

DataTable.displayName = 'DataTable';

export { DataTable };
