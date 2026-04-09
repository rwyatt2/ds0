# Component Spec: Sidebar

> This spec follows the DS0 Component Spec Template.
> AI: build this component from this document using the create-component workflow.

---

## 1. Overview

**Name:** Sidebar
**Category:** Navigation
**Description:** A collapsible side navigation panel that provides persistent navigation links and can be expanded or collapsed to save screen space.

---

## 2. Use Cases

### Use When
* Application shells needing persistent navigation
* Admin dashboards with multi-section navigation
* Documentation sites with sidebar table of contents
* Any layout requiring a collapsible side panel

### Don't Use When
* Mobile-only layouts where a drawer is more appropriate → use **Drawer** instead
* Simple top-bar navigation → use **NavigationMenu** instead
* Temporary overlay navigation → use **Drawer** instead

---

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Fixed-width sidebar with full content | Standard dashboards |
| `compact` | Icon-only collapsed state | Dense admin UIs |
| `floating` | Overlays content when expanded | Mobile-responsive layouts |

---

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | `width: 200px`, collapsed: `48px` | Compact layouts |
| `md` | `width: 256px`, collapsed: `64px` | Default |
| `lg` | `width: 320px`, collapsed: `80px` | Content-rich sidebars |

---

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Expanded | Full width, labels visible | Navigation items with text |
| Collapsed | Narrow, icons only | Tooltip on hover for labels |
| Hover (collapsed item) | Tooltip appears | Shows full label |

---

## 6. Anatomy

```
┌──────────────────┐
│  [Header/Logo]   │
│──────────────────│
│  [Nav Item 1]    │
│  [Nav Item 2]    │
│  [Nav Group]     │
│    [Sub Item]    │
│──────────────────│
│  [Footer]        │
│  [Collapse Btn]  │
└──────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Root container | Yes | Side panel wrapper |
| Header slot | No | Logo or branding area |
| Content / nav items | Yes | Navigation links |
| Footer slot | No | User info, settings |
| Collapse trigger | No | Toggle button |

---

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'default' \| 'compact' \| 'floating'` | `'default'` | No | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Width preset |
| `isCollapsed` | `boolean` | `false` | No | Controlled collapsed state |
| `defaultCollapsed` | `boolean` | `false` | No | Uncontrolled default |
| `onCollapsedChange` | `(collapsed: boolean) => void` | — | No | Collapse callback |
| `side` | `'left' \| 'right'` | `'left'` | No | Which side |
| `collapsible` | `boolean` | `true` | No | Whether collapse is enabled |
| `children` | `ReactNode` | — | Yes | Sidebar content |
| `header` | `ReactNode` | — | No | Header slot |
| `footer` | `ReactNode` | — | No | Footer slot |
| `className` | `string` | — | No | Additional CSS classes |

---

## 8. Accessibility

### ARIA Role
`role="navigation"` with `aria-label="Sidebar"`.

### Keyboard Interactions
| Key | Action |
|---|---|
| `Tab` | Navigate between sidebar items |
| `[` or custom | Toggle collapse (configurable) |

### Screen Reader Behavior
* Announces "Sidebar navigation" on focus
* Collapsed state announced via `aria-expanded`

### ARIA Attributes
* `role="navigation"` on root
* `aria-label="Sidebar"` or custom label
* `aria-expanded` on collapse toggle

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/

---

## 9. Composition Examples

### Basic Usage
```tsx
<Sidebar>
  <SidebarItem href="/dashboard">Dashboard</SidebarItem>
  <SidebarItem href="/settings">Settings</SidebarItem>
</Sidebar>
```

### With AppShell
```tsx
<AppShell sidebar={<Sidebar collapsible>{/* items */}</Sidebar>}>
  <main>Content</main>
</AppShell>
```

---

## 10. Decision Tree

```yaml
- condition: Does the app need persistent side navigation?
  yes:
    - condition: Is it a mobile-only layout?
      yes: Use Drawer instead
      no:
        - condition: Does the sidebar need to collapse?
          yes: Use Sidebar with collapsible=true
          no: Use Sidebar with collapsible=false
  no: Sidebar is not needed
```

---

## 11. Related Components

| Component | Relationship |
|---|---|
| Drawer | Temporary overlay navigation; Sidebar is persistent |
| NavigationMenu | Top-bar nav; Sidebar is side-panel nav |
| AppShell | Sidebar renders inside AppShell's sidebar slot |

---

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.background` | Sidebar background |
| `color.border` | Right border |
| `color.foreground` | Text color |
| `color.primary` | Active item highlight |
| `spacing.4` | Item padding |
| `transition.width` | Collapse animation |
| `shadow.sm` | Floating variant shadow |

---

## 13. Open Questions

None.
