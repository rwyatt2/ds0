# Phase 3, Wave 1 — Foundation Components

> **Instructions for AI:** Read ALL files in `.ai/` before starting.
> Reference the Button component as the golden pattern for every file.
> Each component below must produce ALL 17 files per `.ai/component-anatomy.md`.
> Build components in the order listed. Validate after each.

---

## Component 1: Heading

### Overview
**Name:** Heading
**Category:** Typography
**Description:** Renders semantic heading elements (h1–h6) with consistent styling.

### Use When
* Displaying page titles, section titles, or subsection titles
* Creating visual hierarchy in content

### Don't Use When
* Styling non-heading text to look like a heading → use **Text** with appropriate weight
* Labels for form fields → use **Label**

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h2'` | No | The heading level |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | — | No | Override visual size (decoupled from semantic level) |
| `weight` | `'regular' \| 'medium' \| 'semibold' \| 'bold'` | `'bold'` | No | Font weight |
| `tracking` | `'tighter' \| 'tight' \| 'normal'` | `'tight'` | No | Letter spacing |
| `children` | `ReactNode` | — | Yes | Heading text |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)
```typescript
const headingVariants = cva('scroll-m-20 tracking-tight', {
  variants: {
    size: {
      xs: 'text-xs font-semibold',
      sm: 'text-sm font-semibold',
      md: 'text-base font-semibold',
      lg: 'text-lg font-semibold',
      xl: 'text-xl font-semibold',
      '2xl': 'text-2xl font-semibold',
      '3xl': 'text-3xl font-bold',
      '4xl': 'text-4xl font-bold tracking-tighter',
    },
  },
  defaultVariants: {
    size: 'xl',
  },
});
```

Default size mapping when `size` prop is not provided:
* `h1` → `4xl`
* `h2` → `3xl`
* `h3` → `2xl`
* `h4` → `xl`
* `h5` → `lg`
* `h6` → `md`

### Accessibility
* Always renders the correct semantic element (`<h1>` through `<h6>`)
* No special ARIA attributes needed — semantic HTML handles it

---

## Component 2: Text

### Overview
**Name:** Text
**Category:** Typography
**Description:** Renders styled text content with consistent typography.

### Use When
* Body text, paragraphs, descriptions
* Helper text, captions, secondary information
* Inline text with specific styling

### Don't Use When
* Section titles or headings → use **Heading**
* Form field labels → use **Label**
* Code or monospace content → use **Code**

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `as` | `'p' \| 'span' \| 'div' \| 'em' \| 'strong'` | `'p'` | No | HTML element |
| `size` | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl'` | `'base'` | No | Font size |
| `weight` | `'regular' \| 'medium' \| 'semibold' \| 'bold'` | `'regular'` | No | Font weight |
| `color` | `'default' \| 'muted' \| 'primary' \| 'destructive' \| 'success'` | `'default'` | No | Text color |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | No | Text alignment |
| `children` | `ReactNode` | — | Yes | Text content |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)
```typescript
const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
      success: 'text-success',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'regular',
    color: 'default',
    align: 'left',
  },
});
```

### Accessibility
* Use semantic elements (`<p>` for paragraphs, `<em>` for emphasis, `<strong>` for importance)
* Color alone should not convey meaning — pair with icons or text cues

---

## Component 3: Label

### Overview
**Name:** Label
**Category:** Typography
**Description:** Accessible label for form inputs. Renders a `<label>` element with consistent styling.

### Use When
* Labeling a form input (TextField, Select, Checkbox, etc.)
* Providing accessible name for interactive elements

### Don't Use When
* General text content → use **Text**
* Headings → use **Heading**

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `htmlFor` | `string` | — | Yes | ID of the associated input element |
| `required` | `boolean` | `false` | No | Shows required indicator (*) |
| `disabled` | `boolean` | `false` | No | Applies muted styling |
| `size` | `'sm' \| 'md'` | `'md'` | No | Label size |
| `children` | `ReactNode` | — | Yes | Label text |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)
```typescript
const labelVariants = cva(
  'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
```

### Accessibility
* Always renders `<label>` element
* `htmlFor` must match the associated input's `id`
* When `required`, append `<span aria-hidden="true"> *</span>` visually and add screen-reader-only text "required"

---

## Component 4: Code

### Overview
**Name:** Code
**Category:** Typography
**Description:** Renders inline or block code with monospace styling.

### Use When
* Displaying code snippets, variable names, or terminal commands inline
* Showing code blocks (when `block` prop is true)

