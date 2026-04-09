# Component Spec: BackToTop

> This spec follows the DS0 Component Spec Template.
> AI: build this component from this document using the create-component workflow.

---

## 1. Overview

**Name:** BackToTop
**Category:** Navigation
**Description:** A floating action button that appears after the user scrolls past a configurable threshold and smoothly scrolls the page back to the top when clicked.

---

## 2. Use Cases

### Use When
* Long-scrolling pages where users frequently need to return to the top
* Documentation or article pages with extensive content
* Dashboards with vertically stacked sections
* Mobile-first layouts where scroll distance is amplified

### Don't Use When
* The page is short enough that scrolling is minimal → unnecessary clutter
* A sticky navigation already provides quick top-of-page access → use **NavigationMenu** instead
* You need scroll-to-section behavior → use **Sidebar** or anchor links instead

---

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Filled button with icon | General-purpose pages |
| `outline` | Bordered, transparent background | Light UIs, minimal visual weight |
| `ghost` | No border or fill, icon only | When overlay density must be low |

---

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | `h-8 w-8` | Dense UIs, toolbars |
| `md` | `h-10 w-10` | Default, most contexts |
| `lg` | `h-12 w-12` | Touch-first / mobile-primary |

---

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Hidden | `opacity-0 pointer-events-none` | Below scroll threshold |
| Visible | `opacity-100` with fade-in transition | Above scroll threshold |
| Hover | Background darkens, slight scale | Pointer cursor |
| Focus | `focus-visible:ring-2 focus-visible:ring-ring` | Keyboard focus ring |
| Active | Scale down slightly | Pressing feedback |
| Disabled | `opacity-50 pointer-events-none` | Non-interactive |

---

## 6. Anatomy

```
┌──────────────┐
│     ↑ Icon   │  ← Fixed position button
└──────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Root button | Yes | Fixed-position container |
| Icon (chevron-up) | Yes | Visual indicator, `aria-hidden` |
| Label (sr-only) | Yes | Screen reader text "Back to top" |

---

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'default'` | No | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Button size |
| `threshold` | `number` | `300` | No | Scroll distance (px) before button appears |
| `smooth` | `boolean` | `true` | No | Whether to use smooth scrolling |
| `isDisabled` | `boolean` | `false` | No | Disables the button |
| `position` | `'bottom-right' \| 'bottom-left' \| 'bottom-center'` | `'bottom-right'` | No | Screen position |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Forwarded ref |

---

## 8. Accessibility

### ARIA Role
Uses native `<button>` element — implicit `button` role.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Focuses the button when visible |
| `Enter` / `Space` | Scrolls to top |

### Screen Reader Behavior
* On focus: announces "Back to top"
* When hidden: `aria-hidden="true"`, removed from tab order

### ARIA Attributes
* `aria-label="Back to top"` — always present
* `aria-hidden="true"` — when below threshold (hidden state)

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/button/

---

## 9. Composition Examples

### Basic Usage
```tsx
<BackToTop />
```

### Custom Threshold
```tsx
<BackToTop threshold={500} position="bottom-left" />
```

### In Page Layout
```tsx
<AppShell>
  <main>{/* long content */}</main>
  <BackToTop variant="outline" />
</AppShell>
```

---

## 10. Decision Tree

```yaml
- condition: Does the user need to quickly return to the top of a long page?
  yes:
    - condition: Is there already a sticky nav providing top-of-page access?
      yes: BackToTop is probably not needed.
      no:
        - condition: Is the page long enough (> 2 viewports)?
          yes: Use BackToTop
          no: BackToTop is unnecessary for short pages
  no: BackToTop is not the right component.
```

---

## 11. Related Components

| Component | Relationship |
|---|---|
| Button | BackToTop is a specialized Button with scroll behavior |
| ScrollArea | Can be used within ScrollArea for custom scroll containers |
| Sticky | Sticky pins elements; BackToTop is a fixed-position overlay |

---

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.primary` | Default variant background |
| `color.primary-foreground` | Default variant icon color |
| `color.border` | Outline variant border |
| `color.ring` | Focus ring |
| `radius.full` | Circular button shape |
| `shadow.lg` | Elevation for floating button |
| `transition.opacity` | Show/hide animation |
| `zIndex.50` | Above page content |

---

## 13. Open Questions

None — BackToTop is a well-established pattern across design systems.
