# Component Spec: Banner

## 1. Overview

**Name:** Banner
**Category:** Feedback
**Description:** A full-width announcement bar for system-wide messages such as maintenance notices, promotions, or feature announcements.

## 2. Use Cases

### Use When
* Displaying system-wide maintenance notices or outage warnings
* Announcing new features, product updates, or promotions
* Showing cookie consent or legal compliance messages

### Don't Use When
* You need contextual inline feedback → use Alert instead
* You need transient notifications → use Toast instead
* You need a persistent inline message within content → use Notification instead

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `info` | Neutral informational message | Feature announcement |
| `warning` | Caution or upcoming change | Scheduled maintenance |
| `error` | Critical system issue | Service outage |
| `success` | Positive confirmation | Feature launched |
| `promotional` | Marketing or promotional content | Sale announcement |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | py-2 text-xs | Minimal banners, cookie notices |
| `md` | py-3 text-sm | Default, most announcements |
| `lg` | py-4 text-base | High-impact announcements |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Full-width colored bar | Visible on page load |
| Dismissible | Close button visible | User can dismiss |
| Dismissed | Hidden | Removed from DOM or hidden |

## 6. Anatomy

```
┌──────────────────────────────────────────────────┐
│ [Icon?]  Message text  [Action?]  [Close button?] │
└──────────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Message | Yes | Primary announcement text |
| Icon | No | Leading icon for variant |
| Action | No | CTA button or link |
| Close button | No | Dismiss button (when isDismissible) |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'info' \| 'warning' \| 'error' \| 'success' \| 'promotional'` | `'info'` | No | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size of the banner |
| `isDismissible` | `boolean` | `false` | No | Whether the banner can be dismissed |
| `onDismiss` | `() => void` | — | No | Called when dismiss button is clicked |
| `icon` | `ReactNode` | — | No | Leading icon |
| `action` | `ReactNode` | — | No | CTA element (button or link) |
| `children` | `ReactNode` | — | Yes | Message content |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
`role="banner"` or `role="alert"` for critical messages.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Move focus to action or close button |
| `Enter` / `Space` | Activate focused action or close button |
| `Escape` | Dismiss banner (if dismissible) |

### Screen Reader Behavior
* Announces banner content when it appears
* Critical variants (error, warning) use `role="alert"` for immediate announcement

### ARIA Attributes
* `role="banner"` — for informational banners
* `role="alert"` — for error/warning banners requiring immediate attention

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/alert/

## 9. Composition Examples

### Basic Usage
```tsx
<Banner variant="info">We're launching a new feature next week!</Banner>
```

### With Action
```tsx
<Banner variant="promotional" action={<Button size="sm" variant="outline">Learn More</Button>}>
  Spring sale — 20% off all plans
</Banner>
```

### Dismissible
```tsx
<Banner variant="warning" isDismissible onDismiss={() => setVisible(false)}>
  Scheduled maintenance on Sunday, 2:00 AM UTC
</Banner>
```

## 10. Decision Tree

```yaml
- condition: Is the message system-wide and full-width?
  yes: Use Banner
  no:
    - condition: Is the message contextual and inline?
      yes: Use Alert or Notification
      no:
        - condition: Is the message transient?
          yes: Use Toast
          no: Use Alert
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Alert | Use for inline contextual feedback within page content |
| Toast | Use for transient notifications that auto-dismiss |
| Notification | Use for persistent inline messages within content |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.info` | Info variant background |
| `color.warning` | Warning variant background |
| `color.destructive` | Error variant background |
| `color.success` | Success variant background |

## 13. Open Questions

* None
