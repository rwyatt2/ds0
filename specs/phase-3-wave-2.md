# Phase 3, Wave 2 — Input Components & Supporting Elements

> **Instructions for AI:** Read ALL files in `.ai/` before starting.
> Reference Button as the golden pattern and Wave 1 components for conventions.
> Each component must produce ALL 17 files per `.ai/component-anatomy.md`.
> Input components MUST use the Label component from Wave 1.
> Build in order. Validate after each.

---

## Component 1: TextField

### Overview
**Name:** TextField
**Category:** Data Input
**Description:** A single-line text input for collecting short-form user data like names, emails, or search queries.

### Use When
* Collecting short text input (names, emails, URLs, phone numbers)
* Search fields
* Single-line form fields

### Don't Use When
* Multi-line text input → use **TextArea**
* Selecting from predefined options → use **Select**
* Boolean toggle → use **Checkbox** or **Switch**
* Rich text editing → use a third-party editor

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `type` | `'text' \| 'email' \| 'password' \| 'search' \| 'tel' \| 'url' \| 'number'` | `'text'` | No | HTML input type |
| `label` | `string` | — | Yes | Visible label text (renders Label component) |
| `placeholder` | `string` | — | No | Placeholder text |
| `value` | `string` | — | No | Controlled value |
| `defaultValue` | `string` | — | No | Uncontrolled default value |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | — | No | Change handler |
| `onBlur` | `(event: FocusEvent<HTMLInputElement>) => void` | — | No | Blur handler |
| `isDisabled` | `boolean` | `false` | No | Disables input |
| `isRequired` | `boolean` | `false` | No | Marks as required, shows indicator on label |
| `isReadOnly` | `boolean` | `false` | No | Makes input read-only |
| `isInvalid` | `boolean` | `false` | No | Shows error state |
| `helperText` | `string` | — | No | Hint text below input |
| `errorMessage` | `string` | — | No | Error text (shown when `isInvalid`) |
| `leftIcon` | `ReactNode` | — | No | Icon inside input, left side |
| `rightIcon` | `ReactNode` | — | No | Icon inside input, right side |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Input size |
| `className` | `string` | — | No | Additional CSS classes on wrapper |
| `inputClassName` | `string` | — | No | Additional CSS classes on input element |

### Anatomy

```
┌─ Label ─────────────────────────── [Required *] ─┐
│                                                    │
│  ┌─ Input Container ────────────────────────────┐  │
│  │ [LeftIcon?]  input text here  [RightIcon?]   │  │
│  └──────────────────────────────────────────────┘  │
│                                                    │
│  Helper text or Error message                      │
└────────────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Label | Yes | Uses Label component from Wave 1. Connected via `htmlFor`. |
| Input | Yes | Native `<input>` element |
| Left icon | No | Positioned absolutely inside the input container |
| Right icon | No | Positioned absolutely inside the input container |
| Helper text | No | Shown below input in muted color |
| Error message | No | Replaces helper text when `isInvalid`. Shown in destructive color. |

### Variants (cva) — Input Element

```typescript
const textFieldVariants = cva(
  'flex w-full rounded-md border bg-background text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      state: {
        default: 'border-input',
        invalid: 'border-destructive focus-visible:ring-destructive',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);
```

### Primitive Hook — `useTextField`

```typescript
interface UseTextFieldProps {
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  id?: string;
}

interface UseTextFieldReturn {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps: { htmlFor: string };
  helperTextProps: { id: string };
  errorMessageProps: { id: string; role: 'alert' };
  fieldId: string;
}
```

The hook:
* Generates a unique `id` if none provided (via `useId()`)
* Connects label to input via `htmlFor` / `id`
* Connects helper text / error message via `aria-describedby`
* Sets `aria-invalid="true"` when `isInvalid`
* Sets `aria-required="true"` when `isRequired`
* Sets `aria-disabled="true"` when `isDisabled`
* Sets `readOnly` when `isReadOnly`

### Accessibility

#### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus into/out of the input |
| Typing | Enters text |
| `Escape` | Optionally clears search input (type="search" only) |

#### ARIA Attributes
* `aria-invalid="true"` — when `isInvalid`
* `aria-required="true"` — when `isRequired`
* `aria-disabled="true"` — when `isDisabled`
* `aria-describedby` — points to helper text or error message ID
* Label connected via `<label htmlFor={id}>`

#### Screen Reader
* On focus: announces label, input role, required state, and any description
* On error: error message is announced via `role="alert"` on the error container

#### WAI-ARIA Pattern
Standard form input — no specific APG pattern. Use native `<input>` with proper labeling.

### Decision Tree
```yaml
- condition: Does the user need to enter text?
  yes:
    - condition: Is it multi-line?
      yes: Use TextArea
      no:
        - condition: Is it selecting from predefined options?
          yes: Use Select
          no: Use TextField
  no: TextField is not the right component.
