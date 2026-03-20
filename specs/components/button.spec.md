# Component Spec: Button

> This spec follows the DS0 Component Spec Template.
> AI: build this component using the instructions in `specs/phase-2-golden-component.md`.
> This file is the structured reference. Phase 2 spec is the build guide.

---

## 1. Overview

**Name:** Button
**Category:** Actions
**Description:** Triggers an action or event, such as submitting a form, opening a dialog, or performing a destructive operation.

---

## 2. Use Cases

### Use When
* User needs to submit a form
* User needs to trigger an immediate action (save, create, send, delete)
* User needs to confirm or initiate a destructive operation
* User needs to open a dialog, drawer, or popover
* User needs a prominent call-to-action

### Don't Use When
* Navigation is the primary purpose → use **Link** instead
* Toggling between on/off states → use **Toggle** or **Switch** instead
* Selecting from a set of options → use **RadioGroup** or **ToggleGroup** instead
* Action lives inside a dropdown menu → use **MenuItem** instead
* Icon-only action with no visible label → use **IconButton** instead

---

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `primary` | Main call-to-action. One per view ideally. | "Save Changes", "Sign Up", "Submit" |
| `secondary` | Supporting action alongside a primary. | "Cancel", "Back", "Edit" |
| `destructive` | Irreversible or dangerous action. | "Delete Account", "Remove Item" |
| `ghost` | Tertiary, minimal visual weight. | Toolbar buttons, "Learn more", inline |
| `outline` | Visible border, less prominent than primary. | "Export", "Share", filter actions |

---

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | `h-8 px-3 text-xs gap-1.5` | Dense UIs, toolbars, table row actions |
| `md` | `h-10 px-4 text-sm gap-2` | Default, most contexts |
| `lg` | `h-12 px-6 text-base gap-2` | Primary CTAs, hero sections, touch targets |

---

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Variant background + foreground | Interactive, focusable via Tab |
| Hover | Background opacity shift (`/90`, `/80`) | Cursor pointer, visual feedback |
| Focus | `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` | Keyboard only, not on mouse click |
| Active/Pressed | Slightly darker than hover | Immediate visual feedback |
| Disabled | `opacity-50`, `pointer-events-none` | `aria-disabled="true"`, removed from tab order |
| Loading | Spinner visible, content optionally replaced | `aria-busy="true"`, not interactive |

---

## 6. Anatomy

```
┌──────────────────────────────────────────────┐
│  [Spinner?]  [LeftIcon?]  Label  [RightIcon?]│
└──────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Label (children) | Yes | Text content. Required for accessibility. |
| Left icon | No | Before label. Emphasis (✚ Add, ↓ Download). |
| Right icon | No | After label. Direction (Next →, Open ↗). |
| Loading spinner | No | Replaces left icon or appears alone. |

---

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'destructive' \| 'ghost' \| 'outline'` | `'primary'` | No | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Button size |
| `isLoading` | `boolean` | `false` | No | Shows spinner, disables interaction |
| `isDisabled` | `boolean` | `false` | No | Disables the button |
| `loadingText` | `string` | — | No | Replaces children during loading |
| `leftIcon` | `ReactNode` | — | No | Icon before label |
| `rightIcon` | `ReactNode` | — | No | Icon after label |
| `asChild` | `boolean` | `false` | No | Slot pattern — merge onto child |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | No | HTML button type |
| `children` | `ReactNode` | — | Yes | Button label |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Forwarded ref |

---

## 8. Accessibility

### ARIA Role
Uses native `<button>` element — implicit role, no explicit `role` needed.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to/from the button |
| `Enter` | Activates the button (fires on keydown) |
| `Space` | Activates the button (fires on keyup) |

### Screen Reader Behavior
* On focus: announces label + "button" role
* When disabled: announces "dimmed" or "unavailable"
* When loading: announces loading text via `aria-busy` + `aria-live="polite"`

### ARIA Attributes
* `aria-disabled="true"` — when `isDisabled` or `isLoading`
* `aria-busy="true"` — when `isLoading`
* `aria-live="polite"` — on the loading text container

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/button/

---

## 9. Composition Examples

### Basic Usage
```tsx
<Button variant="primary" size="md">
  Save Changes
</Button>
```

### With Icons
```tsx
<Button variant="secondary" leftIcon={<PlusIcon />}>
  Add Item
</Button>
```

### Loading
```tsx
<Button isLoading loadingText="Saving...">
  Save Changes
</Button>
```

### Destructive
```tsx
<Button variant="destructive" leftIcon={<TrashIcon />}>
  Delete Account
</Button>
```

### Button Group
```tsx
<div className="flex gap-2">
  <Button variant="primary">Save</Button>
  <Button variant="outline">Draft</Button>
  <Button variant="ghost">Cancel</Button>
</div>
```

### In a Form
```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" isLoading={isSubmitting}>
    Submit
  </Button>
</form>
```

---

## 10. Decision Tree

```yaml
- condition: Does the user need to trigger an action?
  yes:
    - condition: Is it navigation?
      yes: Use Link
      no:
        - condition: Is this the primary action?
          yes: variant="primary"
          no:
            - condition: Is it destructive?
              yes: variant="destructive"
              no:
                - condition: Is it in a dense/toolbar context?
                  yes: variant="ghost"
                  no:
                    - condition: Needs visual weight but less than primary?
                      yes: variant="outline"
                      no: variant="secondary"
  no: Button is not the right component.
```

---

## 11. Related Components

| Component | Relationship |
|---|---|
| IconButton | Icon-only variant. Use when action is representable by icon alone. |
| Link | Use for navigation instead of Button. |
| Toggle | Use when button represents on/off state. |
| ToggleGroup | Use for selecting between multiple options. |
| MenuItem | Use for actions inside dropdown menus. |
| AlertDialog | Pair with destructive Button for confirmation. |

---

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.primary` / `color.primary-foreground` | Primary variant bg/text |
| `color.secondary` / `color.secondary-foreground` | Secondary variant bg/text |
| `color.destructive` / `color.destructive-foreground` | Destructive variant bg/text |
| `color.accent` / `color.accent-foreground` | Ghost/outline hover states |
| `color.border` | Outline variant border |
| `color.ring` | Focus ring |
| `radius.md` | Border radius |
| `spacing.2` – `spacing.6` | Padding per size |
| `fontSize.xs` – `fontSize.base` | Text size per size |
| `fontWeight.medium` | Button text weight |
| `duration.fast` | Transition duration |
| `easing.ease-in-out` | Transition easing |

---

## 13. Open Questions

None — Button is fully specified. This is the golden reference.
