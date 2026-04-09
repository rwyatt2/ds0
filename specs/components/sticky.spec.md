# Component Spec: Sticky

> This spec follows the DS0 Component Spec Template.
> AI: build this component from this document using the create-component workflow.

---

## 1. Overview

**Name:** Sticky
**Category:** Layout
**Description:** A wrapper component that uses CSS `position: sticky` with an IntersectionObserver to detect and expose the "stuck" state, enabling visual changes (e.g., shadow, backdrop blur) when the element pins to the viewport edge.

---

## 2. Use Cases

### Use When
* Table headers that pin while scrolling through rows
* Section headers in long lists (sticky alphabet headers)
* Toolbars or action bars that pin to the top of a scrollable area
* Filter bars that remain accessible while browsing results

### Don't Use When
* You need a fixed-position overlay → use `position: fixed` or **Dock** instead
* The element should always be at the top → use **AppShell** header instead
* You need scroll-to-top functionality → use **BackToTop** instead

---

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `top` | Sticks to the top edge | Headers, toolbars, filter bars |
| `bottom` | Sticks to the bottom edge | Footer action bars, chat input |

---

## 4. Sizes

Not applicable — Sticky adapts to its children's dimensions.

---

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Unstuck | Normal flow | No special styling |
| Stuck | Optional shadow, backdrop blur, border | `data-stuck="true"` attribute set |

---

## 6. Anatomy

```
┌──────────────────────────────────────┐
│  [Sticky Sentinel (hidden)]         │
│  ┌──────────────────────────────┐    │
│  │       Children Content       │    │
│  └──────────────────────────────┘    │
└──────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Root wrapper | Yes | `position: sticky` container |
| Sentinel element | Yes (internal) | Zero-height div for IntersectionObserver |
| Children | Yes | Content to make sticky |

---

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'top' \| 'bottom'` | `'top'` | No | Which edge to stick to |
| `offset` | `number` | `0` | No | Offset from the edge in pixels |
| `as` | `ElementType` | `'div'` | No | HTML element to render as |
| `isStuck` | `boolean` | — | No | Controlled stuck state |
| `onStuckChange` | `(stuck: boolean) => void` | — | No | Callback when stuck state changes |
| `shadow` | `boolean` | `true` | No | Show shadow when stuck |
| `className` | `string` | — | No | Additional CSS classes |
| `children` | `ReactNode` | — | Yes | Content to make sticky |
| `ref` | `Ref<HTMLElement>` | — | No | Forwarded ref |

---

## 8. Accessibility

### ARIA Role
No explicit role — renders as semantic `<div>` or specified `as` element.

### Keyboard Interactions

| Key | Action |
|---|---|
| N/A | Sticky is a layout utility, not interactive |

### Screen Reader Behavior
* Transparent to screen readers — no announcements
* Children remain accessible in their normal order

### ARIA Attributes
* `data-stuck="true"` — CSS hook for styling, not ARIA

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/ (no specific pattern — layout utility)

---

## 9. Composition Examples

### Basic Usage
```tsx
<Sticky>
  <Toolbar>...</Toolbar>
</Sticky>
```

### With Shadow on Stuck
```tsx
<Sticky shadow onStuckChange={(stuck) => console.log(stuck)}>
  <TableHeader>...</TableHeader>
</Sticky>
```

### Bottom Sticky
```tsx
<Sticky variant="bottom" offset={16}>
  <ActionBar>
    <Button>Save</Button>
    <Button variant="ghost">Cancel</Button>
  </ActionBar>
</Sticky>
```

---

## 10. Decision Tree

```yaml
- condition: Does the element need to stay visible while scrolling?
  yes:
    - condition: Should it pin to a scroll boundary (top/bottom)?
      yes:
        - condition: Is it inside a scrollable container?
          yes: Use Sticky
          no:
            - condition: Should it always be fixed to the viewport?
              yes: Use position fixed / Dock
              no: Use Sticky
      no: Sticky is not the right component
  no: Sticky is not needed
```

---

## 11. Related Components

| Component | Relationship |
|---|---|
| AppShell | AppShell header is inherently sticky; Sticky is for ad-hoc elements |
| BackToTop | BackToTop is fixed-position; Sticky is position:sticky |
| Dock | Dock is a floating draggable panel; Sticky pins to edges |

---

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `shadow.sm` | Shadow when stuck |
| `color.background` | Backdrop when stuck (optional) |
| `zIndex.40` | Sticky z-index |
| `transition.shadow` | Shadow transition |

---

## 13. Open Questions

None — position:sticky with stuck detection is a well-understood pattern.
