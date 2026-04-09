# Component Spec: Timeline

## 1. Overview

**Name:** Timeline
**Category:** Data Display
**Description:** Displays a chronological sequence of events along a vertical or horizontal line, with customizable icons, content, and connector styles.

## 2. Use Cases

### Use When
* Displaying event history (activity log, changelog)
* Order/shipment tracking progress
* Project milestones and deadlines
* User activity feed

### Don't Use When
* Sequential user tasks → use Stepper
* Simple list of items → use a List
* Date-based calendar view → use Calendar/DatePicker
* Real-time feed → use a Chat/MessageBubble

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Left-aligned timeline | Activity logs, changelogs |
| `alternate` | Alternating left/right content | Visual storytelling, milestones |
| `right` | Right-aligned timeline | RTL layouts, compact views |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | Dot h-3 w-3, text-xs | Compact activity logs |
| `md` | Dot h-4 w-4, text-sm | Default, most contexts |
| `lg` | Dot h-5 w-5, text-base | Prominent timeline displays |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Normal dot and content | Static display |
| Active | Primary-colored dot, bold content | Highlighted current event |
| Completed | Checkmark or accent dot | Past event |
| Pending | Muted/dashed connector | Future event |

## 6. Anatomy

```
┌─ Timeline ─────────────────────────────┐
│                                         │
│  ┌─ TimelineItem ─────────────────────┐ │
│  │  ┌─ TimelineDot ┐  ┌─ Content ──┐ │ │
│  │  │      ●        │  │  Title     │ │ │
│  │  └───────────────┘  │  Desc      │ │ │
│  │       │              │  Timestamp │ │ │
│  │  ┌─ Connector ────┐ └───────────┘ │ │
│  │  │       │         │               │ │
│  │  └────────────────┘               │ │
│  └────────────────────────────────────┘ │
│                                         │
│  ┌─ TimelineItem ─────────────────────┐ │
│  │  ...                                │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Timeline (root) | Yes | Container with orientation |
| TimelineItem | Yes | Individual event wrapper |
| TimelineDot | Yes | Visual indicator (dot/icon) |
| TimelineConnector | Yes | Line connecting items |
| TimelineContent | Yes | Event content area |
| TimelineTitle | No | Event title |
| TimelineDescription | No | Event description |
| TimelineTime | No | Timestamp display |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'default' \| 'alternate' \| 'right'` | `'default'` | No | Layout variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Dot and text size |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | No | Timeline direction |
| `children` | `ReactNode` | — | Yes | TimelineItem children |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses semantic `<ol>` list element — no special ARIA role needed.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to interactive elements within timeline items |

### Screen Reader Behavior
* Announced as an ordered list of events
* Each item read in sequence
* Timestamps and labels announced per item

### ARIA Attributes
* `aria-label="Timeline"` on the root `<ol>`
* `aria-current="step"` on the active/current event (if applicable)

### WAI-ARIA Pattern
No specific WAI-ARIA pattern — uses semantic list markup.

## 9. Composition Examples

### Basic Usage
```tsx
<Timeline>
  <TimelineItem>
    <TimelineDot />
    <TimelineConnector />
    <TimelineContent>
      <TimelineTitle>Order Placed</TimelineTitle>
      <TimelineTime>March 20, 2026</TimelineTime>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineDot />
    <TimelineContent>
      <TimelineTitle>Shipped</TimelineTitle>
      <TimelineTime>March 22, 2026</TimelineTime>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```

### With Custom Icons
```tsx
<Timeline>
  <TimelineItem>
    <TimelineDot><CheckIcon /></TimelineDot>
    <TimelineConnector />
    <TimelineContent>
      <TimelineTitle>Task Complete</TimelineTitle>
      <TimelineDescription>Updated the design system</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```

## 10. Decision Tree

```yaml
- condition: Showing ordered events over time?
  yes:
    - condition: Are the events user-completable steps?
      yes: Use Stepper
      no: Use Timeline
  no:
    - condition: Simple list of items?
      yes: Use List
      no: Use appropriate display component
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Stepper | For interactive sequential steps |
| Progress | For simple progress indication |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.primary` | Active dot color |
| `color.muted` | Pending dot and connector |
| `color.border` | Connector line |
| `color.muted-foreground` | Timestamp text |
| `spacing.4` | Gap between items |

## 13. Open Questions

* Should Timeline support collapsible items for long histories?
* Horizontal timeline — snap scroll or continuous?
