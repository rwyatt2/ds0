# Phase 2: Golden Component — Button

> **Instructions for AI:** Read ALL files in `.ai/` before starting.
> This spec defines the Button component across ALL layers:
> primitive, styled, web component, React Native, tests, stories, manifest, docs, and Figma mapping.
> Build every file listed. Reference `.ai/component-anatomy.md` for the complete file map.
> This component becomes THE template for every future component.

---

## 1. Overview

**Name:** Button
**Category:** Actions
**Description:** A clickable element that triggers an action or event, such as submitting a form, opening a dialog, or performing a destructive operation.

Button is the most fundamental interactive component in any design system. It must be flawless — accessible, performant, and flexible enough to cover every action pattern.

---

## 2. Use Cases

### Use When
* User needs to submit a form
* User needs to trigger an immediate action (save, create, send)
* User needs to confirm a destructive action (delete, remove)
* User needs to open a dialog, popover, or drawer
* User needs a call-to-action (CTA) in a marketing or onboarding context

### Don't Use When
* Navigation is the primary purpose → use **Link** instead
* Toggling between two states → use **Toggle** or **Switch** instead
* Selecting from a set of options → use **RadioGroup** or **ToggleGroup** instead
* The action is within a menu → use **MenuItem** instead
* You need an icon-only action → use **IconButton** instead (built on Button primitive)

---

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `primary` | Main call-to-action. Ideally one per view. | "Save Changes", "Sign Up", "Submit" |
| `secondary` | Supporting action alongside a primary. | "Cancel", "Back", "Edit" |
| `destructive` | Irreversible or dangerous action. | "Delete Account", "Remove", "Discard Changes" |
| `ghost` | Tertiary action, minimal visual weight. | Toolbar buttons, "Learn more", inline actions |
| `outline` | Alternative to secondary with visible border. | "Export", "Share", filter toggles |

---

## 4. Sizes

| Size | Classes | Use When |
|---|---|---|
| `sm` | `h-8 px-3 text-xs gap-1.5` | Dense UIs, toolbars, table actions, inline |
| `md` | `h-10 px-4 text-sm gap-2` | Default. Most contexts. |
| `lg` | `h-12 px-6 text-base gap-2` | Primary CTAs, hero sections, mobile touch targets |

---

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Variant-specific background and text color | Interactive, focusable |
| Hover | Slightly darker/lighter background (`/90` or `/80` opacity) | Cursor pointer |
| Focus | `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` | Keyboard-triggered only, not on click |
| Active/Pressed | Slightly darker than hover, subtle scale or no transform | Visual feedback on press |
| Disabled | Reduced opacity (`opacity-50`), `pointer-events-none` | Not focusable, no interactions, `aria-disabled="true"` |
| Loading | Spinner replaces or sits beside content, button disabled during load | Not interactive, announces "loading" to screen readers |

---

## 6. Anatomy

```
┌──────────────────────────────────────────────┐
│  [LoadingSpinner?]  [Icon?]  Label  [Icon?]  │
└──────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Label (children) | Yes | Text content. Always required for accessibility unless `aria-label` provided. |
| Leading icon | No | Placed before the label. Use for emphasis (e.g., ✚ Add, ↓ Download). |
| Trailing icon | No | Placed after the label. Use for indicating direction (e.g., Next →). |
| Loading spinner | No | Replaces leading icon or appears standalone. Disables interaction. |

---

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'destructive' \| 'ghost' \| 'outline'` | `'primary'` | No | The visual style of the button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | The size of the button |
| `isLoading` | `boolean` | `false` | No | Shows loading spinner and disables interaction |
| `isDisabled` | `boolean` | `false` | No | Disables the button |
| `loadingText` | `string` | — | No | Text to display while loading (replaces children) |
| `leftIcon` | `ReactNode` | — | No | Icon placed before the label |
| `rightIcon` | `ReactNode` | — | No | Icon placed after the label |
| `asChild` | `boolean` | `false` | No | Merges props onto child element (Slot pattern) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | No | HTML button type |
| `children` | `ReactNode` | — | Yes | Button label content |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Forwarded ref |

---

## 8. Accessibility

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/button/

### ARIA Role
Uses native `<button>` element — no explicit `role` needed.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to the button (or away from it) |
| `Enter` | Activates the button |
| `Space` | Activates the button |

### Screen Reader Behavior
* On focus: announces button label and role ("Save Changes, button")
* When disabled: announces "dimmed" or "disabled" state
* When loading: announces loading text or "Loading" via `aria-busy="true"` and live region

### ARIA Attributes
* `aria-disabled="true"` — when disabled (NOT the `disabled` HTML attribute)
* `aria-busy="true"` — when loading
* `aria-live="polite"` — on loading text region so screen readers announce state change

### Important Notes
* Do NOT use `disabled` HTML attribute — it removes the button from tab order. Use `aria-disabled` + prevent click in JS.
* Always use `<button>` element, never `<div>` or `<a>` styled as a button.
* If `asChild` pattern is used with a link, ensure proper role management.

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

