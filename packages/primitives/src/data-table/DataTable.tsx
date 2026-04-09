import React, { forwardRef } from 'react';

import { useDataTable } from './useDataTable';
import type { DataTableProps } from './DataTable.types';

/**
 * Headless DataTable primitive.
 * Provides sorting, selection, and ARIA attributes without styling.
 *
 * @example
 * ```tsx
 * <DataTablePrimitive
 *   data={users}
 *   columns={[{ accessorKey: 'name', header: 'Name' }]}
 * />
 * ```
 */
const DataTablePrimitive = forwardRef<HTMLDivElement, DataTableProps<Record<string, unknown>>>(
    ({ data, columns, sortable, selectable, sortState, onSortChange, selectedRows: selectedRowsProp, onSelectionChange, isLoading, emptyMessage = 'No data', children, ...props }, ref) => {
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
            columns,
            sortable,
            selectable,
            sortState,
            onSortChange,
            selectedRows: selectedRowsProp,
            onSelectionChange,
            isLoading,
        });

        if (children) {
            return (
                <div ref={ref} {...tableProps} {...props}>
                    {children}
                </div>
            );
        }

        return (
            <div ref={ref} {...props}>
                <table {...tableProps}>
                    <thead>
                        <tr>
                            {selectable && (
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        onChange={toggleAllSelection}
                                        aria-label="Select all rows"
                                    />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.accessorKey}
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
                                            aria-label={`Sort by ${col.header}`}
                                        >
                                            {col.header}
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
                                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            processedData.map((row, index) => (
                                <tr
                                    key={index}
                                    aria-selected={selectable ? selectedRows.includes(index) : undefined}
                                >
                                    {selectable && (
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(index)}
                                                onChange={() => toggleRowSelection(index)}
                                                aria-label={`Select row ${index + 1}`}
                                            />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td key={col.accessorKey}>
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

DataTablePrimitive.displayName = 'DataTablePrimitive';

export { DataTablePrimitive };
