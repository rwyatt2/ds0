import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';

// Inline cn utility — zero external dependencies
function cn(...inputs: (string | boolean | null | undefined)[]): string {
    return inputs.filter(Boolean).join(' ');
}

// ─── Types ────────────────────────────────────────────────────

type SortDirection = 'asc' | 'desc';
type DensityMode = 'compact' | 'normal' | 'comfortable';
type PinDirection = 'left' | 'right' | null;

interface SortState {
    key: string;
    direction: SortDirection;
}

/**
 * Action definition for row action menus.
 */
interface RowAction<T> {
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
interface DataGridColumn<T> {
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
interface DataGridProps<T> {
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

// ─── Static Constants ─────────────────────────────────────────
// Hoisted outside the component to avoid recreating on every render.

const DENSITY_CLASSES: Record<DensityMode, string> = {
    compact: 'dg-density-compact',
    normal: 'dg-density-normal',
    comfortable: 'dg-density-comfortable',
} as const;

const CELL_PAD_CLASSES: Record<DensityMode, string> = {
    compact: 'dg-cell-compact',
    normal: 'dg-cell-normal',
    comfortable: 'dg-cell-comfortable',
} as const;

const DENSITY_OPTIONS = ['compact', 'normal', 'comfortable'] as const;

// ─── Icons ────────────────────────────────────────────────────

const SortIcon = React.memo(function SortIcon({ direction }: { direction?: SortDirection }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="dg-sort-icon">
            <path d="m7 15 5 5 5-5" className={direction === 'asc' ? 'dg-sort-dim' : ''} />
            <path d="m7 9 5-5 5 5" className={direction === 'desc' ? 'dg-sort-dim' : ''} />
        </svg>
    );
});

const ChevronIcon = React.memo(function ChevronIcon({ expanded }: { expanded: boolean }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn('dg-expand-icon', expanded && 'dg-expand-icon-open')}>
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
});

function SearchIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
    );
}

function DownloadIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
        </svg>
    );
}

function ColumnsIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" />
        </svg>
    );
}

function CheckIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function XIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    );
}

function MoreVerticalIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
        </svg>
    );
}

function PinIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 17v5" /><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16h14v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
        </svg>
    );
}

function CopyIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
    );
}

// ─── Helpers ──────────────────────────────────────────────────

function getRawValue<T>(col: DataGridColumn<T>, row: T): string {
    if (col.rawValue) return String(col.rawValue(row));
    const v = col.accessor(row);
    return String(v ?? '');
}

// ─── Column Visibility Dropdown ──────────────────────────────

