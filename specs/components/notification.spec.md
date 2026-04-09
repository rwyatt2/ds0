# Component Spec: Notification

## 1. Overview

**Name:** Notification
**Category:** Feedback
**Description:** An inline notification component for persistent, contextual messages within page content, distinct from transient Toasts and full-width Banners.

## 2. Use Cases

### Use When
* Displaying form validation summaries at the top of a form
* Showing success confirmations after completing an action
* Warning about data inconsistencies within a section

### Don't Use When
* You need a full-width system announcement → use Banner instead
* You need a transient auto-dismissing message → use Toast instead
* You need an inline field-level error → use form validation messages

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `info` | Informational context | Tips or helpful information |
| `success` | Action completed | Form submitted successfully |
| `warning` | Potential issue | Data may be outdated |
| `error` | Something failed | Could not save changes |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | p-3 text-sm | Compact inline messages |
| `md` | p-4 text-sm | Default |
| `lg` | p-5 text-base | Prominent notices |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Rendered with variant styling | Static |
| Dismissible | Close button visible | Can be dismissed |
| With actions | Action buttons visible | Interactive |

## 6. Anatomy

```
┌──────────────────────────────────────────┐
│ [Icon] Title                     [Close] │
│        Description text                  │
│        [Action buttons]                  │
└──────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Icon | No | Leading icon matching variant |
| Title | No | Bold heading text |
| Description | Yes | Main message |
| Actions | No | CTA buttons |
| Close button | No | Dismiss (when isDismissible) |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | No | Variant |
| `title` | `string` | — | No | Optional title |
| `isDismissible` | `boolean` | `false` | No | Whether dismissible |
| `onDismiss` | `() => void` | — | No | Dismiss callback |
| `icon` | `ReactNode` | — | No | Leading icon |
| `actions` | `ReactNode` | — | No | Action buttons |
| `children` | `ReactNode` | — | Yes | Description content |
| `className` | `string` | — | No | Additional CSS classes |

## 8. Accessibility

### ARIA Role
`role="status"` for info/success, `role="alert"` for warning/error.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Move focus to actions or close button |
| `Escape` | Dismiss (if dismissible) |

### Screen Reader Behavior
* Announces message and variant when encountered
* Error/warning variants announce immediately via role="alert"

### ARIA Attributes
* `role="status"` or `role="alert"`
* Dismiss button has `aria-label="Dismiss notification"`

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/alert/

## 9. Composition Examples

### Basic
```tsx
<Notification variant="success">Your changes have been saved.</Notification>
```

### With Title and Actions
```tsx
<Notification variant="error" title="Could not save changes" isDismissible actions={<Button size="sm">Retry</Button>}>
  There was a network error. Please try again.
</Notification>
```

## 10. Decision Tree

```yaml
- condition: Is the message persistent and inline within content?
  yes: Use Notification
  no:
    - condition: Is it full-width and system-wide?
      yes: Use Banner
      no:
        - condition: Should it auto-dismiss?
          yes: Use Toast
          no: Use Alert
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Alert | Similar inline feedback — Alert is simpler without title/actions |
| Banner | Use for full-width system messages |
| Toast | Use for transient notifications |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.info` | Info variant border/icon |
| `color.success` | Success variant border/icon |
| `color.warning` | Warning variant border/icon |
| `color.destructive` | Error variant border/icon |

## 13. Open Questions

* None