```

### Related Components

| Component | Relationship |
|---|---|
| TextArea | Multi-line variant of text input |
| Select | When input choices are predefined |
| Label | Used internally for the input label |
| Form | Parent container for groups of inputs |

---

## Component 2: TextArea

### Overview
**Name:** TextArea
**Category:** Data Input
**Description:** A multi-line text input for collecting longer-form content like comments, descriptions, or messages.

### Use When
* Multi-line text entry (comments, descriptions, bios, messages)
* Content that may span multiple paragraphs

### Don't Use When
* Single-line input → use **TextField**
* Rich text with formatting → use a third-party editor

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Visible label text |
| `placeholder` | `string` | — | No | Placeholder text |
| `value` | `string` | — | No | Controlled value |
| `defaultValue` | `string` | — | No | Uncontrolled default value |
| `onChange` | `(event: ChangeEvent<HTMLTextAreaElement>) => void` | — | No | Change handler |
| `rows` | `number` | `3` | No | Visible rows |
| `maxLength` | `number` | — | No | Maximum character count |
| `showCount` | `boolean` | `false` | No | Shows character count below |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | No | Resize behavior |
| `isDisabled` | `boolean` | `false` | No | Disables input |
| `isRequired` | `boolean` | `false` | No | Marks as required |
| `isReadOnly` | `boolean` | `false` | No | Makes read-only |
| `isInvalid` | `boolean` | `false` | No | Shows error state |
| `helperText` | `string` | — | No | Hint text below |
| `errorMessage` | `string` | — | No | Error text when invalid |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Text area size |
| `className` | `string` | — | No | Additional CSS classes |

### Anatomy

```
┌─ Label ─────────────────────── [Required *] ─┐
│                                                │
│  ┌─ TextArea ────────────────────────────────┐ │
│  │ Multi-line text here                      │ │
│  │                                           │ │
│  └───────────────────────────────────────────┘ │
│                                                │
│  Helper text / Error        [42/200 chars]     │
└────────────────────────────────────────────────┘
```

### Variants (cva)

```typescript
const textAreaVariants = cva(
  'flex w-full rounded-md border bg-background text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base',
      },
      state: {
        default: 'border-input',
        invalid: 'border-destructive focus-visible:ring-destructive',
        disabled: 'opacity-50 cursor-not-allowed',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
      resize: 'vertical',
    },
  }
);
```

### Primitive Hook — `useTextArea`

Same pattern as `useTextField` but for `<textarea>`:
* Generates unique `id`
* Connects label, helper text, error message via ARIA
* Manages character count state if `showCount` is true
* Sets `aria-invalid`, `aria-required`, `aria-disabled`, `aria-describedby`

### Accessibility
* Same ARIA pattern as TextField
* Character count should be announced to screen readers via `aria-live="polite"` when approaching max
* `<textarea>` element — no explicit role needed

---

## Component 3: Checkbox

### Overview
**Name:** Checkbox
**Category:** Data Input
**Description:** A toggle control that allows the user to select or deselect an option.

### Use When
* Selecting one or more items from a list
* Toggling a single boolean option (agree to terms, remember me)
* Multi-select scenarios

### Don't Use When
* Selecting one option from mutually exclusive choices → use **RadioGroup**
* On/off toggle with immediate effect → use **Switch**
* Selecting from many options with search → use **Select** with multi-select

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `checked` | `boolean` | — | No | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | No | Uncontrolled default |
| `onCheckedChange` | `(checked: boolean \| 'indeterminate') => void` | — | No | Change handler |
| `indeterminate` | `boolean` | `false` | No | Indeterminate (partial) state |
| `label` | `string` | — | Yes | Visible label text |
| `description` | `string` | — | No | Description text below label |
| `isDisabled` | `boolean` | `false` | No | Disables checkbox |
| `isRequired` | `boolean` | `false` | No | Marks as required |
| `isInvalid` | `boolean` | `false` | No | Shows error state |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Checkbox size |
| `className` | `string` | — | No | Additional CSS classes |

### Anatomy

```
┌───────────────────────────────────────────┐
│  [✓]  Label text                          │
│       Description text (optional, muted)  │
└───────────────────────────────────────────┘
```

### Variants (cva) — Checkbox indicator

```typescript
const checkboxVariants = cva(
  'shrink-0 rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      state: {
        default: 'border-input',
        invalid: 'border-destructive',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);
