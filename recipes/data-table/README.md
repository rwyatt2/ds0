# DataTable

A full-featured data table with search, sorting, pagination, and row selection.

## Usage

```tsx
import { DataTable } from '@ds0/recipes/data-table';

<DataTable
  columns={[{ key: 'name', header: 'Name', accessor: (r) => r.name, sortable: true }]}
  data={users}
  getRowKey={(r) => r.id}
  searchable
  selectable
  pageSize={10}
/>
```
