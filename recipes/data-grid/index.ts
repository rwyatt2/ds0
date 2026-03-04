// DataGrid — barrel export
// The original DataGrid.tsx is preserved for backward compatibility.
// Sub-modules can be imported individually for tree-shaking.

export { DataGrid } from './DataGrid';

// Types — consumers can import types directly
export type {
    DataGridColumn,
    DataGridProps,
    RowAction as DataGridRowAction,
    DensityMode as DataGridDensityMode,
    SortDirection as DataGridSortDirection,
    PinDirection as DataGridPinDirection,
} from './types';

// Sub-components — available for advanced composition
export { ColumnVisibilityDropdown, EditableCell, ResizeHandle, DGCheckbox, RowActionMenu, DGContextMenu } from './components';

// Icons — can be used standalone
export { SortIcon, ChevronIcon, SearchIcon, DownloadIcon, ColumnsIcon, CheckIcon, XIcon, MoreVerticalIcon, PinIcon, CopyIcon } from './icons';

// Utilities
export { cn, getRawValue } from './utils';
export { DENSITY_CLASSES, CELL_PAD_CLASSES, DENSITY_OPTIONS } from './constants';
