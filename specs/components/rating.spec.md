# Component Spec: Rating

## 1. Overview

**Name:** Rating
**Category:** Data Input
**Description:** A star-based rating input that allows users to provide feedback by selecting a value on a numeric scale.

## 2. Use Cases

### Use When
* Collecting user feedback on products, services, or content
* Displaying average ratings in a read-only format
* Providing a satisfaction score input in surveys or forms

### Don't Use When
* You need thumbs up/down binary feedback → use FeedbackButtons instead
* You need a numeric scale slider → use Slider instead
* You need multi-criteria evaluation → use a form with multiple rating inputs

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Standard star rating | Product reviews |
| `readonly` | Display-only, non-interactive | Showing average score |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | w-4 h-4 | Compact list views, table cells |
| `md` | w-5 h-5 | Default, card layouts, forms |
| `lg` | w-6 h-6 | Hero sections, featured reviews |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Empty stars | Awaiting input |
| Hover | Stars fill on hover preview | Shows preview of selection |
| Selected | Stars filled up to value | Rating recorded |
| Disabled | Reduced opacity | No interactions |
| Readonly | Stars filled, no hover effects | Display only |

## 6. Anatomy

```
┌─────────────────────────┐
│  ★  ★  ★  ☆  ☆         │
└─────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Star icons | Yes | Visual indicators (filled/empty) |
| Value label | No | Screen-reader accessible current value |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `number` | `0` | No | Current rating value |
| `maxValue` | `number` | `5` | No | Maximum rating value |
| `onChange` | `(value: number) => void` | — | No | Called when rating changes |
| `isDisabled` | `boolean` | `false` | No | Whether the rating is disabled |
| `isReadonly` | `boolean` | `false` | No | Whether the rating is read-only |
| `allowHalf` | `boolean` | `false` | No | Whether half-star values are allowed |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size of the star icons |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
`role="radiogroup"` with individual stars as `role="radio"`.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Focus the rating group |
| `ArrowRight` / `ArrowUp` | Increase rating by 1 (or 0.5 if allowHalf) |
| `ArrowLeft` / `ArrowDown` | Decrease rating by 1 (or 0.5 if allowHalf) |
| `Home` | Set to minimum (1) |
| `End` | Set to maximum |

### Screen Reader Behavior
* Announces "Rating: X out of Y stars" when focused
* Announces new value on change

### ARIA Attributes
* `role="radiogroup"` on container
* `aria-label` — "Rating"
* `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for current state

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/slider/

## 9. Composition Examples

### Basic Usage
```tsx
<Rating value={3} onChange={(v) => setValue(v)} />
```

### Read-only
```tsx
<Rating value={4.5} isReadonly allowHalf />
```

## 10. Decision Tree

```yaml
- condition: Does the user need to provide a numeric score?
  yes:
    - condition: Is the scale 1-5 or 1-10 stars?
      yes: Use Rating
      no: Use Slider
  no:
    - condition: Is it binary feedback?
      yes: Use FeedbackButtons or Toggle
      no: Use a text input
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Slider | Use Slider for continuous numeric ranges |
| Toggle | Use Toggle for binary on/off feedback |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.warning` | Filled star color (amber) |
| `color.muted` | Empty star color |

## 13. Open Questions

* None
