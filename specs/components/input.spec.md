# Component Spec: Input

> This spec follows the DS0 Component Spec Template.
> AI: build this component from this document using the create-component workflow.

---

## 1. Overview

**Name:** Input
**Category:** Data Input
**Description:** A bare, unstyled input wrapper that provides consistent behavior, ARIA attributes, and keyboard interactions for text-based form inputs without the label/description chrome of TextField.

---

## 2. Use Cases

### Use When
* Building custom composite inputs (SearchField, PasswordInput, OTP)
* Need a standalone `<input>` without TextField's label/description wrapper
* Creating inline editable text fields
* Composing with other components (Combobox trigger, DatePicker input)

### Don't Use When
* Need a labeled form input with validation → use **TextField** instead
* Need multi-line text input → use **TextArea** instead
* Need a search-specific input with clear button → use **SearchField** instead (once built)
* Need a numeric stepper → use **NumberInput** instead (once built)

---

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Standard text input | Search bars, inline editing |
| `ghost` | Minimal border, blends into background | Inline editing, table cells |

---

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | `h-8 px-3 text-xs` | Dense UIs, toolbars, compact forms |
| `md` | `h-10 px-4 text-sm` | Default, most form contexts |
| `lg` | `h-12 px-6 text-base` | Hero inputs, prominent search bars |

---

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Border `border-input`, bg `bg-background` | Interactive, focusable via Tab |
| Hover | Border darkens slightly | Cursor text |
| Focus | `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` | Keyboard focus ring |
| Disabled | `opacity-50`, `pointer-events-none` | `aria-disabled="true"`, removed from tab order |
| Error | Border `border-destructive`, ring `ring-destructive` | `aria-invalid="true"` |
| ReadOnly | Same as default, no hover effect | `aria-readonly="true"`, focusable but not editable |

---

## 6. Anatomy

```
┌─────────────────────────────────────┐
│  [StartAdornment?]  input  [EndAdornment?]  │
└─────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| `<input>` element | Yes | The core native input |
| Start adornment | No | Icon or text before the input value |
| End adornment | No | Icon, button, or text after the input value |

---

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'default' \| 'ghost'` | `'default'` | No | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Input size |
| `isDisabled` | `boolean` | `false` | No | Disables the input |
| `isReadOnly` | `boolean` | `false` | No | Makes the input read-only |
| `isInvalid` | `boolean` | `false` | No | Shows error state |
| `type` | `string` | `'text'` | No | HTML input type |
| `placeholder` | `string` | — | No | Placeholder text |
| `value` | `string` | — | No | Controlled value |
| `defaultValue` | `string` | — | No | Uncontrolled default |
| `onChange` | `(e: ChangeEvent) => void` | — | No | Change handler |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLInputElement>` | — | No | Forwarded ref |

---

## 8. Accessibility

### ARIA Role
Uses native `<input>` element — implicit role, no explicit `role` needed.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to/from the input |
| Standard text input keys | Type, select, delete text |

### Screen Reader Behavior
* On focus: announces placeholder or associated label
* When disabled: announces "dimmed" or "unavailable"
* When invalid: announces error via `aria-invalid`

### ARIA Attributes
* `aria-disabled="true"` — when `isDisabled`
* `aria-readonly="true"` — when `isReadOnly`
* `aria-invalid="true"` — when `isInvalid`

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/

---

## 9. Composition Examples

### Basic Usage
```tsx
<Input placeholder="Search..." />
```

### With SearchField Pattern
```tsx
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2" />
  <Input className="pl-10" placeholder="Search..." />
</div>
```

### In a Form with Label
```tsx
<label htmlFor="email">Email</label>
<Input id="email" type="email" placeholder="you@example.com" />
```

### Controlled
```tsx
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />
```

---

## 10. Decision Tree

```yaml
- condition: Does the user need a text-based form input?
  yes:
    - condition: Does it need a label, description, and validation display?
      yes: Use TextField
      no:
        - condition: Is it multi-line?
          yes: Use TextArea
          no:
            - condition: Is it used as part of a composite component?
              yes: Use Input (this component)
              no:
                - condition: Does it need standalone form behavior?
                  yes: Use TextField
                  no: Use Input
  no: Input is not the right component.
```

---

## 11. Related Components

| Component | Relationship |
|---|---|
| TextField | Wraps Input with label, description, and validation. Use TextField for standard forms. |
| TextArea | Multi-line text input. Use instead of Input when multiline is needed. |
| SearchField | Specialized Input with search icon and clear button. |
| Combobox | Uses Input as its trigger input. |

---

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.background` | Input background |
| `color.foreground` | Input text color |
| `color.border` / `color.input` | Border color |
| `color.ring` | Focus ring |
| `color.destructive` | Error state border |
| `color.muted-foreground` | Placeholder text |
| `radius.md` | Border radius |
| `spacing.3` – `spacing.6` | Horizontal padding per size |
| `fontSize.xs` – `fontSize.base` | Text size per size |

---

## 13. Open Questions

None — Input is a foundational primitive with a well-established pattern across all major systems.
