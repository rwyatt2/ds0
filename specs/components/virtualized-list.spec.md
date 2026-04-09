# Component Spec: VirtualizedList

## 1. Overview
**Name:** VirtualizedList  
**Category:** Layout  
**Description:** A windowed rendering component that only renders visible items plus a small overscan buffer, enabling smooth scrolling through large datasets.

## 2. Use Cases
### Use When
- Rendering lists with 1000+ items
- Chat message histories
- Large data tables
- File explorers

### Don't Use When
- Lists with < 100 items → use a regular list
- Items that must all be in DOM for SEO → use regular rendering

## 3. Props API
| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `T[]` | — | Data array |
| `itemHeight` | `number \| ((index: number) => number)` | — | Fixed or variable item height |
| `overscan` | `number` | `5` | Items to render outside viewport |
| `renderItem` | `(item, index) => ReactNode` | — | Item renderer |
| `height` | `number` | — | Container height |
| `width` | `number \| string` | `'100%'` | Container width |

## 4. Accessibility
- `role="list"` on container
- `aria-rowcount` for total items
- `aria-rowindex` on each visible item
- Maintains keyboard navigation through virtual items
