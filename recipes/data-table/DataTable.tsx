import React, { useMemo, useState, useCallback } from 'react';

import { cn } from '@ds0/primitives';

import { Stack } from '../../components/react/stack';
import { Text } from '../../components/react/text';
import { Button } from '../../components/react/button';
import { TextField } from '../../components/react/text-field';
import { Checkbox } from '../../components/react/checkbox';
import { Badge } from '../../components/react/badge';
import { Skeleton } from '../../components/react/skeleton';

/**
 * Column definition for the DataTable.
 */
interface DataTableColumn<T> {
    /** Unique column key */
    key: string;
    /** Column header label */
    header: string;
    /** Accessor for cell value */
    accessor: (row: T) => React.ReactNode;
    /** Whether the column is sortable */
    sortable?: boolean;
    /** Column width class */
    width?: string;
}

/**
 * Sort direction.
 */
type SortDirection = 'asc' | 'desc';

/**
 * Props for the DataTable recipe component.
 */
interface DataTableProps<T> {
    /** Column definitions */
    columns: DataTableColumn<T>[];
    /** Data rows */
    data: T[];
    /** Unique key accessor for each row */
    getRowKey: (row: T) => string;
    /** Enable search */
    searchable?: boolean;
    /** Search placeholder */
    searchPlaceholder?: string;
    /** Search filter function */
    onSearch?: (query: string) => T[];
    /** Enable row selection */
    selectable?: boolean;
    /** Selected row keys */
    selectedKeys?: Set<string>;
    /** Selection change handler */
    onSelectionChange?: (keys: Set<string>) => void;
    /** Enable pagination */
    pageSize?: number;
    /** Loading state */
    isLoading?: boolean;
    /** Empty state message */
    emptyMessage?: string;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Sort icon.
 */
function SortIcon({ direction }: { direction?: SortDirection }): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="inline-block ml-1">
            <path d="m7 15 5 5 5-5" className={direction === 'asc' ? 'opacity-30' : ''} />
            <path d="m7 9 5-5 5 5" className={direction === 'desc' ? 'opacity-30' : ''} />
        </svg>
    );
}

/**
 * DataTable recipe.
 * A full-featured data table with search, sorting, pagination, and row selection.
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={[{ key: 'name', header: 'Name', accessor: (r) => r.name, sortable: true }]}
 *   data={users}
 *   getRowKey={(r) => r.id}
 *   searchable
 *   selectable
 * />
 * ```
 */
