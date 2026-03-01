# DS0 Conventions

> This document defines every convention in DS0.
> AI agents: follow these rules exactly. Do not deviate unless a spec file explicitly overrides.

## 1. Directory Naming

ALL directories use **kebab-case**. No exceptions.

```
✅ radio-group/
✅ date-picker/
✅ data-table/

❌ RadioGroup/
❌ datePicker/
❌ DataTable/
```

## 2. File Naming

| File Type | Convention | Example |
|---|---|---|
| React component | PascalCase + `.tsx` | `Button.tsx`, `RadioGroup.tsx` |
| Types | PascalCase + `.types.ts` | `Button.types.ts` |
| Hook | camelCase with `use` + `.ts` | `useButton.ts`, `useRadioGroup.ts` |
| Test | PascalCase + `.test.tsx` | `Button.test.tsx` |
| Story | PascalCase + `.stories.tsx` | `Button.stories.tsx` |
| Web Component | kebab-case + `-element.ts` | `button-element.ts` |
| Manifest | kebab-case + `.manifest.yaml` | `button.manifest.yaml` |
| Figma mapping | kebab-case + `.figma.ts` | `button.figma.ts` |
| Documentation | kebab-case + `.mdx` | `button.mdx` |
| Token file | kebab-case + `.json` | `color-semantic.json` |
| Spec file | kebab-case + `.spec.md` | `button.spec.md` |
| Index/barrel | `index.ts` always | `index.ts` |

## 3. Component Naming

### 3.1 React Components

```tsx
// PascalCase, always matches filename
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(...)

// displayName MUST be set
Button.displayName = 'Button';
```

### 3.2 Compound Components

Use dot notation for compound components:

```tsx
// The parent
export const Select = forwardRef<HTMLDivElement, SelectProps>(...);

// Sub-components
export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(...);
export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(...);
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(...);

// Attach to parent
Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;

// Consumer usage:
<Select>
  <Select.Trigger />
  <Select.Content>
    <Select.Item />
  </Select.Content>
</Select>
```

### 3.3 Web Components

Always prefixed with `ds0-`:

```
ds0-button
ds0-dialog
ds0-select
ds0-radio-group
```

### 3.4 Package Exports

Every package uses barrel exports via `index.ts`:

```typescript
// packages/primitives/src/button/index.ts
export { Button } from './Button';
export { useButton } from './useButton';
export type { ButtonProps, UseButtonProps, UseButtonReturn } from './Button.types';
```

Never use default exports (except Next.js pages).

## 4. TypeScript Conventions

### 4.1 Props

```typescript
// ALWAYS use interface (not type) for props
// ALWAYS extend the relevant HTML element
// ALWAYS include children explicitly if accepted

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style of the button */
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
  /** The size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Content to display inside the button */
  children: React.ReactNode;
}
```

### 4.2 JSDoc Comments

Every exported prop, function, and component MUST have JSDoc:

```typescript
/**
 * A clickable button that triggers an action.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Save Changes
 * </Button>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/button | Documentation}
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(...)
```

### 4.3 Hook Return Types

Always define explicit return types for hooks:

```typescript
interface UseButtonReturn {
  /** Props to spread onto the button element */
  buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Whether the button is currently pressed */
  isPressed: boolean;
  /** Whether the button is currently focused */
  isFocused: boolean;
}

export function useButton(props: UseButtonProps): UseButtonReturn {
  // ...
}
```

### 4.4 Generics

When a component accepts generic types (e.g., Select with value type):

```typescript
interface SelectProps<T extends string = string> {
  value?: T;
  onValueChange?: (value: T) => void;
  children: React.ReactNode;
}
```

### 4.5 Strict Rules

```
✅ interface ButtonProps {}          — use interface for object shapes
✅ type Variant = 'a' | 'b'         — use type for unions and aliases
✅ unknown                           — when type is truly not known
✅ explicit return types on exports  — always

❌ type ButtonProps = {}             — never type for object shapes
❌ any                               — never, no exceptions
❌ // @ts-ignore                     — never, fix the type
❌ as HTMLElement                    — avoid type assertions, narrow instead
```

## 5. Tailwind Conventions

### 5.1 Class Organization

Classes follow this order within a `cva` definition or `cn()` call:

```
1. Layout       → flex, grid, inline-flex, block, hidden
2. Position     → relative, absolute, fixed, sticky
3. Box model    → w-, h-, m-, p-, border-
4. Typography   → text-, font-, leading-, tracking-
5. Visual       → bg-, text-[color], rounded-, shadow-
6. Interactive  → hover:, focus:, active:, disabled:
7. Transitions  → transition-, duration-, ease-
8. Responsive   → sm:, md:, lg:, xl:
```

