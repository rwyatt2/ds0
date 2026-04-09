# Component Spec: Form

## 1. Overview

**Name:** Form
**Category:** Data Input
**Description:** Composition component that structures form fields, labels, descriptions, validation errors, and submit actions into an accessible, consistent layout.

## 2. Use Cases

### Use When
* Any data collection scenario (login, registration, settings, checkout)
* Wrapping DS0 input components with labels, descriptions, and validation
* Structuring multi-field forms with consistent spacing and error handling
* Progressive disclosure forms with conditional fields

### Don't Use When
* Simple search input → use Input alone
* Display-only data → use a DescriptionList
* Single inline action → use a Button directly

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Standard vertical stacked form | Registration, settings pages |

> Form uses `layout` prop (`vertical` | `horizontal`) rather than visual variants.

## 4. Sizes

> Form does not have size variants — it inherits sizing from child components.

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Normal spacing, no indicators | All fields interactive |
| Submitting | Opacity reduced, submit button shows loading | All fields disabled during submission |
| Error | Error messages shown below invalid fields | Focus moves to first invalid field |
| Success | Optional success message | Form may reset or redirect |
| Disabled | All fields appear disabled | No interactions, `aria-disabled="true"` on form |

## 6. Anatomy

```
┌─ Form ──────────────────────────────────────┐
│                                              │
│  ┌─ FormField ────────────────────────────┐  │
│  │  ┌─ FormLabel ─────────────────────┐   │  │
│  │  │  Label Text    * (required)      │   │  │
│  │  └─────────────────────────────────┘   │  │
│  │  ┌─ FormDescription ───────────────┐   │  │
│  │  │  Helper text                     │   │  │
│  │  └─────────────────────────────────┘   │  │
│  │  ┌─ FormControl ───────────────────┐   │  │
│  │  │  <Input /> or <Select /> etc.    │   │  │
│  │  └─────────────────────────────────┘   │  │
│  │  ┌─ FormMessage ───────────────────┐   │  │
│  │  │  ⚠ Error or success message      │   │  │
│  │  └─────────────────────────────────┘   │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌─ FormActions ──────────────────────────┐  │
│  │  [Cancel]  [Submit]                     │  │
│  └────────────────────────────────────────┘  │
│                                              │
└──────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Form (root) | Yes | `<form>` element with `noValidate` |
| FormField | Yes | Groups label + control + messages |
| FormLabel | Yes | Connected to control via `htmlFor` |
| FormDescription | No | Helper text via `aria-describedby` |
| FormControl | Yes | Wraps the actual input element |
| FormMessage | No | Validation error or success message |
| FormActions | No | Submit/cancel button group |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | No | Form layout direction |
| `onSubmit` | `(event: FormEvent) => void` | `undefined` | No | Submit handler (preventDefault is automatic) |
| `isDisabled` | `boolean` | `false` | No | Disables all form fields |
| `className` | `string` | — | No | Additional CSS classes |
| `children` | `ReactNode` | — | Yes | Form content |
| `ref` | `Ref<HTMLFormElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses semantic `<form>` element — no explicit `role` needed.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus between form fields |
| `Shift+Tab` | Moves focus to previous field |
| `Enter` | Submits the form (inside text inputs) |
| `Space` | Activates focused button or checkbox |

### Screen Reader Behavior
* Form is announced as "form" landmark
* Labels are announced when fields receive focus
* Required fields announce "required"
* Error messages are announced via `aria-describedby` link
* Submission status changes announced via `aria-live` region

### ARIA Attributes
* `aria-disabled` — when entire form is disabled
* `aria-describedby` — links field to description and error message
* `aria-invalid` — on fields with validation errors
* `aria-required` — on required fields
* `aria-live="polite"` — on dynamic error/success messages

### WAI-ARIA Pattern
https://www.w3.org/WAI/tutorials/forms/

## 9. Composition Examples

### Basic Usage
```tsx
<Form onSubmit={handleSubmit}>
  <FormField>
    <FormLabel htmlFor="email">Email</FormLabel>
    <FormControl>
      <Input id="email" type="email" />
    </FormControl>
  </FormField>
  <Button type="submit">Submit</Button>
</Form>
```

### With Validation
```tsx
<Form onSubmit={handleSubmit}>
  <FormField>
    <FormLabel htmlFor="name">Name</FormLabel>
    <FormDescription>Enter your full legal name</FormDescription>
    <FormControl>
      <Input id="name" aria-invalid={!!errors.name} />
    </FormControl>
    {errors.name && <FormMessage variant="error">{errors.name}</FormMessage>}
  </FormField>
</Form>
```

### Horizontal Layout
```tsx
<Form layout="horizontal" onSubmit={handleSubmit}>
  <FormField>
    <FormLabel htmlFor="username">Username</FormLabel>
    <FormControl>
      <Input id="username" />
    </FormControl>
  </FormField>
</Form>
```

## 10. Decision Tree

```yaml
- condition: Are you collecting user input?
  yes:
    - condition: Multiple related fields?
      yes: Use Form
      no:
        - condition: Single search query?
          yes: Use Input directly
          no: Use Form for proper labelling and validation
  no:
    - condition: Displaying key-value data?
      yes: Use DescriptionList
      no: Use appropriate display component
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Input | Primary text input field for forms |
| Select | Dropdown selection within forms |
| Checkbox | Boolean toggle within forms |
| Switch | On/off toggle within forms |
| RadioGroup | Single selection from multiple options |
| Button | Submit/cancel actions |
| Label | Standalone label (Form uses FormLabel) |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `spacing.4` | Gap between form fields (vertical) |
| `spacing.6` | Gap between form fields (horizontal layout) |
| `color.destructive` | Error message text |
| `color.muted-foreground` | Description/helper text |
| `color.foreground` | Label text |
| `spacing.2` | Gap between label and control |

## 13. Open Questions

* Should Form include built-in integration with popular form libraries (react-hook-form, formik)?
* Should FormField auto-generate `id` and wire `htmlFor`/`aria-describedby` automatically?
