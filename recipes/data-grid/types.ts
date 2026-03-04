import React from 'react';

export type SortDirection = 'asc' | 'desc';
export type DensityMode = 'compact' | 'normal' | 'comfortable';
export type PinDirection = 'left' | 'right' | null;

export interface SortState {
    key: string;
    direction: SortDirection;
}

/**
 * Action definition for row action menus.
 */
export interface RowAction<T> {
    /** Action label */
    label: string;
    /** Optional icon */
    icon?: React.ReactNode;
    /** Click handler — receives the current row */
    onClick: (row: T) => void;
    /** Visual variant */
    variant?: 'default' | 'danger';
    /** Disable predicate — receives the current row */
    disabled?: (row: T) => boolean;
}

/**
 * Column definition for the DataGrid.
 */
export interface DataGridColumn<T> {
    /** Unique column key */
    key: string;
    /** Column header label */
    header: string;
    /** Accessor for cell value — return the raw value for sorting/filtering */
    accessor: (row: T) => React.ReactNode;
    /** Raw value accessor for sorting/filtering (falls back to accessor) */
    rawValue?: (row: T) => string | number;
    /** Whether the column is sortable */
    sortable?: boolean;
    /** Whether the column has a filter input */
    filterable?: boolean;
    /** Whether the column cells are editable */
    editable?: boolean;
    /** Column width in px (for resizing) */
    width?: number;
    /** Min width in px */
    minWidth?: number;
    /** Pin direction */
    pin?: PinDirection;
    /** Custom cell renderer */
    cellRenderer?: (value: React.ReactNode, row: T) => React.ReactNode;
    /** Cell type for editing */
    type?: 'text' | 'number' | 'boolean' | 'select';
    /** Options for select type */
    options?: string[];
}

/**
 * Props for the DataGrid component.
 */
export interface DataGridProps<T> {
    /** Column definitions */
    columns: DataGridColumn<T>[];
    /** Data rows */
    data: T[];
    /** Unique key accessor for each row */
    getRowKey: (row: T) => string;
    /** Enable column sorting */
    sortable?: boolean;
    /** Enable global search */
    searchable?: boolean;
    /** Search placeholder */
    searchPlaceholder?: string;
    /** Enable per-column filters */
    filterable?: boolean;
    /** Enable row selection */
    selectable?: boolean;
    /** Selected row keys (controlled) */
    selectedKeys?: Set<string>;
    /** Selection change handler */
    onSelectionChange?: (keys: Set<string>) => void;
    /** Enable inline editing */
    editable?: boolean;
    /** Cell edit handler */
    onCellEdit?: (rowKey: string, columnKey: string, value: string) => void;
    /** Page size (enables pagination) */
    pageSize?: number;
    /** Enable column resizing */
    resizable?: boolean;
    /** Enable column reordering */
    reorderable?: boolean;
    /** Enable column pinning */
    pinnable?: boolean;
    /** Enable column visibility toggle */
    columnToggle?: boolean;
    /** Enable row expansion */
    expandable?: boolean;
    /** Row detail renderer */
    renderRowDetail?: (row: T) => React.ReactNode;
    /** Enable CSV export */
    exportable?: boolean;
    /** Table density */
    density?: DensityMode;
    /** Enable density toggle */
    densityToggle?: boolean;
    /** Striped rows */
    striped?: boolean;
    /** Sticky header */
    stickyHeader?: boolean;
    /** Loading state */
    isLoading?: boolean;
    /** Empty state message */
    emptyMessage?: string;
    /** Additional CSS classes */
    className?: string;
    /** Table caption for accessibility */
    caption?: string;
    /** Row action menu items */
    rowActions?: RowAction<T>[];
    /** Enable interactive column freezing */
    freezable?: boolean;
    /** Show status bar footer with counts & aggregates */
    statusBar?: boolean;
    /** Enable multi-column sort via Shift+Click */
    multiSort?: boolean;
    /** Enable right-click context menu on rows */
    contextMenu?: boolean;
}