<Button variant="ghost" rightIcon={<ArrowRightIcon />}>
  Next Step
</Button>
```

### Loading State
```tsx
<Button variant="primary" isLoading loadingText="Saving...">
  Save Changes
</Button>
```

### Destructive Confirmation
```tsx
<Button variant="destructive" leftIcon={<TrashIcon />}>
  Delete Account
</Button>
```

### Button Group (with other DS0 components)
```tsx
<div className="flex gap-2">
  <Button variant="primary">Save</Button>
  <Button variant="outline">Save as Draft</Button>
  <Button variant="ghost">Cancel</Button>
</div>
```

### As Form Submit
```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" variant="primary" isLoading={isSubmitting}>
    Submit Application
  </Button>
</form>
```

### Full Width
```tsx
<Button variant="primary" className="w-full">
  Continue
</Button>
```

---

## 10. Decision Tree

```yaml
- condition: Does the user need to trigger an action?
  yes:
    - condition: Is the action navigation to another page?
      yes: Use Link, not Button
      no:
        - condition: Is this the primary action on the page?
          yes: variant="primary"
          no:
            - condition: Is this a dangerous or irreversible action?
              yes: variant="destructive"
              no:
                - condition: Is this in a dense UI, toolbar, or inline context?
                  yes: variant="ghost"
                  no:
                    - condition: Does it need visual weight but less than primary?
                      yes: variant="outline"
                      no: variant="secondary"
  no: Button is not the right component. Consider Link, Toggle, or MenuItem.
```

---

## 11. Related Components

| Component | Relationship |
|---|---|
| **IconButton** | Icon-only variant of Button. Use when the action can be represented by an icon alone with `aria-label`. |
| **Link** | Use instead of Button when the primary purpose is navigation. |
| **Toggle** | Use when the button represents an on/off state. |
| **ToggleGroup** | Use when selecting between multiple options with button-like appearance. |
| **MenuItem** | Use for actions inside a dropdown menu. |
| **AlertDialog** | Pair with destructive Button — show confirmation before irreversible actions. |

---

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.primary` / `color.primary-foreground` | Primary variant background and text |
| `color.secondary` / `color.secondary-foreground` | Secondary variant background and text |
| `color.destructive` / `color.destructive-foreground` | Destructive variant background and text |
| `color.accent` / `color.accent-foreground` | Ghost and outline hover states |
| `color.border` | Outline variant border |
| `color.ring` | Focus ring color |
| `radius.md` | Default border radius |
| `spacing.2` through `spacing.6` | Padding (mapped to sizes) |
| `fontSize.xs` through `fontSize.base` | Text size (mapped to sizes) |
| `fontWeight.medium` | Button text weight |
| `duration.fast` | Hover/focus transition |
| `easing.ease-in-out` | Transition easing |

---

## 13. Figma Notes

* Figma component name: `Actions/Button`
* Figma properties to map:
  * Variant → `variant` prop (Primary, Secondary, Destructive, Ghost, Outline)
  * Size → `size` prop (Small, Medium, Large)
  * State → component states (Default, Hover, Focus, Active, Disabled, Loading)
  * Has Left Icon → boolean toggle
  * Has Right Icon → boolean toggle
  * Label → text content → `children` prop
* Use Figma component properties (not layer visibility) for all toggles
* Auto layout with `gap` matching the size's gap token

---

## 14. Implementation Notes

### Primitive (`packages/primitives/src/button/`)

The `useButton` hook should:
* Default `type` to `'button'` (not `'submit'`) to prevent accidental form submission
* Handle `aria-disabled` pattern: when `isDisabled` or `isLoading`, set `aria-disabled="true"` and prevent click via `event.preventDefault()` in the handler — do NOT use HTML `disabled`
* Handle keyboard activation: `Enter` fires immediately, `Space` fires on keyup (matching native `<button>` behavior)
* Set `aria-busy="true"` when `isLoading`
* Return a `ref` callback that composes the forwarded ref

### Styled Component (`components/react/button/`)

