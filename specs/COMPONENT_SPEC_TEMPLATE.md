# Component Spec: [Component Name]

> Fill out this spec. AI will build the component from this document.
> Delete any sections that don't apply, but think twice before deleting — most apply.

## 1. Overview

**Name:** [PascalCase, e.g., RadioGroup]
**Category:** [Actions | Data Input | Data Display | Feedback | Layout | Navigation | Overlay | Typography]
**Description:** [One clear sentence: what this component does and the problem it solves]

## 2. Use Cases

### Use When
* [Specific scenario 1]
* [Specific scenario 2]
* [Specific scenario 3]

### Don't Use When
* [Anti-pattern 1] → use [Alternative] instead
* [Anti-pattern 2] → use [Alternative] instead

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| [name] | [What it communicates] | [Real-world context] |
| [name] | [What it communicates] | [Real-world context] |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | h-8 px-3 text-xs | Dense UIs, toolbars, inline actions |
| `md` | h-10 px-4 text-sm | Default, most contexts |
| `lg` | h-12 px-6 text-base | Primary CTAs, hero sections, touch targets |

> Adjust the specific tokens above per component. Delete this section if the component doesn't have size variants.

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | [describe] | [describe] |
| Hover | [describe] | [describe] |
| Focus | [describe] | Focus ring via `focus-visible:ring-2` |
| Active/Pressed | [describe] | [describe] |
| Disabled | [describe] | `aria-disabled="true"`, not focusable, no interactions |
| Loading | [describe] | [describe, or delete if N/A] |
| Error | [describe] | [describe, or delete if N/A] |

## 6. Anatomy

Describe the visual parts of this component:

```
┌─────────────────────────────────────┐
│ [Icon?]  [Label/Content]  [Icon?]   │
└─────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| [part name] | Yes/No | [notes] |
| [part name] | Yes/No | [notes] |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| [prop] | [type] | [default] | Yes/No | [description] |
| [prop] | [type] | [default] | Yes/No | [description] |
| `className` | `string` | — | No | Additional CSS classes |
| `children` | `ReactNode` | — | Yes/No | [description] |
| `ref` | `Ref<HTML[Element]Element>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
`role="[role]"` — or uses semantic HTML element `<[element]>`

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | [What happens] |
| `Enter` | [What happens] |
| `Space` | [What happens] |
| `Escape` | [What happens, or N/A] |
| `Arrow keys` | [What happens, or N/A] |

### Screen Reader Behavior
* [What is announced when focused]
* [What is announced on state change]
* [Any live region announcements]

### ARIA Attributes
* `aria-disabled` — when disabled
* [Other ARIA attributes specific to this component]

### WAI-ARIA Pattern
[Link to the specific WAI-ARIA Authoring Practice, e.g., https://www.w3.org/WAI/ARIA/apg/patterns/button/]

## 9. Composition Examples

### Basic Usage
```tsx
<[Name] variant="primary" size="md">
  Content
</[Name]>
```

### With Other Components
```tsx
// Show this component used in a realistic context
// with other DS0 components
```

### In a Form (if applicable)
```tsx
// Show form integration
```

## 10. Decision Tree

```yaml
- condition: [Question to determine if this component is right]
  yes: Use [Name]
  no:
    - condition: [Follow-up question]
      yes: Use [Alternative]
      no: Use [Other Alternative]
```

## 11. Related Components

| Component | Relationship |
|---|---|
| [Name] | [When to use this instead of the current component] |
| [Name] | [When to use alongside the current component] |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.primary` | [Where in this component] |
| `spacing.4` | [Where in this component] |
| `radius.md` | [Where in this component] |

## 13. Figma Notes

* Figma component name: `[Category]/[Name]`
* Figma properties to map:
  * Variant → `variant` prop
  * Size → `size` prop
  * State → component states
  * [Any other Figma-specific properties]

## 14. Open Questions

* [Any unresolved design decisions — AI will flag these instead of guessing]