```

### Primitive Hook — `useCheckbox`

```typescript
interface UseCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  indeterminate?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
}

interface UseCheckboxReturn {
  checkboxProps: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps: { htmlFor: string };
  isChecked: boolean;
  isIndeterminate: boolean;
  state: 'checked' | 'unchecked' | 'indeterminate';
}
```

The hook:
* Manages controlled/uncontrolled checked state
* Handles indeterminate state via ref (`inputRef.current.indeterminate = true`)
* Generates unique `id` for label connection
* Sets `aria-checked` to `true`, `false`, or `'mixed'` (for indeterminate)
* Toggles on click AND on `Space` key

### Accessibility

#### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to the checkbox |
| `Space` | Toggles the checkbox |

#### ARIA Attributes
* Uses native `<input type="checkbox">` — implicit role
* `aria-checked="mixed"` for indeterminate state
* `aria-disabled="true"` when disabled
* `aria-required="true"` when required
* `aria-invalid="true"` when invalid
* `aria-describedby` pointing to description if provided

#### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/

### Decision Tree
```yaml
- condition: Is this a boolean yes/no or on/off?
  yes:
    - condition: Does the change take immediate effect?
      yes: Use Switch
      no: Use Checkbox
  no:
    - condition: Is it multi-select from a list?
      yes: Use Checkbox (multiple)
      no:
        - condition: Single select from mutually exclusive options?
          yes: Use RadioGroup
          no: Use Select
```

### Related Components

| Component | Relationship |
|---|---|
| Switch | Immediate on/off toggle. Use instead when change takes effect instantly. |
| RadioGroup | Single selection from mutually exclusive options. |
| Select | When there are many options, especially with search/filter. |

---

## Component 4: Switch

### Overview
**Name:** Switch
**Category:** Data Input
**Description:** A toggle control for settings that take immediate effect, like enabling/disabling a feature.

### Use When
* On/off toggles that take immediate effect
* Settings, preferences, feature flags
* Anywhere a physical light switch metaphor applies

### Don't Use When
* Change doesn't take effect until form submission → use **Checkbox**
* Selecting from multiple options → use **RadioGroup** or **Select**

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `checked` | `boolean` | — | No | Controlled state |
| `defaultChecked` | `boolean` | `false` | No | Uncontrolled default |
| `onCheckedChange` | `(checked: boolean) => void` | — | No | Change handler |
| `label` | `string` | — | Yes | Visible label text |
| `description` | `string` | — | No | Description below label |
| `isDisabled` | `boolean` | `false` | No | Disables switch |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Switch size |
| `className` | `string` | — | No | Additional CSS classes |

### Anatomy

```
┌─────────────────────────────────────────────┐
│  Label text                    [====( ● )]  │
│  Description text (optional)                │
└─────────────────────────────────────────────┘
```

### Variants (cva) — Switch track

```typescript
const switchVariants = cva(
  'inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-[52px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// Thumb
const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-full data-[state=unchecked]:translate-x-0',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
        md: 'h-5 w-5 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
```

### Primitive Hook — `useSwitch`

```typescript
interface UseSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  isDisabled?: boolean;
}

