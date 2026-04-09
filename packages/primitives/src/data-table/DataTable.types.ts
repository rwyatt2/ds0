import type React from 'react';

/**
 * Column definition for the DataTable.
 */
export interface ColumnDef<T> {
    /** Unique key that maps to a property in the data object */
    accessorKey: keyof T & string;
    /** Display header text */
    header: string;
    /** Whether this column is sortable */
    sortable?: boolean;
    /** Custom cell renderer */
    cell?: (value: T[keyof T], row: T) => React.ReactNode;
    /** Column width */
    width?: string;
}

/**
 * Sort state for a column.
 */
export interface SortState {
    /** Column key being sorted */
    column: string;
    /** Sort direction */
    direction: 'asc' | 'desc';
}

/**
 * Props for the useDataTable hook.
 */
export interface UseDataTableProps<T> {
    /** Array of data objects */
    data: T[];
    /** Column definitions */
    columns: ColumnDef<T>[];
    /** Whether sorting is enabled */
    sortable?: boolean;
    /** Whether row selection is enabled */
    selectable?: boolean;
    /** Controlled sort state */
    sortState?: SortState | null;
    /** Sort state change handler */
    onSortChange?: (sort: SortState | null) => void;
    /** Controlled selected row indices */
    selectedRows?: number[];
    /** Selection change handler */
    onSelectionChange?: (indices: number[]) => void;
    /** Whether the table is in a loading state */
    isLoading?: boolean;
}

/**
 * Return value of the useDataTable hook.
 */
export interface UseDataTableReturn<T> {
    /** Props to spread onto the table wrapper */
    tableProps: React.HTMLAttributes<HTMLDivElement>;
    /** Processed (sorted) data */
    processedData: T[];
    /** Current sort state */
    currentSort: SortState | null;
    /** Toggle sort on a column */
    toggleSort: (column: string) => void;
    /** Currently selected row indices */
    selectedRows: number[];
    /** Toggle selection of a row */
    toggleRowSelection: (index: number) => void;
    /** Toggle selection of all rows */
    toggleAllSelection: () => void;
    /** Whether all rows are selected */
    allSelected: boolean;
    /** Get sort direction for a column */
    getSortDirection: (column: string) => 'asc' | 'desc' | undefined;
}

/**
 * Props for the DataTable primitive component.
 */
export interface DataTableProps<T>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
        UseDataTableProps<T> {
    /** Content to display inside the table */
    children?: React.ReactNode;
    /** Content to display when data is empty */
    emptyMessage?: React.ReactNode;
}

/**
 * Props for the styled DataTable component.
 */
export interface StyledDataTableProps<T> extends DataTableProps<T> {
    /** Visual variant */
    variant?: 'default' | 'striped';
    /** Size of cells */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}
