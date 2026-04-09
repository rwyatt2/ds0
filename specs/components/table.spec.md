# Component Spec: Table

## 1. Overview

**Name:** Table
**Category:** Data Display
**Description:** Displays tabular data using native HTML table elements with consistent styling.

## 2. Use Cases

### Use When
* Displaying structured, columnar data
* Data comparison across rows
* Sortable or filterable datasets

### Don't Use When
* Simple key-value pairs → use a description list
* Complex layouts → use a grid or flexbox layout
* Card-based grid → use Card in a Grid

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|

| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** table (native), columnheader, rowheader

### Requirements
* Use caption for table description
* Use th with scope for headers
* Use aria-sort for sortable columns
* Wrap in scrollable div for horizontal overflow

## 6. Related Components

| Component | Relationship |
|---|---|
| Card | For card-based data layouts |