interface UseSwitchReturn {
  switchProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  thumbProps: Record<string, string>;
  isChecked: boolean;
  state: 'checked' | 'unchecked';
}
```

The hook:
* Renders as a `<button>` with `role="switch"` (NOT a checkbox)
* `aria-checked` reflects the current state
* Toggles on click and `Space`/`Enter`
* Manages controlled/uncontrolled state

### Accessibility

#### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to the switch |
| `Space` | Toggles the switch |
| `Enter` | Toggles the switch |

#### ARIA Attributes
* `role="switch"`
* `aria-checked="true"` or `"false"`
* `aria-disabled="true"` when disabled
* `aria-labelledby` pointing to label

#### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/switch/

---

## Component 5: Slider

### Overview
**Name:** Slider
**Category:** Data Input
**Description:** A draggable control for selecting a numeric value within a range.

### Use When
* Selecting a value within a defined range (volume, brightness, price range)
* The approximate value matters more than precision
* Visual feedback of position in a range is helpful

### Don't Use When
* Precise numeric input is needed → use **TextField** with `type="number"`
* Selecting from discrete named options → use **RadioGroup** or **Select**

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `number[]` | — | No | Controlled value (array for range) |
| `defaultValue` | `number[]` | `[0]` | No | Uncontrolled default |
| `onValueChange` | `(value: number[]) => void` | — | No | Change handler |
| `onValueCommit` | `(value: number[]) => void` | — | No | Fires on drag end (for expensive operations) |
| `min` | `number` | `0` | No | Minimum value |
| `max` | `number` | `100` | No | Maximum value |
| `step` | `number` | `1` | No | Step increment |
| `label` | `string` | — | Yes | Accessible label |
| `showValue` | `boolean` | `false` | No | Displays current value |
| `isDisabled` | `boolean` | `false` | No | Disables slider |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | No | Slider direction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Track and thumb size |
| `className` | `string` | — | No | Additional CSS classes |

### Anatomy

```
Label                          [42]
┌──────────●═══════════════════════┐
│  Track (filled ●──── unfilled)   │
└──────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Label | Yes | Uses Label component, connected via aria-labelledby |
| Track | Yes | Background bar showing the full range |
| Range (filled track) | Yes | Filled portion from min to current value |
| Thumb | Yes | Draggable handle, focusable |
| Value display | No | Shows current numeric value |

### Variants (cva)

```typescript
// Track
const sliderTrackVariants = cva(
  'relative w-full grow overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

// Range (filled)
const sliderRangeVariants = cva('absolute h-full bg-primary', {});

// Thumb
const sliderThumbVariants = cva(
  'block rounded-full border-2 border-primary bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: { size: 'md' },
  }
);
```

### Primitive Hook — `useSlider`

Complex hook that manages:
* Controlled/uncontrolled value state
* Mouse drag tracking (pointer events)
* Touch drag tracking
* Keyboard value changes (arrow keys, Home, End, Page Up/Down)
* Calculation of thumb position as percentage
* Multi-thumb support (for range sliders with `value` array of length 2)
* `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`

### Accessibility

#### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to the thumb |
| `Arrow Right / Up` | Increases value by one step |
| `Arrow Left / Down` | Decreases value by one step |
| `Page Up` | Increases value by a large step (10× step) |
| `Page Down` | Decreases value by a large step (10× step) |
| `Home` | Sets to minimum |
| `End` | Sets to maximum |

#### ARIA Attributes
* `role="slider"` on the thumb
* `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
* `aria-valuetext` — human-readable value (e.g., "42 percent", "$50")
* `aria-orientation`
* `aria-disabled="true"` when disabled
* `aria-labelledby` pointing to label

#### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/slider/

### Decision Tree
```yaml
- condition: Does the user need to select a number in a range?
  yes:
    - condition: Is approximate value OK (vs exact)?
      yes: Use Slider
      no: Use TextField type="number"
  no: Slider is not the right component.
