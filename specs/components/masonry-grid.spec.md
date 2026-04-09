# Component Spec: MasonryGrid

## 1. Overview
**Name:** MasonryGrid  
**Category:** Layout  
**Description:** A Pinterest-style masonry layout that positions items in columns with varying heights, creating a waterfall effect.

## 2. Use Cases
### Use When
- Photo galleries with varying aspect ratios
- Card-based dashboards with different content heights
- Social media feed layouts
- Portfolio showcases

### Don't Use When
- Uniform grid items → use CSS Grid instead
- Single-column layouts → use a simple list

## 3. Props API
| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `number \| Record<string, number>` | `3` | Column count or responsive breakpoints |
| `gap` | `number` | `16` | Gap between items in px |
| `children` | `ReactNode` | — | Grid items |

## 4. Accessibility
- `role="list"` on container, `role="listitem"` on items
- Maintains DOM order for screen readers
