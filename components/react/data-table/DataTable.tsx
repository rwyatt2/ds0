import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useDataTable } from '@ds0/primitives';
import type { StyledDataTableProps, ColumnDef } from '@ds0/primitives';

const dataTableVariants = cva(
    'w-full overflow-auto rounded-md border border-border',
    {
        variants: {
            variant: {
                default: '',
                striped: '[&_tbody_tr:nth-child(even)]:bg-muted/50',
            },
            size: {
                sm: '[&_th]:px-3 [&_th]:py-1.5 [&_th]:text-xs [&_td]:px-3 [&_td]:py-1.5 [&_td]:text-xs',
                md: '[&_th]:px-4 [&_th]:py-2 [&_th]:text-sm [&_td]:px-4 [&_td]:py-2 [&_td]:text-sm',
                lg: '[&_th]:px-4 [&_th]:py-3 [&_th]:text-base [&_td]:px-4 [&_td]:py-3 [&_td]:text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    },
);

type DataTableVariants = VariantProps<typeof dataTableVariants>;

/**
 * Styled DataTable component.
 * Built on the headless DataTable primitive with Tailwind CSS styling via cva.
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={[
 *     { accessorKey: 'name', header: 'Name' },
 *     { accessorKey: 'email', header: 'Email' },
 *   ]}
 *   variant="striped"
 *   size="md"
 * />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/data-table | Documentation}
 */
const DataTable = forwardRef<HTMLDivElement, StyledDataTableProps<Record<string, unknown>>>(
    (
        {
            className,
            variant,
            size,
            data,
            columns,
            sortable = true,
            selectable = false,
            sortState,
            onSortChange,
            selectedRows: selectedRowsProp,
            onSelectionChange,
            isLoading = false,
            emptyMessage = 'No data',
            ...props
        },
        ref,
    ) => {
        const {
            tableProps,
            processedData,
            toggleSort,
            selectedRows,
            toggleRowSelection,
            toggleAllSelection,
            allSelected,
            getSortDirection,
        } = useDataTable({
            data,
            columns: columns as ColumnDef<Record<string, unknown>>[],
            sortable,
            selectable,
            sortState,
            onSortChange,
            selectedRows: selectedRowsProp,
            onSelectionChange,
            isLoading,
        });

        const sortIcon = (direction: 'asc' | 'desc' | undefined) => {
            if (!direction) return ' ↕';
            return direction === 'asc' ? ' ↑' : ' ↓';
        };

        return (
            <div
                ref={ref}
                className={cn(dataTableVariants({ variant, size }), className)}
                {...props}
            >
                <table
                    className="w-full caption-bottom text-sm"
                    {...tableProps}
                >
                    <thead className="border-b border-border">
                        <tr className="border-b border-border transition-colors hover:bg-muted/50">
                            {selectable && (
                                <th className="w-10 text-center">
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        onChange={toggleAllSelection}
                                        aria-label="Select all rows"
                                        className="rounded border-border"
                                    />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.accessorKey}
                                    className="text-left font-medium text-muted-foreground"
                                    aria-sort={
                                        getSortDirection(col.accessorKey) === 'asc'
                                            ? 'ascending'
                                            : getSortDirection(col.accessorKey) === 'desc'
                                              ? 'descending'
                                              : undefined
                                    }
                                    style={col.width ? { width: col.width } : undefined}
                                >
                                    {col.sortable !== false && sortable ? (
                                        <button
                                            type="button"
                                            onClick={() => toggleSort(col.accessorKey)}
                                            className="inline-flex items-center gap-1 font-medium hover:text-foreground transition-colors"
                                            aria-label={`Sort by ${col.header}`}
                                        >
                                            {col.header}
                                            <span className="text-xs opacity-50">{sortIcon(getSortDirection(col.accessorKey))}</span>
                                        </button>
                                    ) : (
                                        col.header
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {processedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (selectable ? 1 : 0)}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            processedData.map((row, index) => (
                                <tr
                                    key={index}
                                    className={cn(
                                        'border-b border-border transition-colors hover:bg-muted/50',
                                        selectable && selectedRows.includes(index) && 'bg-primary/5',
                                    )}
                                    aria-selected={selectable ? selectedRows.includes(index) : undefined}
                                >
                                    {selectable && (
                                        <td className="w-10 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(index)}
                                                onChange={() => toggleRowSelection(index)}
                                                aria-label={`Select row ${index + 1}`}
                                                className="rounded border-border"
                                            />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td key={col.accessorKey} className="text-foreground">
                                            {col.cell
                                                ? col.cell(row[col.accessorKey], row)
                                                : String(row[col.accessorKey] ?? '')}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        );
    },
);

DataTable.displayName = 'DataTable';

export { DataTable, dataTableVariants };
export type { StyledDataTableProps as DataTableProps };
