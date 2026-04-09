# Component Spec: Collapsible

## 1. Overview

**Name:** Collapsible
**Category:** Layout
**Description:** A show/hide container that allows users to expand and collapse sections of content with an animated transition.

## 2. Use Cases

### Use When
* Showing/hiding supplementary content (FAQs, details, advanced options)
* Reducing visual clutter by hiding secondary information
* Building custom accordion-like UI without the full Accordion pattern
* Creating expandable navigation sections

### Don't Use When
* Multiple mutually exclusive sections → use **Accordion** instead
* Need a full overlay disclosure → use **Dialog** or **Drawer** instead
* Content should always be visible → just render it directly

## 3. Variants

No visual variants — Collapsible is purely behavioral. Styling is applied via className.

## 4. Sizes

No size variants — content determines height.

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Collapsed | Content hidden, `aria-expanded="false"` | Content not rendered or height 0 |
| Expanded | Content visible, `aria-expanded="true"` | Content at full height with animation |

## 6. Anatomy

```
┌─────────────────────────────────────┐
│ Collapsible.Root                     │
│   ┌──────────────────────────────┐  │
│   │ Collapsible.Trigger (button) │  │
│   └──────────────────────────────┘  │
│   ┌──────────────────────────────┐  │
│   │ Collapsible.Content          │  │
│   │   (expandable content area)  │  │
│   └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Root | Yes | Container managing open/close state |
| Trigger | Yes | Button that toggles the content |
| Content | Yes | The collapsible content area |

## 7. Props API

### Root
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `open` | `boolean` | — | No | Controlled open state |
| `defaultOpen` | `boolean` | `false` | No | Uncontrolled initial state |
| `onOpenChange` | `(open: boolean) => void` | — | No | Callback when state changes |
| `children` | `ReactNode` | — | Yes | Trigger + Content |

### Trigger
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `asChild` | `boolean` | `false` | No | Slot pattern |
| `children` | `ReactNode` | — | Yes | Trigger label |

### Content
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `forceMount` | `boolean` | `false` | No | Keep mounted when collapsed |
| `children` | `ReactNode` | — | Yes | Collapsible content |

## 8. Accessibility

### ARIA Role
Trigger uses native `<button>` element.

### Keyboard Interactions
| Key | Action |
|---|---|
| `Enter` | Toggles the collapsible |
| `Space` | Toggles the collapsible |

### Screen Reader Behavior
* Trigger announces "expanded" or "collapsed" state
* Content is hidden from screen readers when collapsed

### ARIA Attributes
* `aria-expanded="true/false"` on Trigger
* `aria-controls="[content-id]"` on Trigger
* `id="[content-id]"` on Content
* `role="region"` on Content (optional)
* `hidden` on Content when collapsed

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/

## 9. Composition Examples

### Basic Usage
```tsx
<Collapsible>
  <Collapsible.Trigger>Toggle Details</Collapsible.Trigger>
  <Collapsible.Content>
    <p>Hidden content revealed on toggle.</p>
  </Collapsible.Content>
</Collapsible>
```

### Controlled
```tsx
const [open, setOpen] = useState(false);
<Collapsible open={open} onOpenChange={setOpen}>
  <Collapsible.Trigger>
    {open ? 'Hide' : 'Show'} Details
  </Collapsible.Trigger>
  <Collapsible.Content>
    <p>Controlled content.</p>
  </Collapsible.Content>
</Collapsible>
```

## 10. Decision Tree
```yaml
- condition: Does the user need to show/hide content?
  yes:
    - condition: Are there multiple sections that should be mutually exclusive?
      yes: Use Accordion
      no:
        - condition: Is it a single expandable section?
          yes: Use Collapsible
          no:
            - condition: Is it full-page overlay content?
              yes: Use Dialog or Drawer
              no: Use Collapsible
  no: Collapsible is not the right component.
```

## 11. Related Components
| Component | Relationship |
|---|---|
| Accordion | Multiple mutually exclusive collapsible sections. |
| Dialog | Full overlay for modal content. Use instead for important decisions. |
| Drawer | Slide-in panel. Use instead for navigation or settings. |

## 12. Design Tokens Used
| Token | Usage |
|---|---|
| `duration.normal` | Expand/collapse animation duration |
| `easing.ease-in-out` | Animation easing |

## 13. Open Questions
None.
