# Component Spec: Chart

## 1. Overview

**Name:** Chart
**Category:** Data Display
**Description:** A zero-dependency SVG data visualization component supporting line, bar, area, donut, scatter, and sparkline chart types.

## 2. Use Cases

### Use When
* Displaying trends over time (line, area)
* Comparing categorical values (bar)
* Showing part-to-whole relationships (donut)
* Visualizing correlations (scatter)
* Inline micro-trends in tables or cards (sparkline)

### Don't Use When
* You need a data table → use DataGrid recipe
* You need geographic maps → use a dedicated mapping library
* You need real-time streaming charts → use a WebSocket-based library

## 3. Variants

| Variant | Intent | Example |
|---|---|---|
| `line` | Show data trends over ordered categories or time | — |
| `bar` | Compare discrete categories side by side | — |
| `area` | Emphasize volume or magnitude over time | — |
| `donut` | Show proportional composition | — |
| `scatter` | Reveal correlation between two numeric variables | — |
| `sparkline` | Provide at-a-glance trend without axis detail | — |

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|

| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** Semantic HTML



## 6. Related Components

| Component | Relationship |
|---|---|
| undefined | — |
| undefined | — |
