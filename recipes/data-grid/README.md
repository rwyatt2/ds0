# DataGrid

A full-featured data grid recipe built with DS0 components. Provides sorting, filtering, pagination, row selection, column resizing, and virtualized scrolling.

## Features

- **Sortable columns** — Click column headers to sort ascending/descending
- **Filtering** — Built-in text and faceted filters per column
- **Pagination** — Configurable rows-per-page with page navigation
- **Row selection** — Single and multi-select with checkbox support
- **Column resizing** — Drag column dividers to resize
- **Row actions** — Context menus with configurable actions
- **Virtualized rendering** — Handles large datasets efficiently
- **Responsive** — Horizontal scrolling with sticky columns

## Usage

```tsx
import { DataGrid } from '@/recipes/data-grid';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', filterable: true },
];

const data = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'User' },
];

<DataGrid columns={columns} data={data} pageSize={20} />
```

## Dependencies

- `@ds0/primitives` — Table, Checkbox, Button, IconButton, Select, TextField

## Notes

This recipe is a monolithic component. A future refactor should decompose it into smaller sub-components (DataGridHeader, DataGridBody, DataGridPagination, etc.).
