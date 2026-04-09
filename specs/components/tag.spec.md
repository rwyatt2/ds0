# Component Spec: Tag

## 1. Overview
**Name:** Tag  
**Category:** Data Display  
**Description:** A small, labeled element used to categorize, filter, or display metadata. Optionally dismissible.

## 2. Use Cases
### Use When
* Displaying categories, labels, or metadata tags
* Filter chips that users can add and remove
* Showing selected items in a multi-select context
* Status or skill indicators

### Don't Use When
* Need a status indicator with semantic color → use **Badge** instead
* Need a toggle selection → use **ToggleGroup** instead
* Need inline code display → use **Code** instead

## 3. Variants
| Variant | Intent |
|---|---|
| `default` | Standard tag with subtle background |
| `primary` | Emphasized tag using primary color |
| `secondary` | Secondary emphasis |
| `destructive` | Error or warning tag |
| `outline` | Border-only tag |

## 4. Sizes
| Size | Token |
|---|---|
| `sm` | `h-6 px-2 text-xs` |
| `md` | `h-7 px-2.5 text-xs` |
| `lg` | `h-8 px-3 text-sm` |

## 5. States
| State | Visual Treatment |
|---|---|
| Default | Variant background + foreground |
| Hover (if interactive) | Slight opacity or background change |
| Disabled | `opacity-50`, not interactive |

## 6. Anatomy
```
┌──────────────────────────┐
│ [Icon?]  Label  [Close?] │
└──────────────────────────┘
```

## 7. Props API
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'default'\|'primary'\|'secondary'\|'destructive'\|'outline'` | `'default'` | No | Visual style |
| `size` | `'sm'\|'md'\|'lg'` | `'md'` | No | Tag size |
| `isRemovable` | `boolean` | `false` | No | Shows close button |
| `onRemove` | `() => void` | — | No | Remove callback |
| `children` | `ReactNode` | — | Yes | Label content |

## 8. Accessibility
### ARIA Role
Implicit (inline element). Remove button uses `aria-label="Remove [tag text]"`.
### Keyboard Interactions
| Key | Action |
|---|---|
| `Tab` | Focus the remove button (if removable) |
| `Backspace`/`Delete` | Remove the tag (when focused) |
### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/

## 9. Composition Examples
```tsx
<Tag variant="primary">React</Tag>
<Tag isRemovable onRemove={() => handleRemove('ts')}>TypeScript</Tag>
```

## 10. Decision Tree
```yaml
- condition: Need to display a label/category?
  yes:
    - condition: Is it a status indicator?
      yes: Use Badge
      no:
        - condition: Can users remove it?
          yes: Use Tag with isRemovable
          no: Use Tag
  no: Tag is not the right component.
```

## 11. Related Components
| Component | Relationship |
|---|---|
| Badge | Status indicator. Use instead of Tag for semantic status. |
| ToggleGroup | Selection from options. Use instead of Tag for toggling. |

## 12. Design Tokens Used
| Token | Usage |
|---|---|
| `color.primary/secondary/destructive` | Variant backgrounds |
| `radius.md` | Border radius |
| `fontSize.xs/sm` | Text size |

## 13. Open Questions
None.
