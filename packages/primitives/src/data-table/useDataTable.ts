import { useCallback, useMemo, useState } from 'react';

import type { UseDataTableProps, UseDataTableReturn, SortState } from './DataTable.types';

/**
 * Hook that encapsulates DataTable behavior.
 * Manages sorting, row selection, and ARIA attributes.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the table and state values
 *
 * @example
 * ```tsx
 * const { tableProps, processedData, toggleSort } = useDataTable({
 *   data: users,
 *   columns: [{ accessorKey: 'name', header: 'Name' }],
 * });
 * ```
 */
export function useDataTable<T>(props: UseDataTableProps<T>): UseDataTableReturn<T> {
    const {
        data,
        columns: _columns,
        sortable = true,
        selectable = false,
        sortState: controlledSort,
        onSortChange,
        selectedRows: controlledSelected,
        onSelectionChange,
        isLoading = false,
    } = props;

    const [internalSort, setInternalSort] = useState<SortState | null>(null);
    const [internalSelected, setInternalSelected] = useState<number[]>([]);

    const currentSort = controlledSort !== undefined ? controlledSort : internalSort;
    const selectedRows = controlledSelected !== undefined ? controlledSelected : internalSelected;

    const toggleSort = useCallback(
        (column: string) => {
            if (!sortable) return;

            const newSort: SortState | null =
                currentSort?.column === column
                    ? currentSort.direction === 'asc'
                        ? { column, direction: 'desc' }
                        : null
                    : { column, direction: 'asc' };

            if (onSortChange) {
                onSortChange(newSort);
            } else {
                setInternalSort(newSort);
            }
        },
        [sortable, currentSort, onSortChange],
    );

    const getSortDirection = useCallback(
        (column: string): 'asc' | 'desc' | undefined => {
            if (currentSort?.column === column) {
                return currentSort.direction;
            }
            return undefined;
        },
        [currentSort],
    );

    const toggleRowSelection = useCallback(
        (index: number) => {
            if (!selectable) return;

            const newSelected = selectedRows.includes(index)
                ? selectedRows.filter((i) => i !== index)
                : [...selectedRows, index];

            if (onSelectionChange) {
                onSelectionChange(newSelected);
            } else {
                setInternalSelected(newSelected);
            }
        },
        [selectable, selectedRows, onSelectionChange],
    );

    const allSelected = selectable && data.length > 0 && selectedRows.length === data.length;

    const toggleAllSelection = useCallback(() => {
        if (!selectable) return;

        const newSelected = allSelected ? [] : data.map((_, i) => i);

        if (onSelectionChange) {
            onSelectionChange(newSelected);
        } else {
            setInternalSelected(newSelected);
        }
    }, [selectable, allSelected, data, onSelectionChange]);

    const processedData = useMemo(() => {
        if (!currentSort) return [...data];

        return [...data].sort((a, b) => {
            const key = currentSort.column as keyof T;
            const aVal = a[key];
            const bVal = b[key];

            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;

            const comparison = String(aVal).localeCompare(String(bVal), undefined, {
                numeric: true,
                sensitivity: 'base',
            });

            return currentSort.direction === 'asc' ? comparison : -comparison;
        });
    }, [data, currentSort]);

    return {
        tableProps: {
            role: 'grid',
            'aria-busy': isLoading || undefined,
            'aria-rowcount': data.length,
        },
        processedData,
        currentSort,
        toggleSort,
        selectedRows,
        toggleRowSelection,
        toggleAllSelection,
        allSelected,
        getSortDirection,
    };
}