const ColumnVisibilityDropdown = React.memo(function ColumnVisibilityDropdown({
    columns,
    hiddenColumns,
    onToggle,
}: {
    columns: { key: string; header: string }[];
    hiddenColumns: Set<string>;
    onToggle: (key: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent): void {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={ref} className="dg-col-toggle-wrap">
            <button
                type="button"
                className="dg-toolbar-btn"
                onClick={() => setOpen(!open)}
                aria-label="Toggle column visibility"
                aria-expanded={open}
            >
                <ColumnsIcon /> Columns
            </button>
            {open && (
                <div className="dg-col-dropdown" role="menu">
                    {columns.map((col) => (
                        <button
                            key={col.key}
                            type="button"
                            role="menuitemcheckbox"
                            aria-checked={!hiddenColumns.has(col.key)}
                            className={cn('dg-col-dropdown-item', hiddenColumns.has(col.key) && 'dg-col-hidden-item')}
                            onClick={() => onToggle(col.key)}
                        >
                            <span className="dg-col-check">{!hiddenColumns.has(col.key) && <CheckIcon />}</span>
                            {col.header}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});

// ─── Inline Edit Cell ────────────────────────────────────────

const EditableCell = React.memo(function EditableCell({
    value,
    onSave,
    onCancel,
    type = 'text',
    options,
}: {
    value: string;
    onSave: (v: string) => void;
    onCancel: () => void;
    type?: 'text' | 'number' | 'boolean' | 'select';
    options?: string[];
}) {
    const [editValue, setEditValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
        if (e.key === 'Enter') onSave(editValue);
        if (e.key === 'Escape') onCancel();
    }, [editValue, onSave, onCancel]);

    if (type === 'select' && options) {
        return (
            <select
                ref={inputRef as React.RefObject<HTMLSelectElement>}
                value={editValue}
                onChange={(e) => {
                    setEditValue(e.target.value);
                    onSave(e.target.value);
                }}
                onBlur={() => onSave(editValue)}
                onKeyDown={handleKeyDown}
                className="dg-edit-input"
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        );
    }

    return (
        <div className="dg-edit-cell">
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={type === 'number' ? 'number' : 'text'}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => onSave(editValue)}
                className="dg-edit-input"
                aria-label="Edit cell value"
            />
            <div className="dg-edit-actions">
                <button type="button" onClick={() => onSave(editValue)} className="dg-edit-btn dg-edit-save" aria-label="Save"><CheckIcon /></button>
                <button type="button" onClick={onCancel} className="dg-edit-btn dg-edit-cancel" aria-label="Cancel"><XIcon /></button>
            </div>
        </div>
    );
});

// ─── Resize Handle ───────────────────────────────────────────

const ResizeHandle = React.memo(function ResizeHandle({ onResize }: { onResize: (delta: number) => void }) {
    const onResizeRef = useRef(onResize);
    onResizeRef.current = onResize;

    const handleMouseDown = useCallback((e: React.MouseEvent): void => {
        e.preventDefault();
        let lastX = e.clientX;
        const handleMove = (ev: MouseEvent): void => {
            const delta = ev.clientX - lastX;
            lastX = ev.clientX;
            onResizeRef.current(delta);
        };
        const handleUp = (): void => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
        };
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    }, []);

    return <div className="dg-resize-handle" onMouseDown={handleMouseDown} role="separator" aria-orientation="vertical" />;
});

// ─── Checkbox ────────────────────────────────────────────────

const DGCheckbox = React.memo(function DGCheckbox({ checked, indeterminate, onChange, label }: { checked: boolean; indeterminate?: boolean; onChange: () => void; label: string }) {
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (ref.current) ref.current.indeterminate = !!indeterminate;
    }, [indeterminate]);
    return (
        <input ref={ref} type="checkbox" checked={checked} onChange={onChange} aria-label={label} className="dg-checkbox" />
    );
});

// ─── Row Action Menu ────────────────────────────────────────

const RowActionMenu = React.memo(function RowActionMenu<T>({
    actions,
    row,
}: {
    actions: RowAction<T>[];
    row: T;
}) {
    const [open, setOpen] = useState(false);
    const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        function handleClick(e: MouseEvent): void {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node) &&
                menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function handleScroll(): void { setOpen(false); }
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('scroll', handleScroll, true);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [open]);

    const handleToggle = useCallback((e: React.MouseEvent): void => {
        e.stopPropagation();
        if (open) {
            setOpen(false);
            return;
        }
        if (btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect();
            // Open upward: bottom of menu aligns with top of button
            setMenuPos({ top: rect.top, left: rect.right });
        }
        setOpen(true);
    }, [open]);

    return (
        <div ref={wrapRef} className="dg-actions-wrap">
            <button
                ref={btnRef}
                type="button"
                className="dg-actions-btn"
                onClick={handleToggle}
                aria-label="Row actions"
                aria-expanded={open}
            >
                <MoreVerticalIcon />
            </button>
            {open && menuPos && (
                <div
                    ref={menuRef}
                    className="dg-actions-menu"
                    role="menu"
                    style={{ position: 'fixed', bottom: `${window.innerHeight - menuPos.top}px`, left: 'auto', right: `${window.innerWidth - menuPos.left}px`, top: 'auto' }}
                >
                    {actions.map((action, i) => {
                        const isDisabled = action.disabled?.(row) ?? false;
                        return (
                            <button
                                key={i}
                                type="button"
                                role="menuitem"
                                className={cn('dg-actions-item', action.variant === 'danger' && 'dg-actions-item-danger')}
                                disabled={isDisabled}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpen(false);
                                    action.onClick(row);
                                }}
                            >
                                {action.icon && <span className="dg-actions-icon">{action.icon}</span>}
                                {action.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}) as <T>(props: { actions: RowAction<T>[]; row: T }) => React.ReactElement;

// ─── Context Menu ───────────────────────────────────────────

const DGContextMenu = React.memo(function DGContextMenu({
    x,
    y,
    items,
    onClose,
}: {
    x: number;
    y: number;
    items: { label: string; icon?: React.ReactNode; onClick: () => void; variant?: 'default' | 'danger'; separator?: boolean }[];
    onClose: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent): void {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        }
        function handleEsc(e: KeyboardEvent): void {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div ref={ref} className="dg-context-menu" style={{ position: 'fixed', top: y, left: x }} role="menu">
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    {item.separator && <div className="dg-context-separator" />}
                    <button
                        type="button"
                        role="menuitem"
                        className={cn('dg-context-item', item.variant === 'danger' && 'dg-context-item-danger')}
                        onClick={() => { item.onClick(); onClose(); }}
                    >
                        {item.icon && <span className="dg-context-icon">{item.icon}</span>}
                        {item.label}
                    </button>
                </React.Fragment>
            ))}
        </div>
    );
});

// ─── Main DataGrid ───────────────────────────────────────────

function DataGrid<T>({
    columns: initialColumns,
    data,
    getRowKey,
    sortable = false,
    searchable = false,
    searchPlaceholder = 'Search…',
    filterable = false,
    selectable = false,
    selectedKeys: controlledSelectedKeys,
    onSelectionChange,
    editable = false,
    onCellEdit,
    pageSize,
    resizable = false,
    reorderable = false,
    pinnable = false,
    columnToggle = false,
    expandable = false,
    renderRowDetail,
    exportable = false,
    density = 'normal',
    densityToggle = false,
    striped = false,
    stickyHeader = true,
    isLoading = false,
    emptyMessage = 'No results found.',
    className,
    caption,
    rowActions,
    freezable = false,
    statusBar = false,
    multiSort = false,
    contextMenu = false,
}: DataGridProps<T>): React.ReactElement {
    // ── State ─────────────────────────────────────────────────
    const [search, setSearch] = useState('');
    const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
    const [sortState, setSortState] = useState<SortState[]>([]);
    const [page, setPage] = useState(0);
    const [internalSelectedKeys, setInternalSelectedKeys] = useState<Set<string>>(new Set());
    const [editingCell, setEditingCell] = useState<{ rowKey: string; colKey: string } | null>(null);
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    const [columnOrder, setColumnOrder] = useState<string[]>(() => initialColumns.map((c) => c.key));
    const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
    const [pinnedColumns, setPinnedColumns] = useState<Record<string, PinDirection>>({});
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
    const [currentDensity, setCurrentDensity] = useState<DensityMode>(density);
    const [draggedCol, setDraggedCol] = useState<string | null>(null);
    const [contextMenuState, setContextMenuState] = useState<{ x: number; y: number; row: T } | null>(null);

    // Use ref for draggedCol to avoid stale closure in handleDragOver
    const draggedColRef = useRef<string | null>(null);
    draggedColRef.current = draggedCol;

    const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
    const setSelectedKeys = onSelectionChange ?? setInternalSelectedKeys;

    // ── Sync column order when columns change ──────────────────
    useEffect(() => {
        setColumnOrder((prev) => {
            const newKeys = initialColumns.map((c) => c.key);
            const existing = prev.filter((k) => newKeys.includes(k));
            const added = newKeys.filter((k) => !prev.includes(k));
            return [...existing, ...added];
        });
    }, [initialColumns]);

    // ── Column lookup map for O(1) access ─────────────────────
    const columnMap = useMemo(() => {
        const map = new Map<string, DataGridColumn<T>>();
        for (const col of initialColumns) {
            map.set(col.key, col);
        }
        return map;
    }, [initialColumns]);

    // ── Visible & ordered columns ───────────────────────────────
    const visibleColumns = useMemo(() => {
        return columnOrder
            .filter((key) => !hiddenColumns.has(key))
            .map((key) => columnMap.get(key))
            .filter((col): col is DataGridColumn<T> => col != null);
    }, [columnOrder, hiddenColumns, columnMap]);

    // ── Separate pinned columns ─────────────────────────────────
    const { leftPinned, unpinned, rightPinned } = useMemo(() => {
        const left: DataGridColumn<T>[] = [];
        const center: DataGridColumn<T>[] = [];
        const right: DataGridColumn<T>[] = [];
        for (const col of visibleColumns) {
            const pin = pinnedColumns[col.key] ?? col.pin ?? null;
            if (pin === 'left') left.push(col);
            else if (pin === 'right') right.push(col);
            else center.push(col);
        }
        return { leftPinned: left, unpinned: center, rightPinned: right };
    }, [visibleColumns, pinnedColumns]);

    const orderedColumns = useMemo(() => [...leftPinned, ...unpinned, ...rightPinned], [leftPinned, unpinned, rightPinned]);

    // ── Filter ────────────────────────────────────────────────
    const filteredData = useMemo(() => {
        let result = data;
        if (search) {
            const q = search.toLowerCase();
            result = result.filter((row) =>
                initialColumns.some((col) => getRawValue(col, row).toLowerCase().includes(q)),
            );
        }
        if (filterable) {
            for (const [key, filterVal] of Object.entries(columnFilters)) {
                if (!filterVal) continue;
                const col = columnMap.get(key);
                if (!col) continue;
                const q = filterVal.toLowerCase();
                result = result.filter((row) => getRawValue(col, row).toLowerCase().includes(q));
            }
        }
        return result;
    }, [data, search, columnFilters, filterable, initialColumns, columnMap]);

    // ── Sort ──────────────────────────────────────────────────
    const sortedData = useMemo(() => {
        if (!sortable || sortState.length === 0) return filteredData;
        return [...filteredData].sort((a, b) => {
            for (const { key, direction } of sortState) {
                const col = columnMap.get(key);
                if (!col) continue;
                const aVal = getRawValue(col, a);
                const bVal = getRawValue(col, b);
                const aNum = Number(aVal);
                const bNum = Number(bVal);
                let cmp: number;
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    cmp = aNum - bNum;
                } else {
                    cmp = aVal.localeCompare(bVal);
                }
                if (cmp !== 0) return direction === 'asc' ? cmp : -cmp;
            }
            return 0;
        });
    }, [filteredData, sortState, sortable, columnMap]);

    // ── Paginate ──────────────────────────────────────────────
    const paginatedData = useMemo(() => {
        if (!pageSize) return sortedData;
        const start = page * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, page, pageSize]);

    const totalPages = pageSize ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;

    // Reset page on filter/search change
    useEffect(() => {
        setPage(0);
    }, [search, columnFilters]);

    // ── Sort handler ─────────────────────────────────────────
    const handleSort = useCallback((key: string, shiftKey = false): void => {
        setSortState((prev) => {
            const existing = prev.find((s) => s.key === key);
            if (existing) {
                if (existing.direction === 'asc') {
                    return prev.map((s) => (s.key === key ? { ...s, direction: 'desc' as const } : s));
                }
                return prev.filter((s) => s.key !== key);
            }
            // Multi-sort: Shift+Click adds to existing sorts; otherwise replaces
            if (multiSort && shiftKey) {
                return [...prev, { key, direction: 'asc' as const }];
            }
            return [{ key, direction: 'asc' as const }];
        });
    }, [multiSort]);

    const getSortDirection = useCallback((key: string): SortDirection | undefined => {
        return sortState.find((s) => s.key === key)?.direction;
    }, [sortState]);

    // ── Selection ────────────────────────────────────────────
    const allSelected = useMemo(
        () => paginatedData.length > 0 && paginatedData.every((row) => selectedKeys.has(getRowKey(row))),
        [paginatedData, selectedKeys, getRowKey],
    );
    const someSelected = useMemo(
        () => paginatedData.some((row) => selectedKeys.has(getRowKey(row))),
        [paginatedData, selectedKeys, getRowKey],
    );

    const toggleAll = useCallback((): void => {
        const next = new Set(selectedKeys);
        if (allSelected) {
            for (const row of paginatedData) next.delete(getRowKey(row));
        } else {
            for (const row of paginatedData) next.add(getRowKey(row));
        }
        setSelectedKeys(next);
    }, [allSelected, paginatedData, selectedKeys, setSelectedKeys, getRowKey]);

    const toggleRow = useCallback((key: string): void => {
        const next = new Set(selectedKeys);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        setSelectedKeys(next);
    }, [selectedKeys, setSelectedKeys]);

    // ── Column resize ────────────────────────────────────────
    const handleResize = useCallback((key: string, delta: number): void => {
        setColumnWidths((prev) => {
            const col = columnMap.get(key);
            const current = prev[key] ?? col?.width ?? 150;
            const minW = col?.minWidth ?? 60;
            return { ...prev, [key]: Math.max(minW, current + delta) };
        });
    }, [columnMap]);

    // ── Column reorder (drag & drop) ──────────────────────────
    const handleDragStart = useCallback((key: string): void => {
        setDraggedCol(key);
    }, []);

    // Uses ref to avoid stale closure — draggedCol state would be stale
    // inside useCallback without it in the dependency array, but adding
    // it would recreate the handler (breaking drag mid-flight).
    const handleDragOver = useCallback((e: React.DragEvent, key: string): void => {
        e.preventDefault();
        const currentDragged = draggedColRef.current;
        if (!currentDragged || currentDragged === key) return;
        setColumnOrder((prev) => {
            const order = [...prev];
            const fromIdx = order.indexOf(currentDragged);
            const toIdx = order.indexOf(key);
            if (fromIdx < 0 || toIdx < 0) return prev;
            order.splice(fromIdx, 1);
            order.splice(toIdx, 0, currentDragged);
            return order;
        });
    }, []);

    const handleDragEnd = useCallback((): void => {
        setDraggedCol(null);
    }, []);

    // ── Column pinning ───────────────────────────────────────
    const handlePin = useCallback((key: string, dir: PinDirection): void => {
        setPinnedColumns((prev) => ({ ...prev, [key]: prev[key] === dir ? null : dir }));
    }, []);

    // ── Column freeze (cycle: none → left → right → none) ──
    const handleFreeze = useCallback((key: string): void => {
        setPinnedColumns((prev) => {
            const current = prev[key] ?? null;
            if (current === null) return { ...prev, [key]: 'left' };
            if (current === 'left') return { ...prev, [key]: 'right' };
            return { ...prev, [key]: null };
        });
    }, []);

    // ── Context menu handler ─────────────────────────────────
    const handleContextMenu = useCallback((e: React.MouseEvent, row: T): void => {
        if (!contextMenu) return;
        e.preventDefault();
        setContextMenuState({ x: e.clientX, y: e.clientY, row });
    }, [contextMenu]);

    const closeContextMenu = useCallback((): void => {
        setContextMenuState(null);
    }, []);

    // ── Context menu items builder ───────────────────────────
    const buildContextItems = useCallback((row: T) => {
        const items: { label: string; icon?: React.ReactNode; onClick: () => void; variant?: 'default' | 'danger'; separator?: boolean }[] = [
            {
                label: 'Copy Row',
                icon: <CopyIcon />,
                onClick: () => {
                    const text = visibleColumns.map((col) => getRawValue(col, row)).join('\t');
                    navigator.clipboard?.writeText(text);
                },
            },
            {
                label: 'Export Row as CSV',
                icon: <DownloadIcon />,
                onClick: () => {
                    const headers = visibleColumns.map((c) => c.header).join(',');
                    const values = visibleColumns.map((col) => `"${getRawValue(col, row).replace(/"/g, '""')}"`).join(',');
                    const csv = [headers, values].join('\n');
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'row-export.csv';
                    a.click();
                    URL.revokeObjectURL(url);
                },
            },
        ];
        // Add user-defined row actions
        if (rowActions) {
            items.push({ label: '', onClick: () => { }, separator: true });
            for (const action of rowActions) {
                items.push({
                    label: action.label,
                    icon: action.icon,
                    onClick: () => action.onClick(row),
                    variant: action.variant,
                });
            }
        }
        return items;
    }, [visibleColumns, rowActions]);

    // ── Column visibility ────────────────────────────────────
    const handleToggleColumn = useCallback((key: string): void => {
        setHiddenColumns((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    }, []);

    // ── Row expansion ────────────────────────────────────────
    const toggleExpand = useCallback((key: string): void => {
        setExpandedRows((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    }, []);

    // ── CSV export ───────────────────────────────────────────
    const handleExport = useCallback((): void => {
        const headers = visibleColumns.map((c) => c.header);
        const rows = sortedData.map((row) =>
            visibleColumns.map((col) => `"${getRawValue(col, row).replace(/"/g, '""')}"`).join(','),
        );
        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data-export.csv';
        a.click();
        URL.revokeObjectURL(url);
    }, [visibleColumns, sortedData]);

    // ── Editing ──────────────────────────────────────────────
    const handleCellDoubleClick = useCallback((rowKey: string, colKey: string, col: DataGridColumn<T>): void => {
        if (!editable || col.editable === false) return;
        setEditingCell({ rowKey, colKey });
    }, [editable]);

    const handleCellSave = useCallback((rowKey: string, colKey: string, value: string): void => {
        setEditingCell(null);
        onCellEdit?.(rowKey, colKey, value);
    }, [onCellEdit]);

    // ── Keyboard navigation ──────────────────────────────────
    const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
        const target = e.target as HTMLElement;
        const cell = target.closest('[data-dg-cell]') as HTMLElement | null;
        if (!cell) return;
        const row = cell.closest('tr');
        if (!row) return;
        const cells = Array.from(row.querySelectorAll('[data-dg-cell]')) as HTMLElement[];
        const rows = Array.from(row.parentElement?.querySelectorAll('tr') ?? []) as HTMLElement[];
        const cellIdx = cells.indexOf(cell);
        const rowIdx = rows.indexOf(row);

        let nextCell: HTMLElement | null = null;

        switch (e.key) {
            case 'ArrowRight':
                if (cellIdx < cells.length - 1) nextCell = cells[cellIdx + 1] ?? null;
                break;
            case 'ArrowLeft':
                if (cellIdx > 0) nextCell = cells[cellIdx - 1] ?? null;
                break;
            case 'ArrowDown':
                if (rowIdx < rows.length - 1) {
                    const nextRow = rows[rowIdx + 1];
                    if (nextRow) {
                        const nextCells = Array.from(nextRow.querySelectorAll('[data-dg-cell]')) as HTMLElement[];
                        nextCell = nextCells[cellIdx] ?? null;
                    }
                }
                break;
            case 'ArrowUp':
                if (rowIdx > 0) {
                    const prevRow = rows[rowIdx - 1];
                    if (prevRow) {
                        const prevCells = Array.from(prevRow.querySelectorAll('[data-dg-cell]')) as HTMLElement[];
                        nextCell = prevCells[cellIdx] ?? null;
                    }
                }
                break;
            default:
                return;
        }

        if (nextCell) {
            e.preventDefault();
            nextCell.focus();
        }
    }, []);

    // ── Status bar aggregates (memoized) ─────────────────────
    const statusAggregates = useMemo(() => {
        if (!statusBar) return null;
        const numCols = orderedColumns.filter((c) => c.type === 'number');
        if (numCols.length === 0) return null;
        const aggs: { header: string; sum: number; avg: number }[] = [];
        for (const col of numCols) {
            let sum = 0;
            for (const row of sortedData) {
                const v = Number(getRawValue(col, row));
                if (!isNaN(v)) sum += v;
            }
            aggs.push({ header: col.header, sum, avg: sortedData.length ? sum / sortedData.length : 0 });
        }
        return aggs;
    }, [statusBar, orderedColumns, sortedData]);

    // ── Toolbar ──────────────────────────────────────────────
    const showToolbar = searchable || exportable || columnToggle || densityToggle || (selectable && selectedKeys.size > 0);

    const hasActions = !!rowActions && rowActions.length > 0;
    const totalColumns = orderedColumns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (hasActions ? 1 : 0);

    // ── Memoize the column metadata for the visibility dropdown ──
    const columnMeta = useMemo(
        () => initialColumns.map((c) => ({ key: c.key, header: c.header })),
        [initialColumns],
    );

    // Inline sticky styles — CSS pipeline (Tailwind v4) can strip class-based sticky,
    // so we apply it directly to guarantee it works.
    // Background MUST be opaque for sticky headers — the CSS variable uses color-mix
    // with transparency, so we use a solid CSS color that integrates with the theme.
    const stickyThStyle: React.CSSProperties = {
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: 'var(--fd-card, #fafafa)',
    };

    const stickyFilterThStyle: React.CSSProperties = {
        position: 'sticky',
        top: 'auto',
        zIndex: 9,
        backgroundColor: 'var(--fd-card, #fafafa)',
    };

    return (
        <div className={cn('dg-root', className)} data-density={currentDensity}>
            {/* Toolbar */}
            {showToolbar && (
                <div className="dg-toolbar">
                    <div className="dg-toolbar-left">
                        {searchable && (
                            <div className="dg-search-wrap">
                                <span className="dg-search-icon"><SearchIcon /></span>
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="dg-search-input"
                                    aria-label="Search table"
                                />
                                {search && (
                                    <button type="button" className="dg-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                                        <XIcon />
                                    </button>
                                )}
                            </div>
                        )}
                        {selectable && selectedKeys.size > 0 && (
                            <span className="dg-selection-count">
                                {selectedKeys.size} row{selectedKeys.size !== 1 ? 's' : ''} selected
                            </span>
                        )}
                    </div>
                    <div className="dg-toolbar-right">
                        {densityToggle && (
                            <div className="dg-density-toggle">
                                {DENSITY_OPTIONS.map((d) => (
                                    <button
                                        key={d}
                                        type="button"
                                        className={cn('dg-density-btn', currentDensity === d && 'dg-density-active')}
                                        onClick={() => setCurrentDensity(d)}
                                        aria-label={`${d} density`}
                                        aria-pressed={currentDensity === d}
                                    >
                                        {d.charAt(0).toUpperCase() + d.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}
                        {columnToggle && (
                            <ColumnVisibilityDropdown
                                columns={columnMeta}
                                hiddenColumns={hiddenColumns}
                                onToggle={handleToggleColumn}
                            />
                        )}
                        {exportable && (
                            <button type="button" className="dg-toolbar-btn" onClick={handleExport} aria-label="Export as CSV">
                                <DownloadIcon /> Export
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Table container */}
            <div className={cn('dg-table-container', stickyHeader && 'dg-sticky-container')} style={stickyHeader ? { maxHeight: '32rem', overflow: 'auto' } : undefined}>
                <table className={cn('dg-table', DENSITY_CLASSES[currentDensity])} role="grid" aria-rowcount={sortedData.length}>
                    {caption && <caption className="sr-only">{caption}</caption>}
                    <thead className={cn('dg-thead', stickyHeader && 'dg-sticky-header')}>
                        {/* Header row */}
                        <tr className="dg-header-row">
                            {selectable && (
                                <th className={cn('dg-th dg-th-checkbox', CELL_PAD_CLASSES[currentDensity])} style={stickyHeader ? stickyThStyle : undefined}>
                                    <DGCheckbox
                                        checked={allSelected}
                                        indeterminate={someSelected && !allSelected}
                                        onChange={toggleAll}
                                        label="Select all rows"
                                    />
                                </th>
                            )}
                            {expandable && (
                                <th className={cn('dg-th dg-th-expand', CELL_PAD_CLASSES[currentDensity])} aria-label="Expand" style={stickyHeader ? stickyThStyle : undefined} />
                            )}
                            {orderedColumns.map((col) => {
                                const isSortable = sortable && col.sortable !== false;
                                const pin = pinnedColumns[col.key] ?? col.pin ?? null;
                                const width = columnWidths[col.key] ?? col.width;
                                return (
                                    <th
                                        key={col.key}
                                        className={cn(
                                            'dg-th',
                                            CELL_PAD_CLASSES[currentDensity],
                                            isSortable && 'dg-th-sortable',
                                            pin === 'left' && 'dg-pinned-left',
                                            pin === 'right' && 'dg-pinned-right',
                                            draggedCol === col.key && 'dg-dragging',
                                        )}
                                        style={{
                                            ...(width ? { width, minWidth: width } : {}),
                                            ...(stickyHeader ? stickyThStyle : {}),
                                        }}
                                        onClick={isSortable ? (e: React.MouseEvent) => handleSort(col.key, e.shiftKey) : undefined}
                                        aria-sort={getSortDirection(col.key) === 'asc' ? 'ascending' : getSortDirection(col.key) === 'desc' ? 'descending' : undefined}
                                        draggable={reorderable}
                                        onDragStart={reorderable ? () => handleDragStart(col.key) : undefined}
                                        onDragOver={reorderable ? (e) => handleDragOver(e, col.key) : undefined}
                                        onDragEnd={reorderable ? handleDragEnd : undefined}
                                    >
                                        <div className="dg-th-content">
                                            <span className="dg-th-label">
                                                {col.header}
                                                {isSortable && <SortIcon direction={getSortDirection(col.key)} />}
                                                {multiSort && sortState.length > 1 && sortState.findIndex((s) => s.key === col.key) >= 0 && (
                                                    <span className="dg-sort-badge">{sortState.findIndex((s) => s.key === col.key) + 1}</span>
                                                )}
                                            </span>
                                            {pinnable && (
                                                <div className="dg-pin-actions">
                                                    <button type="button" className={cn('dg-pin-btn', pin === 'left' && 'dg-pin-active')} onClick={(e) => { e.stopPropagation(); handlePin(col.key, 'left'); }} aria-label={`Pin ${col.header} left`} title="Pin left">◀</button>
                                                    <button type="button" className={cn('dg-pin-btn', pin === 'right' && 'dg-pin-active')} onClick={(e) => { e.stopPropagation(); handlePin(col.key, 'right'); }} aria-label={`Pin ${col.header} right`} title="Pin right">▶</button>
                                                </div>
                                            )}
                                            {freezable && (
                                                <button
                                                    type="button"
                                                    className={cn('dg-freeze-btn', pin && 'dg-freeze-active')}
                                                    onClick={(e) => { e.stopPropagation(); handleFreeze(col.key); }}
                                                    aria-label={pin ? `Unfreeze ${col.header}` : `Freeze ${col.header}`}
                                                    title={pin === 'left' ? 'Frozen left (click to freeze right)' : pin === 'right' ? 'Frozen right (click to unfreeze)' : 'Freeze column'}
                                                >
                                                    <PinIcon />
                                                </button>
                                            )}
                                        </div>
                                        {resizable && <ResizeHandle onResize={(delta) => handleResize(col.key, delta)} />}
                                    </th>
                                );
                            })}
                            {hasActions && (
                                <th className={cn('dg-th dg-th-actions', CELL_PAD_CLASSES[currentDensity])} style={stickyHeader ? stickyThStyle : undefined} aria-label="Actions" />
                            )}
                        </tr>
                        {/* Column filter row */}
                        {filterable && (
                            <tr className="dg-filter-row">
                                {selectable && <th className="dg-th" style={stickyHeader ? stickyFilterThStyle : undefined} />}
                                {expandable && <th className="dg-th" style={stickyHeader ? stickyFilterThStyle : undefined} />}
                                {orderedColumns.map((col) => (
                                    <th key={col.key} className={cn('dg-th dg-filter-cell', CELL_PAD_CLASSES[currentDensity])} style={stickyHeader ? stickyFilterThStyle : undefined}>
                                        {col.filterable !== false && (
                                            <input
                                                type="text"
                                                placeholder={`Filter ${col.header}…`}
                                                value={columnFilters[col.key] ?? ''}
                                                onChange={(e) => setColumnFilters((prev) => ({ ...prev, [col.key]: e.target.value }))}
                                                className="dg-filter-input"
                                                aria-label={`Filter by ${col.header}`}
                                            />
                                        )}
                                    </th>
                                ))}
                                {hasActions && <th className="dg-th" style={stickyHeader ? stickyFilterThStyle : undefined} />}
                            </tr>
                        )}
                    </thead>
                    <tbody className="dg-tbody" onKeyDown={handleKeyDown}>
                        {isLoading ? (
                            Array.from({ length: pageSize ?? 5 }).map((_, i) => (
                                <tr key={`skeleton-${i}`} className="dg-row">
                                    {selectable && <td className={cn('dg-td', CELL_PAD_CLASSES[currentDensity])}><div className="dg-skeleton dg-skeleton-sm" /></td>}
                                    {expandable && <td className={cn('dg-td', CELL_PAD_CLASSES[currentDensity])} />}
                                    {orderedColumns.map((col) => (
                                        <td key={col.key} className={cn('dg-td', CELL_PAD_CLASSES[currentDensity])}>
                                            <div className="dg-skeleton" />
                                        </td>
                                    ))}
                                    {hasActions && <td className={cn('dg-td', CELL_PAD_CLASSES[currentDensity])} />}
                                </tr>
                            ))
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={totalColumns} className="dg-empty">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, rowIndex) => {
                                const key = getRowKey(row);
                                const isExpanded = expandedRows.has(key);
                                const isSelected = selectedKeys.has(key);
                                return (
                                    <React.Fragment key={key}>
                                        <tr
                                            className={cn(
                                                'dg-row',
                                                isSelected && 'dg-row-selected',
                                                striped && rowIndex % 2 === 1 && 'dg-row-striped',
                                            )}
                                            data-state={isSelected ? 'selected' : undefined}
                                            aria-rowindex={pageSize ? page * pageSize + rowIndex + 1 : rowIndex + 1}
                                            onContextMenu={contextMenu ? (e) => handleContextMenu(e, row) : undefined}
                                        >
                                            {selectable && (
                                                <td className={cn('dg-td dg-td-checkbox', CELL_PAD_CLASSES[currentDensity])} data-dg-cell tabIndex={-1}>
                                                    <DGCheckbox
                                                        checked={isSelected}
                                                        onChange={() => toggleRow(key)}
                                                        label={`Select row ${key}`}
                                                    />
                                                </td>
                                            )}
                                            {expandable && (
                                                <td className={cn('dg-td dg-td-expand', CELL_PAD_CLASSES[currentDensity])} data-dg-cell tabIndex={-1}>
                                                    <button type="button" className="dg-expand-btn" onClick={() => toggleExpand(key)} aria-label={isExpanded ? 'Collapse row' : 'Expand row'}>
                                                        <ChevronIcon expanded={isExpanded} />
                                                    </button>
                                                </td>
                                            )}
                                            {orderedColumns.map((col) => {
                                                const pin = pinnedColumns[col.key] ?? col.pin ?? null;
                                                const width = columnWidths[col.key] ?? col.width;
                                                const isEditing = editingCell?.rowKey === key && editingCell?.colKey === col.key;
                                                const cellValue = col.accessor(row);
                                                const rendered = col.cellRenderer ? col.cellRenderer(cellValue, row) : cellValue;

                                                return (
                                                    <td
                                                        key={col.key}
                                                        className={cn(
                                                            'dg-td',
                                                            CELL_PAD_CLASSES[currentDensity],
                                                            pin === 'left' && 'dg-pinned-left',
                                                            pin === 'right' && 'dg-pinned-right',
                                                            editable && col.editable !== false && 'dg-td-editable',
                                                        )}
                                                        style={width ? { width, minWidth: width } : undefined}
                                                        data-dg-cell
                                                        tabIndex={-1}
                                                        onDoubleClick={() => handleCellDoubleClick(key, col.key, col)}
                                                    >
                                                        {isEditing ? (
                                                            <EditableCell
                                                                value={getRawValue(col, row)}
                                                                onSave={(v) => handleCellSave(key, col.key, v)}
                                                                onCancel={() => setEditingCell(null)}
                                                                type={col.type}
                                                                options={col.options}
                                                            />
                                                        ) : (
                                                            rendered
                                                        )}
                                                    </td>
                                                );
                                            })}
                                            {hasActions && (
                                                <td className={cn('dg-td dg-td-actions', CELL_PAD_CLASSES[currentDensity])} data-dg-cell tabIndex={-1}>
                                                    <RowActionMenu actions={rowActions!} row={row} />
                                                </td>
                                            )}
                                        </tr>
                                        {/* Expanded detail */}
                                        {expandable && isExpanded && renderRowDetail && (
                                            <tr className="dg-detail-row">
                                                <td colSpan={totalColumns} className="dg-detail-cell">
                                                    {renderRowDetail(row)}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            {(pageSize || statusBar || (selectable && selectedKeys.size > 0)) && (
                <div className="dg-footer">
                    <div className="dg-footer-left">
                        <span className="dg-row-count">
                            {statusBar
                                ? `Showing ${paginatedData.length} of ${sortedData.length} row${sortedData.length !== 1 ? 's' : ''}${filteredData.length !== data.length ? ` (${data.length} total)` : ''}`
                                : `${sortedData.length} total row${sortedData.length !== 1 ? 's' : ''}${filteredData.length !== data.length ? ` (${data.length - filteredData.length} filtered out)` : ''}`
                            }
                        </span>
                        {statusBar && selectable && selectedKeys.size > 0 && (
                            <>
                                <span className="dg-status-separator">·</span>
                                <span className="dg-status-item">{selectedKeys.size} selected</span>
                            </>
                        )}
                        {statusBar && statusAggregates && statusAggregates.map((agg) => (
                            <React.Fragment key={agg.header}>
                                <span className="dg-status-separator">·</span>
                                <span className="dg-status-item">
                                    {agg.header}: Σ {agg.sum.toLocaleString()} · x̄ {Math.round(agg.avg).toLocaleString()}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                    {pageSize && totalPages > 1 && (
                        <div className="dg-pagination">
                            <button type="button" className="dg-page-btn" disabled={page === 0} onClick={() => setPage(0)} aria-label="First page">
                                «
                            </button>
                            <button type="button" className="dg-page-btn" disabled={page === 0} onClick={() => setPage((p) => p - 1)} aria-label="Previous page">
                                ‹
                            </button>
                            <span className="dg-page-info">
                                Page {page + 1} of {totalPages}
                            </span>
                            <button type="button" className="dg-page-btn" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)} aria-label="Next page">
                                ›
                            </button>
                            <button type="button" className="dg-page-btn" disabled={page >= totalPages - 1} onClick={() => setPage(totalPages - 1)} aria-label="Last page">
                                »
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Context Menu Portal */}
            {contextMenu && contextMenuState && (
                <DGContextMenu
                    x={contextMenuState.x}
                    y={contextMenuState.y}
                    items={buildContextItems(contextMenuState.row)}
                    onClose={closeContextMenu}
                />
            )}
        </div>
    );
}

DataGrid.displayName = 'DataGrid';

export { DataGrid };
export type { DataGridColumn, DataGridProps, RowAction as DataGridRowAction, DensityMode as DataGridDensityMode, SortDirection as DataGridSortDirection, PinDirection as DataGridPinDirection };
