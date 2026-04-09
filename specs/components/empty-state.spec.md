# Component Spec: EmptyState

> This spec follows the DS0 Component Spec Template.
> AI: build this component from this document using the create-component workflow.

---

## 1. Overview

**Name:** EmptyState
**Category:** Feedback
**Description:** A placeholder component displayed when a view, list, or container has no content to show. Provides a visual cue (icon/illustration), explanatory text, and an optional call-to-action.

---

## 2. Use Cases

### Use When
* A data table or list has no rows/items
* A search returns zero results
* A user has not yet created any resources
* An empty dashboard section needs a prompt to get started

### Don't Use When
* Data is loading → use **Skeleton** instead
* A critical error occurred → use **Alert** instead
* You need a full error page with recovery → use a dedicated error page

---

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Centered with icon, title, description, action | Tables, lists, dashboards |
| `compact` | Smaller, inline empty state | Cards, sidebar panels |
| `card` | Wrapped in a Card-like bordered container | Standalone empty sections |

---

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | Icon 32px, text-sm | Inline / compact contexts |
| `md` | Icon 48px, text-base | Default — most pages |
| `lg` | Icon 64px, text-lg | Hero / full-page empty states |

---

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Centered content, muted palette | Static display |
| With Action | CTA button visible below description | Button triggers creation/retry |
| Animated | Fade-in on mount | Smooth entrance |

---

## 6. Anatomy

```
┌────────────────────────────────────┐
│          [Icon / Illustration]     │
│                                    │
│            Title Text              │
│       Description / Help Text      │
│                                    │
│         [ Action Button ]          │
└────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Icon / Illustration | No | Visual cue, `aria-hidden` |
| Title | Yes | Short headline |
| Description | No | Explanatory text |
| Action | No | CTA button or link |

---

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'default' \| 'compact' \| 'card'` | `'default'` | No | Visual layout |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Component size |
| `icon` | `ReactNode` | — | No | Icon or illustration element |
| `title` | `string` | — | Yes | Empty state headline |
| `description` | `string` | — | No | Explanatory text |
| `action` | `ReactNode` | — | No | CTA button or link |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

---

## 8. Accessibility

### ARIA Role
`role="status"` — signals that this is a live region conveying current state.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to the action button (if present) |

### Screen Reader Behavior
* On render: announces title + description as status
* Action button is focusable and announced normally

### ARIA Attributes
* `role="status"` on root
* `aria-live="polite"` — announces when content changes dynamically
* `aria-label` derived from title

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/alert/

---

## 9. Composition Examples

### Basic Usage
```tsx
<EmptyState
  icon={<InboxIcon />}
  title="No messages"
  description="You don't have any messages yet."
/>
```

### With Action
```tsx
<EmptyState
  icon={<PlusCircleIcon />}
  title="No projects"
  description="Get started by creating your first project."
  action={<Button>Create Project</Button>}
/>
```

### In a DataTable
```tsx
<DataTable data={items}>
  {items.length === 0 && (
    <EmptyState
      variant="compact"
      title="No results found"
      description="Try adjusting your filters."
    />
  )}
</DataTable>
```

---

## 10. Decision Tree

```yaml
- condition: Is there no data to display in this view?
  yes:
    - condition: Is data still loading?
      yes: Use Skeleton
      no:
        - condition: Did an error occur?
          yes: Use Alert
          no:
            - condition: Is the empty state inline within a larger component?
              yes: Use EmptyState variant="compact"
              no: Use EmptyState (default)
  no: EmptyState is not needed.
```

---

## 11. Related Components

| Component | Relationship |
|---|---|
| Skeleton | Shows loading placeholder; EmptyState is for after loading completes with no data |
| Alert | For error messages; EmptyState is for non-error empty views |
| Card | The `card` variant wraps content in a Card-like container |

---

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.muted-foreground` | Description text color |
| `color.foreground` | Title text color |
| `color.muted` | Icon tint |
| `color.border` | Card variant border |
| `color.card` | Card variant background |
| `spacing.4` – `spacing.8` | Internal padding |
| `radius.lg` | Card variant border radius |

---

## 13. Open Questions

None — EmptyState is a standard pattern across all major design systems.