### 5.2 CVA Structure

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base classes — always applied, ordered per 5.1
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
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
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// ALWAYS export the variants type
export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

### 5.3 The `cn()` Utility

Every project using DS0 MUST have this utility:

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

Usage in components:

```tsx
<button className={cn(buttonVariants({ variant, size }), className)}>
  {children}
</button>
```

### 5.4 Tailwind Rules

```
✅ bg-primary                     — use semantic token classes
✅ px-4 py-2                      — use scale values
✅ rounded-md                     — use scale values
✅ hover:bg-primary/90            — opacity modifier for hover states

❌ bg-blue-500                    — never use raw palette in components
❌ w-[137px]                      — never use arbitrary values
❌ @apply bg-primary              — never use @apply
❌ style={{ padding: '13px' }}    — never use inline styles for token values
```

## 6. Token Naming Conventions

### 6.1 Core Tokens

Core tokens are raw, mathematical values with no semantic meaning:

```json
{
  "color": {
    "gray": {
      "50":  { "$type": "color", "$value": "#F9FAFB" },
      "100": { "$type": "color", "$value": "#F3F4F6" },
      "900": { "$type": "color", "$value": "#111827" }
    }
  },
  "spacing": {
    "0":   { "$type": "dimension", "$value": "0px" },
    "1":   { "$type": "dimension", "$value": "4px" },
    "2":   { "$type": "dimension", "$value": "8px" },
    "4":   { "$type": "dimension", "$value": "16px" }
  }
}
```

### 6.2 Semantic Tokens

Semantic tokens reference core tokens and express intent:

```json
{
  "color": {
    "primary":    { "$type": "color", "$value": "{color.blue.600}" },
    "primary-foreground": { "$type": "color", "$value": "{color.white}" },
    "destructive": { "$type": "color", "$value": "{color.red.600}" },
    "muted":      { "$type": "color", "$value": "{color.gray.100}" },
    "background": { "$type": "color", "$value": "{color.white}" },
    "foreground": { "$type": "color", "$value": "{color.gray.900}" },
    "border":     { "$type": "color", "$value": "{color.gray.200}" },
    "input":      { "$type": "color", "$value": "{color.gray.200}" },
    "ring":       { "$type": "color", "$value": "{color.blue.400}" },
    "accent":     { "$type": "color", "$value": "{color.gray.100}" },
    "accent-foreground": { "$type": "color", "$value": "{color.gray.900}" }
  }
}
```

### 6.3 Naming Rules

```
✅ color.primary                  — semantic, expresses intent
✅ color.gray.500                 — core, expresses scale position
✅ spacing.4                      — core, number = multiplier (4 × 4px = 16px)
✅ radius.md                      — t-shirt sizing for non-numeric scales
✅ elevation.sm                   — t-shirt sizing for shadows

❌ color.button-bg                — never component-specific tokens at core/semantic level
❌ color.blue-primary             — never mix raw color name with semantic name
❌ spacing.medium                 — never ambiguous names (what is "medium"?)
```

### 6.4 Foreground Pattern

Every background color token has a matching foreground token:

```
primary           → primary-foreground
secondary         → secondary-foreground
destructive       → destructive-foreground
muted             → muted-foreground
accent            → accent-foreground
```

This ensures contrast is always maintained by the token system, not by individual components.

## 7. Testing Conventions

### 7.1 File Structure

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  // Group 1: Rendering
  describe('rendering', () => {
    it('renders with default props', () => { ... });
    it('renders all variants', () => { ... });
  });

  // Group 2: Interactions
  describe('interactions', () => {
    it('calls onClick when clicked', () => { ... });
  });

  // Group 3: Keyboard
  describe('keyboard', () => {
    it('activates on Enter', () => { ... });
  });

  // Group 4: Accessibility
  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

### 7.2 Test Naming

```
✅ 'renders with default props'
✅ 'calls onClick when clicked'
✅ 'does not call onClick when disabled'
✅ 'has no axe violations'

❌ 'should render'              — no "should", be direct
❌ 'it works'                   — too vague
❌ 'test button click'          — don't start with "test"
```

### 7.3 User Event Over fireEvent

