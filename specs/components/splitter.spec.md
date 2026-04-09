# Component Spec: Splitter

> This spec follows the DS0 Component Spec Template.

---

## 1. Overview

**Name:** Splitter
**Category:** Layout
**Description:** A resizable panel divider that allows users to adjust the relative sizes of adjacent panels by dragging a handle or using keyboard controls.

---

## 2. Use Cases

### Use When
* IDE-like layouts with resizable panels (editor + terminal)
* Email clients with list and detail panes
* Dashboards where users want to customize region sizes
* Comparison views (diff viewers, side-by-side)

### Don't Use When
* Fixed-width layouts that don't need resize → use CSS Grid
* Mobile layouts → resizable panels are not practical on touch

---

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `horizontal` | Splits left/right | Side-by-side panels |
| `vertical` | Splits top/bottom | Editor + terminal |

---

## 4. Sizes

Not applicable — Splitter adapts to its container.

---

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Thin divider line | Hoverable |
| Hover | Divider widens, cursor changes | `col-resize` / `row-resize` |
| Dragging | Active color, wider | Panels resize in real-time |
| Focus | Focus ring on handle | Keyboard-accessible |
| Disabled | Muted, no cursor change | Not draggable |

---

## 6. Anatomy

```
┌───────────┬─┬───────────┐
│           │║│           │
│  Panel A  │║│  Panel B  │
│           │║│           │
└───────────┴─┴───────────┘
              ↑ Drag handle
```

| Part | Required? | Notes |
|---|---|---|
| SplitterGroup | Yes | Container for panels + handle |
| SplitterPanel | Yes (×2+) | Resizable panel |
| SplitterHandle | Yes | Drag handle between panels |

---

## 7. Props API

### SplitterGroup
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | No | Split direction |
| `children` | `ReactNode` | — | Yes | Panels and handles |
| `className` | `string` | — | No | Additional CSS classes |

### SplitterPanel
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `defaultSize` | `number` | — | No | Initial size (%) |
| `minSize` | `number` | `10` | No | Minimum size (%) |
| `maxSize` | `number` | `90` | No | Maximum size (%) |
| `children` | `ReactNode` | — | Yes | Panel content |

### SplitterHandle
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `isDisabled` | `boolean` | `false` | No | Disables resizing |

---

## 8. Accessibility

### ARIA Role
`role="separator"` on the handle, with `aria-orientation`.

### Keyboard Interactions
| Key | Action |
|---|---|
| `Arrow Left/Up` | Decrease panel size by step |
| `Arrow Right/Down` | Increase panel size by step |
| `Home` | Set to minimum size |
| `End` | Set to maximum size |
| `Enter` | Toggle between default and minimum |

### Screen Reader Behavior
* Handle announces "Resize handle" with current value
* Announces size changes

### ARIA Attributes
* `role="separator"` on handle
* `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
* `aria-orientation="horizontal" | "vertical"`

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/

---

## 9. Composition Examples

### Horizontal Split
```tsx
<SplitterGroup direction="horizontal">
  <SplitterPanel defaultSize={30}><Nav /></SplitterPanel>
  <SplitterHandle />
  <SplitterPanel defaultSize={70}><Content /></SplitterPanel>
</SplitterGroup>
```

### Three-Panel
```tsx
<SplitterGroup direction="horizontal">
  <SplitterPanel defaultSize={20}><FileTree /></SplitterPanel>
  <SplitterHandle />
  <SplitterPanel defaultSize={50}><Editor /></SplitterPanel>
  <SplitterHandle />
  <SplitterPanel defaultSize={30}><Preview /></SplitterPanel>
</SplitterGroup>
```

---

## 10. Decision Tree

```yaml
- condition: Do users need to resize adjacent panels?
  yes:
    - condition: Are panels side by side?
      yes: Use Splitter direction="horizontal"
      no: Use Splitter direction="vertical"
  no: Use CSS Grid or Flexbox
```

---

## 11. Related Components

| Component | Relationship |
|---|---|
| AppShell | AppShell provides the page structure; Splitter goes inside content |
| Sidebar | Sidebar has built-in collapse; Splitter allows freeform resize |

---

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.border` | Handle default color |
| `color.primary` | Handle active/focus color |
| `color.ring` | Focus ring |
| `radius.sm` | Handle border radius |

---

## 13. Open Questions

None — follows the well-established WAI-ARIA window splitter pattern.