The `buttonVariants` cva definition:
```typescript
const buttonVariants = cva(
  // Base
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5',
        md: 'h-10 px-4 text-sm gap-2',
        lg: 'h-12 px-6 text-base gap-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

Add these conditional classes in the component:
```typescript
// Disabled state
isDisabled && 'opacity-50 pointer-events-none'
// Loading state
isLoading && 'opacity-80 pointer-events-none'
// Full width (via className, not a prop)
```

### Loading Spinner

Create a simple `Spinner` component inline or as a shared utility:
```typescript
const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin h-4 w-4', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);
```

### Web Component (`components/web/button/`)

* Custom element name: `ds0-button`
* Observed attributes: `variant`, `size`, `disabled`, `loading`
* Shadow DOM with CSS custom properties from `@ds0/tokens/css`
* Keyboard handling: listen for `keydown` on Enter and `keyup` on Space
* Emit a custom `ds0-click` event (in addition to native `click`)

### React Native (`components/native/button/`)

* Use `Pressable` (NOT `TouchableOpacity`)
* NativeWind classes matching web where possible
* `accessibilityRole="button"`
* `accessibilityState={{ disabled: isDisabled, busy: isLoading }}`
* Haptic feedback on press (optional, via `expo-haptics` if available)

---

## 15. Test Requirements

### Primitive Tests (`packages/primitives/src/button/Button.test.tsx`)

```
describe('ButtonPrimitive')
  rendering
    ✓ renders as a <button> element
    ✓ renders children
    ✓ defaults type to "button"
    ✓ can set type to "submit"
    ✓ forwards ref to the button element
    ✓ spreads additional props onto the button

  interactions
    ✓ calls onClick when clicked
    ✓ does not call onClick when isDisabled is true
    ✓ does not call onClick when isLoading is true
    ✓ calls onClick on Enter key
    ✓ calls onClick on Space key (keyup)
    ✓ does not fire on Space keydown (only keyup)

  accessibility
    ✓ has no axe violations (default)
    ✓ has no axe violations (disabled)
    ✓ sets aria-disabled="true" when isDisabled
    ✓ sets aria-busy="true" when isLoading
    ✓ does NOT use the HTML disabled attribute
    ✓ has tabIndex 0 by default
    ✓ has tabIndex -1 when disabled
    ✓ is focusable when not disabled
    ✓ is not focusable when disabled
```

### Styled Tests (`components/react/button/Button.test.tsx`)

```
describe('Button (Styled)')
  rendering
    ✓ renders with default variant (primary) and size (md)
    ✓ applies correct classes for each variant
    ✓ applies correct classes for each size
    ✓ merges custom className
    ✓ renders leftIcon when provided
    ✓ renders rightIcon when provided
    ✓ renders loading spinner when isLoading
    ✓ renders loadingText when isLoading and loadingText provided

  states
    ✓ applies disabled styles when isDisabled
    ✓ applies loading styles when isLoading

  accessibility
    ✓ has no axe violations for every variant
    ✓ has no axe violations for every size
    ✓ has no axe violations when disabled
    ✓ has no axe violations when loading
```

### React Native Tests (`components/native/button/Button.test.tsx`)

```
describe('Button (Native)')
  ✓ renders with default props
  ✓ renders children text
  ✓ has accessibilityRole="button"
  ✓ has correct accessibilityState when disabled
  ✓ has correct accessibilityState when loading
  ✓ calls onPress when pressed
  ✓ does not call onPress when disabled
```

---

## 16. Stories Required

### `components/react/button/Button.stories.tsx`

```
Meta
  title: 'Components/Actions/Button'
  component: Button
  tags: ['autodocs']
  argTypes for variant, size, isDisabled, isLoading

Stories:
  Default          — { children: 'Button' }
  Primary          — { variant: 'primary', children: 'Primary' }
  Secondary        — { variant: 'secondary', children: 'Secondary' }
  Destructive      — { variant: 'destructive', children: 'Destructive' }
  Ghost            — { variant: 'ghost', children: 'Ghost' }
  Outline          — { variant: 'outline', children: 'Outline' }
  Small            — { size: 'sm', children: 'Small' }
  Medium           — { size: 'md', children: 'Medium' }
  Large            — { size: 'lg', children: 'Large' }
  Disabled         — { isDisabled: true, children: 'Disabled' }
  Loading          — { isLoading: true, children: 'Loading' }
  LoadingWithText  — { isLoading: true, loadingText: 'Saving...', children: 'Save' }
  WithLeftIcon     — { leftIcon: <PlusIcon />, children: 'Add Item' }
  WithRightIcon    — { rightIcon: <ArrowRightIcon />, children: 'Next' }
  FullWidth        — { className: 'w-full', children: 'Full Width' }
  AllVariants      — render() showing all 5 variants side by side
  AllSizes         — render() showing all 3 sizes side by side
  InForm           — render() showing button in a form context with primary + ghost
```

---

## 17. Files to Generate

Reference `.ai/component-anatomy.md` for exact file paths. All 17 files:

1. `packages/primitives/src/button/Button.tsx`
2. `packages/primitives/src/button/Button.types.ts`
3. `packages/primitives/src/button/useButton.ts`
4. `packages/primitives/src/button/Button.test.tsx`
5. `packages/primitives/src/button/index.ts`
6. `components/react/button/Button.tsx`
7. `components/react/button/Button.stories.tsx`
8. `components/react/button/Button.test.tsx`
9. `components/react/button/index.ts`
10. `components/web/button/button-element.ts`
11. `components/web/button/index.ts`
12. `components/native/button/Button.tsx`
13. `components/native/button/Button.test.tsx`
14. `components/native/button/index.ts`
15. `packages/ai/manifests/button.manifest.yaml`
16. `docs/content/components/button.mdx`
17. `figma/button.figma.ts`

Also update:
* `packages/primitives/src/index.ts` — add Button export
* `registry.json` (create at repo root) — add Button entry

---

## 18. Validation

After generating all files:

```bash
pnpm typecheck
pnpm test
pnpm lint
pnpm storybook  # visually verify all stories render
```

All commands must pass with zero errors.
