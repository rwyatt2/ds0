# Component Spec: Pagination

## 1. Overview

**Name:** Pagination
**Category:** Navigation
**Description:** Navigation controls for moving between pages of content with page number display, previous/next buttons, and optional ellipsis truncation.

## 2. Use Cases

### Use When
* Navigating between pages of a data set
* Search results with multiple pages
* Large lists split into discrete pages
* DataTable page navigation

### Don't Use When
* Infinite scroll or load more → use a "Load More" Button
* Fewer than 2 pages → don't show pagination
* Small contained list → show all items
* Continuous content → use ScrollArea

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Standard pagination with page numbers | Most paginated content |
| `simple` | Previous/Next only (no page numbers) | Mobile-first or compact UIs |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | h-8 px-2 text-xs | Dense data tables, admin panels |
| `md` | h-10 px-3 text-sm | Default, most contexts |
| `lg` | h-12 px-4 text-base | Prominent page navigation, touch targets |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Page numbers with current highlighted | All page links clickable |
| Hover | Background highlight on hoverable items | Pointer cursor |
| Focus | Focus ring on focused element | `focus-visible:ring-2` |
| Active | Pressed/selected page number | `aria-current="page"` |
| Disabled | Reduced opacity on prev/next at boundaries | No interaction for disabled buttons |

## 6. Anatomy

```
┌─ Pagination (nav) ─────────────────────────────────────┐
│                                                          │
│  ┌──────┐  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐  ┌──────┐   │
│  │ Prev │  │ 1 │ │...│ │ 4 │ │[5]│ │ 6 │  │ Next │   │
│  └──────┘  └───┘ └───┘ └───┘ └───┘ └───┘  └──────┘   │
│                                                          │
│  PrevBtn   Page  Ellip  Page  Current Page  NextBtn     │
└──────────────────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Pagination (root) | Yes | `<nav>` with `aria-label` |
| PaginationContent | Yes | `<ul>` container for items |
| PaginationItem | Yes | `<li>` wrapper for each element |
| PaginationPrevious | Yes | Previous page button |
| PaginationNext | Yes | Next page button |
| PaginationLink | Yes | Individual page number link |
| PaginationEllipsis | No | Truncation indicator (...) |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `totalPages` | `number` | — | Yes | Total number of pages |
| `currentPage` | `number` | — | Yes | Current active page (1-indexed) |
| `onPageChange` | `(page: number) => void` | — | Yes | Page change handler |
| `siblingCount` | `number` | `1` | No | Pages shown on each side of current |
| `showEdges` | `boolean` | `true` | No | Always show first and last page |
| `variant` | `'default' \| 'simple'` | `'default'` | No | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size of pagination controls |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses semantic `<nav>` element with `aria-label="Pagination"`.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus between pagination controls |
| `Enter` | Activates the focused page link |
| `Space` | Activates the focused page link |

### Screen Reader Behavior
* Navigation landmark announced as "Pagination"
* Current page announces "Page X, current page"
* Page links announce "Go to page X"
* Previous/Next buttons announce "Go to previous/next page"
* Disabled buttons announce "disabled"

### ARIA Attributes
* `aria-label="Pagination"` — on `<nav>` element
* `aria-current="page"` — on current page link
* `aria-label="Go to page X"` — on each page link
* `aria-disabled="true"` — on prev/next when at boundaries

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/navigation/

## 9. Composition Examples

### Basic Usage
```tsx
<Pagination
  totalPages={10}
  currentPage={5}
  onPageChange={setPage}
/>
```

### With DataTable
```tsx
<DataTable data={users} columns={columns}>
  <Pagination
    totalPages={Math.ceil(total / pageSize)}
    currentPage={page}
    onPageChange={setPage}
    size="sm"
  />
</DataTable>
```

### Simple Variant
```tsx
<Pagination
  variant="simple"
  totalPages={20}
  currentPage={3}
  onPageChange={setPage}
/>
```

## 10. Decision Tree

```yaml
- condition: Is the content split into discrete pages?
  yes:
    - condition: More than 2 pages?
      yes: Use Pagination
      no: Use simple Prev/Next buttons
  no:
    - condition: Is it a continuous scrollable list?
      yes: Use ScrollArea with "Load More" Button
      no: Show all content directly
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Button | Used for Previous/Next buttons |
| Link | For URL-based pagination |
| DataTable | Often paired with Pagination |
| ScrollArea | Alternative for continuous scrolling |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.primary` | Current page background |
| `color.primary-foreground` | Current page text |
| `color.muted` | Page link hover background |
| `color.muted-foreground` | Ellipsis text |
| `radius.md` | Page link border radius |
| `spacing.1` | Gap between pagination items |

## 13. Open Questions

* Should Pagination support URL-based navigation (href) in addition to onClick?
* Should there be a `totalRecords` + `pageSize` convenience API alongside `totalPages`?
