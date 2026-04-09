# Component Spec: AppShell

> This spec follows the DS0 Component Spec Template.

---

## 1. Overview

**Name:** AppShell
**Category:** Layout
**Description:** A full-page layout container with named slots for header, sidebar, content, and footer. Provides CSS Grid-based responsive structure for application shells.

---

## 2. Use Cases

### Use When
* Building full application layouts with header, sidebar, and main content
* Admin dashboards needing consistent page structure
* Any app needing a responsive shell with fixed and scrollable regions

### Don't Use When
* Simple single-column pages → just use `<main>` with basic CSS
* Marketing/landing pages with unique layouts → custom CSS

---

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | All regions flow naturally | Standard apps |
| `fixed-header` | Header is sticky at top | Dashboards |
| `fixed-sidebar` | Sidebar is fixed, content scrolls | Admin panels |

---

## 4. Sizes

Not applicable — AppShell is always full-viewport.

---

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| With sidebar | Grid: sidebar + content | Two-column layout |
| Without sidebar | Grid: content only | Full-width content |
| Sidebar collapsed | Narrow sidebar | Content expands |

---

## 6. Anatomy

```
┌──────────────────────────────────┐
│            Header                │
├──────────┬───────────────────────┤
│          │                       │
│ Sidebar  │      Main Content     │
│          │                       │
├──────────┴───────────────────────┤
│            Footer                │
└──────────────────────────────────┘
```

---

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'default' \| 'fixed-header' \| 'fixed-sidebar'` | `'default'` | No | Layout behavior |
| `header` | `ReactNode` | — | No | Header slot |
| `sidebar` | `ReactNode` | — | No | Sidebar slot |
| `footer` | `ReactNode` | — | No | Footer slot |
| `children` | `ReactNode` | — | Yes | Main content |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | No | Content padding |
| `className` | `string` | — | No | Additional CSS classes |

---

## 8. Accessibility

### ARIA Role
Uses semantic HTML landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.

### Keyboard Interactions
| Key | Action |
|---|---|
| `Tab` | Navigate between landmark regions |

### Screen Reader Behavior
* Landmarks are announced automatically by screen readers

### ARIA Attributes
* Semantic elements provide implicit roles

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/

---

## 9. Composition Examples

### Basic
```tsx
<AppShell
  header={<Header />}
  sidebar={<Sidebar />}
  footer={<Footer />}
>
  <h1>Dashboard</h1>
</AppShell>
```

---

## 10. Decision Tree

```yaml
- condition: Does the app need a consistent page shell?
  yes: Use AppShell
  no: Use custom layout
```

---

## 11. Related Components

| Component | Relationship |
|---|---|
| Sidebar | Renders in AppShell's sidebar slot |
| Sticky | AppShell header can use Sticky for sticky behavior |

---

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.background` | Page background |
| `color.border` | Region borders |
| `spacing.4-8` | Content padding |

---

## 13. Open Questions

None.