### Don't Use When
* Full code editor functionality → use a third-party editor
* Regular text → use **Text**

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'inline' \| 'block'` | `'inline'` | No | Inline `<code>` or block `<pre><code>` |
| `children` | `ReactNode` | — | Yes | Code content |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)
```typescript
const codeVariants = cva('font-mono', {
  variants: {
    variant: {
      inline: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-sm',
      block: 'relative rounded-lg bg-muted p-4 text-sm overflow-x-auto',
    },
  },
  defaultVariants: {
    variant: 'inline',
  },
});
```

### Accessibility
* Inline: renders `<code>`
* Block: renders `<pre><code>`
* No special ARIA needed — semantic HTML handles it

---

## Component 5: IconButton

### Overview
**Name:** IconButton
**Category:** Actions
**Description:** A button containing only an icon, with an accessible label provided via `aria-label`.

### Use When
* Action can be represented by a universally understood icon
* Space is limited (toolbars, table rows, card actions)
* Paired with a tooltip to reveal the label

### Don't Use When
* The action is ambiguous without a text label → use **Button** with text
* Inside a menu → use **MenuItem**

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'destructive' \| 'ghost' \| 'outline'` | `'ghost'` | No | Visual style (defaults to ghost, unlike Button) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Button size |
| `icon` | `ReactNode` | — | Yes | The icon element |
| `aria-label` | `string` | — | Yes | Accessible name (REQUIRED) |
| `isLoading` | `boolean` | `false` | No | Shows spinner replacing icon |
| `isDisabled` | `boolean` | `false` | No | Disables the button |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)
Same as Button variants but with square aspect ratio:
```typescript
const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        // Same as Button
      },
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
    },
  }
);
```

### Accessibility
* `aria-label` is REQUIRED — invariant should throw if missing
* Uses `useButton` hook from primitives (same as Button)
* Renders `<button>` element
* Same keyboard interactions as Button

### Implementation Notes
* Reuse `useButton` hook — do NOT create a separate primitive
* This is a styled-layer-only component that wraps the Button primitive differently
* Icon size should scale with button size: `sm` → 16px, `md` → 20px, `lg` → 24px

---

## Component 6: Badge

### Overview
**Name:** Badge
**Category:** Data Display
**Description:** A small visual indicator for status, counts, or categories.

### Use When
* Showing status (active, inactive, pending)
* Displaying counts (notifications, items)
* Categorizing or tagging content

### Don't Use When
* Interactive selection → use **ToggleGroup**
* Detailed status information → use **Alert**

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'success' \| 'warning' \| 'outline'` | `'default'` | No | Visual style |
| `size` | `'sm' \| 'md'` | `'md'` | No | Badge size |
| `children` | `ReactNode` | — | Yes | Badge content |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)
```typescript
const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        outline: 'border border-border text-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
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
* Badge is purely visual — no interactive role
* If Badge conveys important status, ensure the status is also communicated in text (don't rely on color alone)
* Use `role="status"` if the badge content updates dynamically

### Primitive Notes
* Badge is a **styled-only** component — no primitive hook needed
* It's essentially a styled `<span>` with variant classes
* Still create the primitive file structure, but the hook simply passes through props

---

## Component 7: Spinner

### Overview
**Name:** Spinner
**Category:** Feedback
**Description:** An animated loading indicator showing that an operation is in progress.

### Use When
* Content is loading asynchronously
* An action is being processed (form submission, API call)
* Within a Button's loading state

### Don't Use When
* You can show a progress percentage → use **Progress**
* The loading area has a known shape → use **Skeleton**

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Spinner size |
| `label` | `string` | `'Loading'` | No | Accessible label for screen readers |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)
```typescript
const spinnerVariants = cva('animate-spin text-current', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
```

### Implementation
* SVG-based spinner (same as the one used in Button loading state)
* `role="status"` on wrapper
* `aria-label` from `label` prop
* Visually hidden text for screen readers: "Loading"

### Accessibility
* `role="status"` on wrapper element
* `aria-label` with the `label` prop value
* SVG has `aria-hidden="true"` (the wrapper provides the accessible name)

---

## Component 8: Skeleton

### Overview
**Name:** Skeleton
**Category:** Feedback
**Description:** A placeholder that mimics the shape of content while loading.

### Use When
* Loading content with a known layout (cards, lists, profiles)
* You want to reduce perceived load time

