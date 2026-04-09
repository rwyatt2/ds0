# Component Spec: Breadcrumb

## 1. Overview

**Name:** Breadcrumb
**Category:** Navigation
**Description:** Shows the user's current location within a navigational hierarchy with links back to parent pages.

## 2. Use Cases

### Use When
* Multi-level page hierarchies (e-commerce categories, nested settings)
* Showing path from home to current page
* Enabling quick navigation to ancestor pages
* Deep content structures with 3+ levels

### Don't Use When
* Flat navigation structure (no hierarchy) → use Tabs or NavBar
* Primary navigation → use NavigationMenu
* Step-by-step process → use Stepper
* Single-level navigation → unnecessary

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Standard breadcrumb with chevron separators | Most page hierarchies |

> Breadcrumb uses `separator` prop for customization rather than named variants.

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | text-xs gap-1 | Dense admin interfaces, toolbars |
| `md` | text-sm gap-1.5 | Default, most contexts |
| `lg` | text-base gap-2 | Prominent page headers |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Links in muted color, separators between | All ancestor links clickable |
| Hover | Link underline or color change | Pointer cursor on interactive items |
| Focus | Focus ring on focused link | `focus-visible:ring-2` |
| Current | Bold or non-linked text | Last item represents current page |
| Truncated | Ellipsis item with expand action | For deep hierarchies (5+ levels) |

## 6. Anatomy

```
┌─ Breadcrumb (nav) ─────────────────────────────────┐
│                                                      │
│  ┌─ BreadcrumbList (ol) ─────────────────────────┐  │
│  │                                                │  │
│  │  ┌─ BreadcrumbItem (li) ──┐  Separator  ...   │  │
│  │  │  ┌─ BreadcrumbLink ──┐ │     /             │  │
│  │  │  │  Home              │ │                   │  │
│  │  │  └────────────────────┘ │                   │  │
│  │  └─────────────────────────┘                   │  │
│  │                                                │  │
│  │  ...  ┌─ BreadcrumbItem ──────────────────┐    │  │
│  │       │  ┌─ BreadcrumbPage ─────────────┐ │    │  │
│  │       │  │  Current Page (aria-current)  │ │    │  │
│  │       │  └──────────────────────────────┘ │    │  │
│  │       └───────────────────────────────────┘    │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Breadcrumb (root) | Yes | `<nav>` with `aria-label` |
| BreadcrumbList | Yes | `<ol>` for ordered hierarchy |
| BreadcrumbItem | Yes | `<li>` element for each level |
| BreadcrumbLink | Yes (ancestors) | `<a>` for clickable ancestor pages |
| BreadcrumbSeparator | Yes | Visual separator, `aria-hidden` |
| BreadcrumbPage | Yes (current) | Current page, `aria-current="page"` |
| BreadcrumbEllipsis | No | Truncation indicator for deep trees |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `separator` | `ReactNode` | `<ChevronRight />` | No | Custom separator between items |
| `maxItems` | `number` | `undefined` | No | Max items before truncation |
| `itemsBeforeCollapse` | `number` | `1` | No | Items to show before ellipsis |
| `itemsAfterCollapse` | `number` | `1` | No | Items to show after ellipsis |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size of breadcrumb text |
| `children` | `ReactNode` | — | Yes | BreadcrumbItem children |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses semantic `<nav>` element with `aria-label="Breadcrumb"`.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to next breadcrumb link |
| `Shift+Tab` | Moves focus to previous breadcrumb link |
| `Enter` | Activates the focused breadcrumb link |

### Screen Reader Behavior
* Navigation landmark announced as "Breadcrumb"
* Each link announces its text content
* Current page announces "current page" via `aria-current`
* Separators are hidden from screen readers

### ARIA Attributes
* `aria-label="Breadcrumb"` — on `<nav>` element
* `aria-current="page"` — on current/last breadcrumb item
* `aria-hidden="true"` — on separator elements

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/

## 9. Composition Examples

### Basic Usage
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Widget Pro</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### With Custom Separator
```tsx
<Breadcrumb separator="/">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Settings</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### With Truncation
```tsx
<Breadcrumb maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
  {/* Automatically shows: Home / ... / Category / Product */}
</Breadcrumb>
```

## 10. Decision Tree

```yaml
- condition: Does the user need to understand their location in a hierarchy?
  yes:
    - condition: Is it a sequential process with steps?
      yes: Use Stepper
      no:
        - condition: More than 2 levels deep?
          yes: Use Breadcrumb
          no: Consider a simple back link
  no:
    - condition: Is it top-level navigation?
      yes: Use NavigationMenu or Tabs
      no: No breadcrumb needed
```

## 11. Related Components

| Component | Relationship |
|---|---|
| NavigationMenu | For primary site navigation |
| Tabs | Horizontal navigation within a page |
| Link | Individual navigation link |
| Stepper | For step-by-step processes (not hierarchies) |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.muted-foreground` | Ancestor link text color |
| `color.foreground` | Current page text color |
| `spacing.1.5` | Gap between items and separators |
| `font.size.sm` | Default breadcrumb text size |

## 13. Open Questions

* Should BreadcrumbLink support `asChild` for router link integration?
* Should truncation auto-detect based on container width?