function DataTable<T>({
    columns,
    data,
    getRowKey,
    searchable = false,
    searchPlaceholder = 'Search…',
    onSearch,
    selectable = false,
    selectedKeys = new Set(),
    onSelectionChange,
    pageSize,
    isLoading = false,
    emptyMessage = 'No results found.',
    className,
}: DataTableProps<T>): React.ReactElement {
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<SortDirection>('asc');
    const [page, setPage] = useState(0);

    const filteredData = useMemo(() => {
        if (!search) return data;
        if (onSearch) return onSearch(search);
        return data;
    }, [data, search, onSearch]);

    const sortedData = useMemo(() => {
        if (!sortKey) return filteredData;
        const col = columns.find((c) => c.key === sortKey);
        if (!col) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aVal = String(col.accessor(a) ?? '');
            const bVal = String(col.accessor(b) ?? '');
            const cmp = aVal.localeCompare(bVal);
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }, [filteredData, sortKey, sortDir, columns]);

    const paginatedData = useMemo(() => {
        if (!pageSize) return sortedData;
        const start = page * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, page, pageSize]);

    const totalPages = pageSize ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;

    const handleSort = (key: string): void => {
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const allSelected = paginatedData.length > 0 && paginatedData.every((row) => selectedKeys.has(getRowKey(row)));
    const someSelected = paginatedData.some((row) => selectedKeys.has(getRowKey(row)));

    const toggleAll = useCallback((): void => {
        if (!onSelectionChange) return;
        const next = new Set(selectedKeys);
        if (allSelected) {
            for (const row of paginatedData) next.delete(getRowKey(row));
        } else {
            for (const row of paginatedData) next.add(getRowKey(row));
        }
        onSelectionChange(next);
    }, [allSelected, paginatedData, selectedKeys, onSelectionChange, getRowKey]);

    const toggleRow = useCallback(
        (key: string): void => {
            if (!onSelectionChange) return;
            const next = new Set(selectedKeys);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            onSelectionChange(next);
        },
        [selectedKeys, onSelectionChange],
    );

    return (
        <Stack gap="4" className={className}>
            {/* Toolbar */}
            {(searchable || (selectable && selectedKeys.size > 0)) && (
                <Stack direction="horizontal" justify="between" align="center" gap="4">
                    {searchable && (
                        <TextField
                            label=""
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(0);
                            }}
                            className="max-w-sm"
                            aria-label="Search table"
                        />
                    )}
                    {selectable && selectedKeys.size > 0 && (
                        <Text size="sm" color="muted">
                            {selectedKeys.size} row{selectedKeys.size !== 1 ? 's' : ''} selected
                        </Text>
                    )}
                </Stack>
            )}

            {/* Table */}
            <div className="rounded-md border overflow-auto">
                <table className="w-full text-sm">
                    <thead className="border-b bg-muted/50">
                        <tr>
                            {selectable && (
                                <th className="w-10 px-4 py-3">
                                    <Checkbox
                                        label=""
                                        checked={allSelected}
                                        indeterminate={someSelected && !allSelected}
                                        onCheckedChange={() => toggleAll()}
                                        aria-label="Select all rows"
                                    />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={cn(
                                        'px-4 py-3 text-left font-medium text-muted-foreground',
                                        col.sortable && 'cursor-pointer select-none hover:text-foreground',
                                        col.width,
                                    )}
                                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                                    aria-sort={
                                        sortKey === col.key
                                            ? sortDir === 'asc'
                                                ? 'ascending'
                                                : 'descending'
                                            : undefined
                                    }
                                >
                                    {col.header}
                                    {col.sortable && (
                                        <SortIcon direction={sortKey === col.key ? sortDir : undefined} />
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading
                            ? Array.from({ length: pageSize ?? 5 }).map((_, i) => (
                                <tr key={i} className="border-b">
                                    {selectable && (
                                        <td className="px-4 py-3"><Skeleton className="h-4 w-4" /></td>
                                    )}
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-3">
                                            <Skeleton className="h-4 w-24" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                            : paginatedData.length === 0
                                ? (
                                    <tr>
                                        <td
                                            colSpan={columns.length + (selectable ? 1 : 0)}
                                            className="px-4 py-8 text-center text-muted-foreground"
                                        >
                                            {emptyMessage}
                                        </td>
                                    </tr>
                                )
                                : paginatedData.map((row) => {
                                    const key = getRowKey(row);
                                    return (
                                        <tr key={key} className={cn('border-b transition-colors hover:bg-muted/50', selectedKeys.has(key) && 'bg-muted/30')}>
                                            {selectable && (
                                                <td className="px-4 py-3">
                                                    <Checkbox
                                                        label=""
                                                        checked={selectedKeys.has(key)}
                                                        onCheckedChange={() => toggleRow(key)}
                                                        aria-label={`Select row ${key}`}
                                                    />
                                                </td>
                                            )}
                                            {columns.map((col) => (
                                                <td key={col.key} className="px-4 py-3">
                                                    {col.accessor(row)}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pageSize && totalPages > 1 && (
                <Stack direction="horizontal" justify="between" align="center">
                    <Text size="sm" color="muted">
                        Page {page + 1} of {totalPages}
                    </Text>
                    <Stack direction="horizontal" gap="2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 0}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages - 1}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </Button>
                    </Stack>
                </Stack>
            )}
        </Stack>
    );
}

DataTable.displayName = 'DataTable';

export { DataTable };
export type { DataTableProps, DataTableColumn };
