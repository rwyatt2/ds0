# Component Spec: Dock

## 1. Overview
**Name:** Dock  
**Category:** Layout  
**Description:** A floating, draggable panel that can be positioned anywhere on the screen. Useful for tool palettes, debug panels, and floating actions.

## 2. Use Cases
### Use When
- Floating tool palettes (design tools, IDEs)
- Debug/inspector panels
- Persistent floating actions or widgets
- Draggable chat widgets

### Don't Use When
- Fixed position elements → use Sticky instead
- Modal overlays → use Dialog instead

## 3. Props API
| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `{ x: number; y: number }` | `{ x: 20, y: 20 }` | Initial position |
| `isDraggable` | `boolean` | `true` | Whether the panel can be dragged |
| `isResizable` | `boolean` | `false` | Whether the panel can be resized |
| `variant` | `'default' \| 'floating' \| 'glass'` | `'default'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Default dimensions |
| `onPositionChange` | `(position) => void` | — | Position change callback |
| `children` | `ReactNode` | — | Panel content |

## 4. Accessibility
- `role="dialog"` with `aria-label`
- Keyboard: Escape to dismiss, arrow keys to nudge position
- Focus trap optional