### Don't Use When
* You don't know the shape of incoming content → use **Spinner**
* Content loads near-instantly (<100ms)

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'text' \| 'circular' \| 'rectangular'` | `'text'` | No | Shape |
| `width` | `string` | `'100%'` | No | CSS width |
| `height` | `string` | — | No | CSS height (auto for text) |
| `lines` | `number` | `1` | No | Number of text lines (only for `text` variant) |
| `className` | `string` | — | No | Additional CSS classes |

### Implementation
```typescript
const skeletonVariants = cva('animate-pulse bg-muted', {
  variants: {
    variant: {
      text: 'h-4 rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-md',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});
```

### Accessibility
* `aria-hidden="true"` — skeleton is decorative
* Wrap the loading area with `aria-busy="true"` on the parent
* When content loads, remove `aria-busy` and skeleton

---

## Component 9: Stack

### Overview
**Name:** Stack
**Category:** Layout
**Description:** Arranges children in a vertical or horizontal stack with consistent spacing.

### Use When
* Arranging elements vertically with consistent gaps
* Arranging elements horizontally (row layout)
* Any flex-based layout with uniform spacing

### Don't Use When
* Complex 2D grid layout → use **Grid**
* No spacing needed between children → use raw flex

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | No | Stack direction |
| `gap` | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '8' \| '10' \| '12'` | `'4'` | No | Gap between items (maps to spacing tokens) |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'stretch'` | No | Cross-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` | No | Main-axis justification |
| `wrap` | `boolean` | `false` | No | Whether items wrap |
| `as` | `ElementType` | `'div'` | No | HTML element |
| `children` | `ReactNode` | — | Yes | Stack items |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)
```typescript
const stackVariants = cva('flex', {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    gap: {
      '0': 'gap-0',
      '1': 'gap-1',
      '2': 'gap-2',
      '3': 'gap-3',
      '4': 'gap-4',
      '5': 'gap-5',
      '6': 'gap-6',
      '8': 'gap-8',
      '10': 'gap-10',
      '12': 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    gap: '4',
    align: 'stretch',
    justify: 'start',
  },
});
```

### Accessibility
* No special ARIA — layout is visual only
* Use semantic HTML via `as` prop where appropriate (`<nav>`, `<section>`, etc.)

### Primitive Notes
* Stack is **styled-only** — no behavior hook needed
* Primitive simply renders the element with props passthrough

---

## Component 10: Grid

### Overview
**Name:** Grid
**Category:** Layout
**Description:** CSS Grid-based layout for 2D arrangements of content.

### Use When
* Arranging content in a grid (cards, image galleries, dashboards)
* Need responsive column counts

### Don't Use When
* Single axis layout → use **Stack**
* Simple centering → use flex utilities directly

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `columns` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 12` | `1` | No | Number of columns |
| `gap` | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '8'` | `'4'` | No | Gap between items |
| `as` | `ElementType` | `'div'` | No | HTML element |
| `children` | `ReactNode` | — | Yes | Grid items |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)
```typescript
const gridVariants = cva('grid', {
  variants: {
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    },
    gap: {
      '0': 'gap-0',
      '1': 'gap-1',
      '2': 'gap-2',
      '3': 'gap-3',
      '4': 'gap-4',
      '5': 'gap-5',
      '6': 'gap-6',
      '8': 'gap-8',
    },
  },
  defaultVariants: {
    columns: 1,
    gap: '4',
  },
});
```

### Accessibility
* No special ARIA — layout only
* For responsive, consumers add classes like `md:grid-cols-3` via `className`

---

## Component 11: Container

### Overview
**Name:** Container
**Category:** Layout
**Description:** Centers content with a max-width and consistent horizontal padding.

### Use When
* Wrapping page-level content with max-width constraints
* Creating consistent margins across pages

### Don't Use When
* Full-bleed backgrounds → don't wrap in Container
* Nested layout control → use **Stack** or **Grid**

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'` | No | Max-width |
| `padding` | `boolean` | `true` | No | Whether to apply horizontal padding |
| `center` | `boolean` | `true` | No | Whether to center with mx-auto |
| `as` | `ElementType` | `'div'` | No | HTML element |
| `children` | `ReactNode` | — | Yes | Container content |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)
```typescript
const containerVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      full: 'max-w-full',
    },
    center: {
      true: 'mx-auto',
    },
    padding: {
      true: 'px-4 sm:px-6 lg:px-8',
    },
  },
  defaultVariants: {
    size: 'lg',
    center: true,
    padding: true,
  },
});
```

---

## Component 12: Divider

### Overview
**Name:** Divider
**Category:** Layout
**Description:** A visual separator between content sections.

### Use When
* Separating groups of content visually
* Creating visual breaks in lists, menus, or forms

### Don't Use When
* Spacing alone is sufficient → use **Stack** gap
* Interactive separator → not a use case

### Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | No | Direction |
| `decorative` | `boolean` | `true` | No | If true, uses `role="none"`. If false, uses `role="separator"`. |
| `className` | `string` | — | No | Additional CSS classes |

### Variants (cva)
```typescript
const dividerVariants = cva('shrink-0 bg-border', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});
```

### Accessibility
* `role="separator"` when the divider has semantic meaning
* `role="none"` (or `aria-hidden="true"`) when purely decorative
* `aria-orientation` matching the `orientation` prop when using `role="separator"`
