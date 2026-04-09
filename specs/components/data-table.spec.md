# Component Spec: DataTable

## 1. Overview

**Name:** DataTable
**Category:** Data Display
**Description:** Feature-rich table component with built-in sorting, filtering, row selection, and pagination for displaying structured datasets.

## 2. Use Cases

### Use When
* Displaying large datasets with sorting and filtering
* Admin dashboards with selectable/actionable rows
* Data management interfaces (CRUD operations)
* Report tables with column configuration

### Don't Use When
* Simple static tabular data → use Table
* Card-based data layouts → use Card in Grid
* Key-value pairs → use DescriptionList
* Tiny datasets (< 5 rows) → use Table

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Standard data table with borders | Most data display scenarios |
| `striped` | Alternating row backgrounds | Large datasets for scanability |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | py-1.5 px-3 text-xs | Dense admin panels, compact data |
| `md` | py-2 px-4 text-sm | Default, most contexts |
| `lg` | py-3 px-4 text-base | Spacious layouts, key data displays |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Normal table rows | All interactions available |
| Hover | Row background highlight | Visual feedback on row |
| Selected | Accent background, checkbox checked | Row included in selection |
| Sorted | Column header shows sort indicator | Data re-ordered |
| Loading | Skeleton rows or spinner overlay | Data fetching in progress |
| Empty | Empty state message | No data to display |
| Error | Error message display | Data fetch failed |

## 6. Anatomy

```
┌─ DataTable ─────────────────────────────────────────────┐
│  ┌─ DataTableToolbar ─────────────────────────────────┐ │
│  │  [Search] [Filters] [Column Toggle] [Bulk Actions] │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌─ Table ────────────────────────────────────────────┐ │
│  │  ┌─ TableHeader ─────────────────────────────────┐ │ │
│  │  │ [☐] Name ▲    Email        Role    Actions    │ │ │
│  │  └───────────────────────────────────────────────┘ │ │
│  │  ┌─ TableBody ───────────────────────────────────┐ │ │
│  │  │ [☐] John Doe  john@...    Admin    [⋮]       │ │ │
│  │  │ [☐] Jane Doe  jane@...    User     [⋮]       │ │ │
│  │  └───────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌─ DataTableFooter ─────────────────────────────────┐ │
│  │  Showing 1-10 of 100    [< Prev] 1 2 3 [Next >]  │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| DataTable (root) | Yes | Wrapper with context provider |
| DataTableToolbar | No | Search, filter, column visibility |
| Table | Yes | Core table (reuses existing Table) |
| DataTableHeader | Yes | Sortable column headers |
| DataTableBody | Yes | Data rows |
| DataTableRow | Yes | Individual row with selection |
| DataTableCell | Yes | Individual cell |
| DataTableFooter | No | Pagination + summary |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `data` | `T[]` | — | Yes | Array of data objects |
| `columns` | `ColumnDef<T>[]` | — | Yes | Column definitions |
| `onSortChange` | `(sort: SortState) => void` | — | No | Sort state change handler |
| `onSelectionChange` | `(rows: T[]) => void` | — | No | Selected rows change handler |
| `onFilterChange` | `(filters: FilterState) => void` | — | No | Filter state change handler |
| `isLoading` | `boolean` | `false` | No | Shows loading state |
| `emptyMessage` | `ReactNode` | `'No data'` | No | Empty state content |
| `variant` | `'default' \| 'striped'` | `'default'` | No | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Cell padding size |
| `selectable` | `boolean` | `false` | No | Enable row selection checkboxes |
| `sortable` | `boolean` | `true` | No | Enable column sorting |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses semantic HTML `<table>` with `role="grid"` for interactive tables.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to next interactive element |
| `Arrow Up/Down` | Moves focus between rows |
| `Arrow Left/Right` | Moves focus between cells |
| `Space` | Toggles row selection checkbox |
| `Enter` | Activates sort on focused column header |
| `Home` | Focuses first cell in current row |
| `End` | Focuses last cell in current row |

### Screen Reader Behavior
* Table announces row/column count
* Sort direction announced on column headers
* Selection state announced per row
* Loading state announced via `aria-busy`

### ARIA Attributes
* `aria-sort="ascending|descending|none"` on sortable column headers
* `aria-selected` on selectable rows
* `aria-busy` during loading
* `role="grid"` on the table when interactive
* `aria-rowcount` / `aria-colcount` for virtual tables

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/grid/

## 9. Composition Examples

### Basic Usage
```tsx
<DataTable
  data={users}
  columns={[
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
  ]}
/>
```

### With Selection and Sorting
```tsx
<DataTable
  data={users}
  columns={columns}
  selectable
  sortable
  onSelectionChange={handleSelect}
  onSortChange={handleSort}
/>
```

## 10. Decision Tree

```yaml
- condition: Displaying tabular data?
  yes:
    - condition: Need sorting, filtering, or selection?
      yes: Use DataTable
      no:
        - condition: Simple static data?
          yes: Use Table
          no: Use DataTable for future-proofing
  no:
    - condition: Card-based layout?
      yes: Use Card in Grid
      no: Use appropriate display component
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Table | Simple static table (DataTable builds on it) |
| Pagination | Used within DataTable footer |
| Checkbox | Used for row selection |
| Input | Used for search/filter in toolbar |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.border` | Table border color |
| `color.muted` | Striped row background, hover |
| `color.primary` | Selected row accent |
| `spacing.2` | Small cell padding |
| `spacing.4` | Default cell padding |

## 13. Open Questions

* Should DataTable support virtual scrolling for very large datasets?
* Column resize — drag handles or auto-fit?