```typescript
// ✅ Always use userEvent (simulates real user behavior)
const user = userEvent.setup();
await user.click(button);
await user.keyboard('{Enter}');
await user.tab();

// ❌ Never use fireEvent (synthetic, misses real behavior)
fireEvent.click(button);
```

## 8. Storybook Conventions

### 8.1 Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Actions/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'ghost', 'outline'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default story — ALWAYS first
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// One story per variant
export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

// State stories
export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const Loading: Story = {
  args: { isLoading: true, children: 'Loading' },
};

// Composition story — shows real-world usage
export const InForm: Story = {
  render: () => (
    <form>
      <Button variant="primary">Submit</Button>
      <Button variant="ghost">Cancel</Button>
    </form>
  ),
};
```

### 8.2 Story Title Convention

```
Components/[Category]/[Name]
```

Categories match manifest categories:
```
Components/Actions/Button
Components/Actions/IconButton
Components/Data Input/TextField
Components/Data Input/Select
Components/Data Display/Badge
Components/Data Display/Avatar
Components/Feedback/Alert
Components/Feedback/Toast
Components/Layout/Stack
Components/Layout/Grid
Components/Navigation/Tabs
Components/Navigation/Breadcrumb
Components/Overlay/Dialog
Components/Overlay/Popover
Components/Typography/Heading
Components/Typography/Text
```

## 9. Documentation Conventions

### 9.1 MDX Page Structure

Every component doc page follows this structure:

```mdx
---
title: Button
description: Triggers an action or event.
---

import { Button } from '@/components/react/button';

## Overview

[One paragraph describing what this component does and when to use it]

## Usage

[Default example with code block]

## Variants

[One example per variant]

## Sizes

[One example per size]

## States

[Disabled, loading, etc.]

## Accessibility

[Keyboard interactions, ARIA, screen reader behavior]

## API Reference

[Auto-generated props table from types]

## Related Components

[Links to related components with brief explanation of when to use each]
```

### 9.2 Code Examples

All code examples must be:
- Complete (no `...` or truncated code)
- Copy-pasteable (imports included)
- Using real DS0 components (not pseudo-code)
- Showing the most common use case first

## 10. Git Conventions

### 10.1 Branch Naming

```
feat/[component-name]         — new component or feature
fix/[component-name]-[issue]  — bug fix
docs/[topic]                  — documentation changes
tokens/[change]               — token additions or modifications
chore/[task]                  — maintenance, dependencies, CI
```

### 10.2 Commit Messages

Follow Conventional Commits:

```
feat(button): add loading state variant
fix(select): correct keyboard navigation for disabled items
docs(dialog): add accessibility section
tokens: add elevation scale
chore: update vitest to v3
test(button): add screen reader announcement tests
```

### 10.3 PR Structure

Every PR must include:
- Description of what changed and why
- Screenshots/recordings for visual changes
- Test coverage for new code
- Updated manifest if component behavior changed
- Updated docs if API changed

## 11. Import Order

Enforced by ESLint. Always follow this order with blank lines between groups:

```typescript
// 1. React and framework imports
import React, { forwardRef, useState } from 'react';

// 2. External library imports
import { cva, type VariantProps } from 'class-variance-authority';

// 3. Internal package imports (@ds0/*)
import { useButton } from '@ds0/primitives';

// 4. Local imports (relative paths)
import { cn } from '@/lib/utils';

// 5. Type-only imports (always last)
import type { ButtonProps } from './Button.types';
```

## 12. Error Handling

### 12.1 In Components

```typescript
// ✅ Use invariant for developer-facing errors
import { invariant } from '@ds0/primitives/utils';

invariant(
  children != null,
  'Button: `children` prop is required. Provide text content or use `aria-label` for icon-only buttons.'
);

// ✅ Warn for deprecated props
if (process.env.NODE_ENV !== 'production') {
  if (props.color) {
    console.warn(
      'DS0 Button: `color` prop is deprecated. Use `variant` instead. See https://ds0.systems/docs/migration'
    );
  }
}

// ❌ Never silently swallow errors
// ❌ Never use try/catch to hide component bugs
// ❌ Never throw in render — use error boundaries at the app level
```

## 13. Performance Rules

```
✅ Memoize expensive computations with useMemo
✅ Memoize callbacks passed to children with useCallback
✅ Use React.lazy for heavy components in recipes
✅ Keep bundle size per component under 5KB gzipped

❌ Don't prematurely optimize — measure first
❌ Don't wrap every component in React.memo (only if proven needed)
❌ Don't use useEffect for derived state (use useMemo instead)
```