```

---

## Component 6: Link

### Overview
**Name:** Link
**Category:** Navigation
**Description:** An anchor element for navigating to a URL or page, styled consistently with the design system.

### Use When
* Navigating to another page or URL
* Inline text links within paragraphs
* Navigation menus

### Don't Use When
* Triggering an action that doesn't navigate → use **Button**
* A button that looks like a link → use **Button** with `variant="ghost"` or a link-styled variant

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `href` | `string` | — | Yes | Destination URL |
| `variant` | `'default' \| 'muted' \| 'underline'` | `'default'` | No | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Text size |
| `isExternal` | `boolean` | `false` | No | Opens in new tab, adds external icon |
| `isDisabled` | `boolean` | `false` | No | Disables the link |
| `asChild` | `boolean` | `false` | No | Slot pattern for router Links (Next.js Link, etc.) |
| `children` | `ReactNode` | — | Yes | Link text |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)

```typescript
const linkVariants = cva(
  'inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded',
  {
    variants: {
      variant: {
        default: 'text-primary underline-offset-4 hover:underline',
        muted: 'text-muted-foreground underline-offset-4 hover:text-foreground hover:underline',
        underline: 'text-primary underline underline-offset-4 hover:text-primary/80',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);
```

### Accessibility
* Uses native `<a>` element
* When `isExternal`: adds `target="_blank"` and `rel="noopener noreferrer"`
* When `isExternal`: adds visually hidden text "(opens in new tab)" for screen readers
* When `isDisabled`: `aria-disabled="true"`, `tabIndex={-1}`, `onClick` prevented
* `asChild` pattern: merges props onto child element (e.g., Next.js `<Link>`)

#### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/link/

### Decision Tree
```yaml
- condition: Is the primary purpose navigation?
  yes: Use Link
  no:
    - condition: Is it an action that happens on the current page?
      yes: Use Button
      no: Use Link
```

---

## Component 7: Avatar

### Overview
**Name:** Avatar
**Category:** Data Display
**Description:** Displays a user's profile image, initials, or a fallback icon.

### Use When
* User profiles, comments, chat messages
* Team member lists
* Account menus

### Don't Use When
* Displaying a generic image or thumbnail → use `<img>` or a dedicated Image component
* Icons that aren't user representations → use an icon directly

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `src` | `string` | — | No | Image URL |
| `alt` | `string` | — | Yes | Alt text for the image |
| `fallback` | `string \| ReactNode` | — | No | Initials or icon shown when no image |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | No | Avatar size |
| `shape` | `'circle' \| 'square'` | `'circle'` | No | Shape |
| `className` | `string` | — | No | Additional CSS classes |

### Anatomy

```
┌─────────────┐
│             │
│   Image     │  ← or Initials fallback, or Icon fallback
│             │
└─────────────┘
```

### Variants (cva)

```typescript
const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-muted',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  }
);
```

### Implementation Notes
* Image loading: use `onError` to detect failed loads and show fallback
* Manage three states: `loading`, `loaded`, `error`
* When `loading`: show fallback or skeleton
* When `loaded`: show image
* When `error`: show fallback initials or icon
* Fallback initials: if `fallback` is a string, render first 1-2 characters uppercase

### Accessibility
* `<img>` has `alt` text
* If fallback is initials, the full name should be accessible via `aria-label` on the container
* `role="img"` on the container when showing fallback (not an actual `<img>`)

---

## Component 8: AspectRatio

### Overview
**Name:** AspectRatio
**Category:** Layout
**Description:** Constrains content to a specified aspect ratio.

### Use When
* Displaying images or videos at consistent ratios (16:9, 4:3, 1:1)
* Responsive media containers
* Card thumbnails

### Don't Use When
* Content doesn't need aspect ratio constraint → use regular containers

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `ratio` | `number` | `1` | No | Width / Height ratio (e.g., 16/9 = 1.777) |
| `children` | `ReactNode` | — | Yes | Content to constrain |
| `className` | `string` | — | No | Additional CSS classes |

### Implementation

```typescript
// No cva needed — simple style calculation

const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative w-full', className)}
        style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
        {...props}
      >
        <div className="absolute inset-0">
          {children}
        </div>
      </div>
    );
  }
);
```

### Accessibility
* No ARIA needed — layout component only
* Children should have their own appropriate alt text / roles

---

## Build Instructions

For EACH component above:

1. Read `.ai/component-anatomy.md` for the 17-file structure
2. Reference `components/react/button/` as the golden pattern
3. Reference Wave 1 components for consistency (especially Label)
4. Generate ALL 17 files
5. Input components (TextField, TextArea, Checkbox, Switch, Slider) must use the Label component from Wave 1
6. Run `pnpm typecheck && pnpm test && pnpm lint` after each component
7. Update `packages/primitives/src/index.ts` with new exports
8. Verify Storybook renders correctly

### Antigravity Parallel Build

**Agent 1:** TextField, TextArea
**Agent 2:** Checkbox, Switch
**Agent 3:** Slider, Link
**Agent 4:** Avatar, AspectRatio
