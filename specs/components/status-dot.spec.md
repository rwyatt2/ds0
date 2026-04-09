# Component Spec: StatusDot

## 1. Overview

**Name:** StatusDot
**Category:** Feedback
**Description:** A small circular indicator that communicates the current status of an entity (user, service, device) through color and optional pulse animation.

## 2. Use Cases

### Use When
* Showing online/offline/busy status for users in a contact list or chat
* Indicating service health in a monitoring dashboard (operational, degraded, outage)
* Displaying device connectivity status (connected, disconnected, pairing)

### Don't Use When
* You need to show progress toward a goal → use Progress instead
* You need a text label with semantic color → use Badge instead
* You need to communicate a detailed message → use Alert instead

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `online` | Entity is active and available | User online in chat |
| `offline` | Entity is inactive or unavailable | User signed out |
| `busy` | Entity is active but not available | User in a meeting |
| `away` | Entity is active but idle | User idle for 15min |
| `error` | Something is broken | Service outage |
| `warning` | Attention needed | Service degraded |
| `neutral` | No specific status | Default placeholder |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | w-2 h-2 | Inline text, dense lists, table cells |
| `md` | w-3 h-3 | Default, avatars, card headers |
| `lg` | w-4 h-4 | Dashboard indicators, hero sections |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Solid colored circle | Static display |
| Pulse | Animated ring expanding outward | Draws attention to active/live status |
| Disabled | Reduced opacity | No pulse animation |

## 6. Anatomy

```
┌───┐
│ ● │  ← colored circle with optional pulse ring
└───┘
```

| Part | Required? | Notes |
|---|---|---|
| Dot | Yes | The colored indicator circle |
| Pulse ring | No | Animated ring for attention (online, error) |
| Label | No | Screen-reader-only text via aria-label |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'online' \| 'offline' \| 'busy' \| 'away' \| 'error' \| 'warning' \| 'neutral'` | `'neutral'` | No | Status variant controlling color |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size of the indicator |
| `pulse` | `boolean` | `false` | No | Whether to show pulse animation |
| `label` | `string` | — | No | Accessible label for screen readers |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses semantic `<span>` with `role="status"` and `aria-label`.

### Keyboard Interactions

| Key | Action |
|---|---|
| N/A | This is a display-only component, not interactive |

### Screen Reader Behavior
* Announces the status label when focused or encountered in reading order
* Label should describe both the entity and status (e.g., "Status: Online")

### ARIA Attributes
* `role="status"` — live region for status updates
* `aria-label` — descriptive status text

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/status/

## 9. Composition Examples

### Basic Usage
```tsx
<StatusDot variant="online" label="Online" />
```

### With Avatar
```tsx
<div className="relative inline-block">
  <Avatar src="/user.jpg" alt="Jane Doe" />
  <StatusDot
    variant="online"
    pulse
    size="sm"
    label="Online"
    className="absolute bottom-0 right-0"
  />
</div>
```

### In a Contact List
```tsx
<div className="flex items-center gap-2">
  <StatusDot variant="busy" label="Busy" />
  <span>Jane Doe</span>
</div>
```

## 10. Decision Tree

```yaml
- condition: Do you need to indicate the current state of a person or service?
  yes: Use StatusDot
  no:
    - condition: Do you need to show a count or label?
      yes: Use Badge
      no:
        - condition: Do you need to show progress?
          yes: Use Progress
          no: Use a text label
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Badge | Use Badge when you need text content alongside the indicator |
| Avatar | StatusDot is commonly composed with Avatar to show user presence |
| Spinner | Use Spinner for indeterminate loading, not status |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.success` | Online variant fill color |
| `color.destructive` | Error variant fill color |
| `color.warning` | Warning / away variant fill color |
| `color.muted` | Offline / neutral variant fill color |

## 13. Open Questions

* None — straightforward display component.
