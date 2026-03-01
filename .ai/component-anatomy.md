# DS0 Component Anatomy

> This document defines the exact files, structure, and content required for every DS0 component.
> AI agents: use this as your checklist. Every file listed here is MANDATORY.

## 1. File Map

For a component named `[Name]` (e.g., `RadioGroup`), with directory name `[name]` (e.g., `radio-group`):

```
packages/primitives/src/[name]/
├── [Name].tsx                 # Headless component with behavior + ARIA
├── [Name].types.ts            # All TypeScript interfaces
├── use[Name].ts               # Hook encapsulating behavior logic
├── [Name].test.tsx            # Unit tests for primitive
└── index.ts                   # Barrel exports

components/react/[name]/
├── [Name].tsx                 # Styled component (primitive + Tailwind + cva)
├── [Name].stories.tsx         # Storybook stories
├── [Name].test.tsx            # Integration tests for styled component
└── index.ts                   # Barrel exports

components/web/[name]/
├── [name]-element.ts          # Web Component (Custom Element)
└── index.ts                   # Registration + export

components/native/[name]/
├── [Name].tsx                 # React Native + NativeWind component
├── [Name].test.tsx            # Tests
└── index.ts                   # Barrel exports

packages/ai/manifests/
└── [name].manifest.yaml       # AI metadata

docs/content/components/
└── [name].mdx                 # Documentation page

figma/
└── [name].figma.ts            # Figma Code Connect mapping
```

**Total: 17 files per component.** No exceptions.

## 2. File Templates

### 2.1 Primitive — `packages/primitives/src/[name]/[Name].tsx`

```tsx
import React, { forwardRef } from 'react';

import { use[Name] } from './use[Name]';
import type { [Name]Props } from './[Name].types';

/**
 * Headless [Name] primitive.
 * Provides behavior, keyboard interactions, and ARIA attributes.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <[Name]Primitive>
 *   Content here
 * </[Name]Primitive>
 * ```
 */
const [Name]Primitive = forwardRef<HTML[Element]Element, [Name]Props>(
  ({ children, ...props }, ref) => {
    const { [name]Props } = use[Name](props);

    return (
      <[element] ref={ref} {...[name]Props}>
        {children}
      </[element]>
    );
  }
);

[Name]Primitive.displayName = '[Name]Primitive';

export { [Name]Primitive };
```

### 2.2 Types — `packages/primitives/src/[name]/[Name].types.ts`

```typescript
/**
 * Props for the use[Name] hook.
 */
export interface Use[Name]Props {
  /** Whether the component is disabled */
  isDisabled?: boolean;
  // ... component-specific props
}

/**
 * Return value of the use[Name] hook.
 */
export interface Use[Name]Return {
  /** Props to spread onto the root element */
  [name]Props: React.HTMLAttributes<HTML[Element]Element>;
  // ... component-specific return values
}

/**
 * Props for the [Name] primitive component.
 */
export interface [Name]Props
  extends React.[Element]HTMLAttributes<HTML[Element]Element>,
    Use[Name]Props {
  /** Content to display inside the component */
  children: React.ReactNode;
}

/**
 * Props for the styled [Name] component.
 */
export interface Styled[Name]Props extends [Name]Props {
  /** Visual variant */
  variant?: 'primary' | 'secondary'; // adjust per component
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}
```

### 2.3 Hook — `packages/primitives/src/[name]/use[Name].ts`

```typescript
import { useCallback, useState } from 'react';

import type { Use[Name]Props, Use[Name]Return } from './[Name].types';

/**
 * Hook that encapsulates [Name] behavior.
 * Manages state, keyboard interactions, and ARIA attributes.
 *
 * @param props - Configuration options
 * @returns Props to spread onto the element and state values
 *
 * @example
 * ```tsx
 * const { [name]Props, isActive } = use[Name]({ isDisabled: false });
 * return <div {...[name]Props} />;
 * ```
 */
export function use[Name](props: Use[Name]Props): Use[Name]Return {
  const { isDisabled = false } = props;

  // State management
  // ...

  // Event handlers
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (isDisabled) return;
      // Keyboard interaction logic per WAI-ARIA
    },
    [isDisabled]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (isDisabled) return;
      // Click logic
    },
    [isDisabled]
  );

  return {
    [name]Props: {
      role: '[aria-role]',
      tabIndex: isDisabled ? -1 : 0,
      'aria-disabled': isDisabled || undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    // ... state values
  };
}
```

### 2.4 Primitive Test — `packages/primitives/src/[name]/[Name].test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { [Name]Primitive } from './[Name]';

expect.extend(toHaveNoViolations);

describe('[Name]Primitive', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<[Name]Primitive>Content</[Name]Primitive>);
      expect(screen.getByRole('[role]')).toBeInTheDocument();
    });

    it('renders children', () => {
      render(<[Name]Primitive>Test Content</[Name]Primitive>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('handles click events', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<[Name]Primitive onClick={onClick}>Content</[Name]Primitive>);
      await user.click(screen.getByRole('[role]'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not respond when disabled', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<[Name]Primitive isDisabled onClick={onClick}>Content</[Name]Primitive>);
      await user.click(screen.getByRole('[role]'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('keyboard', () => {
    it('is focusable via Tab', async () => {
      const user = userEvent.setup();
      render(<[Name]Primitive>Content</[Name]Primitive>);
      await user.tab();
      expect(screen.getByRole('[role]')).toHaveFocus();
    });

    it('is not focusable when disabled', async () => {
      const user = userEvent.setup();
      render(<[Name]Primitive isDisabled>Content</[Name]Primitive>);
      await user.tab();
      expect(screen.getByRole('[role]')).not.toHaveFocus();
    });

    // Add component-specific keyboard tests
    // e.g., Enter/Space to activate, Arrow keys to navigate
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<[Name]Primitive>Content</[Name]Primitive>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has correct ARIA role', () => {
      render(<[Name]Primitive>Content</[Name]Primitive>);
      expect(screen.getByRole('[role]')).toBeInTheDocument();
    });

    it('has aria-disabled when disabled', () => {
      render(<[Name]Primitive isDisabled>Content</[Name]Primitive>);
      expect(screen.getByRole('[role]')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to DOM element', () => {
      const ref = vi.fn();
      render(<[Name]Primitive ref={ref}>Content</[Name]Primitive>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });
});
```

### 2.5 Primitive Index — `packages/primitives/src/[name]/index.ts`

```typescript
export { [Name]Primitive } from './[Name]';
export { use[Name] } from './use[Name]';
export type {
  [Name]Props,
  Use[Name]Props,
  Use[Name]Return,
} from './[Name].types';
```

### 2.6 Styled Component — `components/react/[name]/[Name].tsx`

```tsx
import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { use[Name] } from '@ds0/primitives';
import { cn } from '@/lib/utils';
import type { Styled[Name]Props } from '@ds0/primitives';

const [name]Variants = cva(
  // Base classes
  '[base tailwind classes]',
  {
    variants: {
      variant: {
        // Define per component
      },
      size: {
        sm: '[small classes]',
        md: '[medium classes]',
        lg: '[large classes]',
      },
    },
    defaultVariants: {
      variant: 'primary', // adjust per component
      size: 'md',
    },
  }
);

/**
 * Styled [Name] component.
 * Built on the headless [Name] primitive with Tailwind CSS styling.
 *
 * @example
 * ```tsx
 * <[Name] variant="primary" size="md">
 *   Content
 * </[Name]>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/[name] | Documentation}
 */
const [Name] = forwardRef<HTML[Element]Element, Styled[Name]Props>(
  ({ className, variant, size, children, ...props }, ref) => {
    const { [name]Props } = use[Name](props);

    return (
      <[element]
        ref={ref}
        className={cn([name]Variants({ variant, size }), className)}
        {...[name]Props}
      >
        {children}
      </[element]>
    );
  }
);

[Name].displayName = '[Name]';

export { [Name], [name]Variants };
export type { Styled[Name]Props as [Name]Props };
```

### 2.7 Stories — `components/react/[name]/[Name].stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { [Name] } from './[Name]';

const meta: Meta<typeof [Name]> = {
  title: 'Components/[Category]/[Name]',
  component: [Name],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [/* variant options */],
      description: 'The visual style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof [Name]>;

export const Default: Story = {
  args: {
    children: '[Name]',
  },
};

// One story per variant
// One story per size
// One story per state (disabled, loading, etc.)
// One composition story showing real-world usage
```

### 2.8 Styled Test — `components/react/[name]/[Name].test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { [Name] } from './[Name]';

expect.extend(toHaveNoViolations);

describe('[Name] (Styled)', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<[Name]>Content</[Name]>);
      expect(screen.getByRole('[role]')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
      const { container } = render(<[Name] variant="primary">Content</[Name]>);
      // Verify correct Tailwind classes are applied
    });

    it('applies size classes', () => {
      const { container } = render(<[Name] size="lg">Content</[Name]>);
      // Verify correct size classes
    });

    it('merges custom className', () => {
      render(<[Name] className="custom-class">Content</[Name]>);
      expect(screen.getByRole('[role]')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<[Name]>Content</[Name]>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

### 2.9 Styled Index — `components/react/[name]/index.ts`

```typescript
export { [Name], [name]Variants } from './[Name]';
export type { [Name]Props } from './[Name]';
```

### 2.10 Web Component — `components/web/[name]/[name]-element.ts`

```typescript
/**
 * DS0 [Name] Web Component.
 * Framework-agnostic custom element wrapping the [Name] primitive behavior.
 *
 * @example
 * ```html
 * <ds0-[name] variant="primary" size="md">
 *   Content
 * </ds0-[name]>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/[name] | Documentation}
 */
class DS0[Name] extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['variant', 'size', 'disabled'];
  }

  private _variant: string = 'primary';
  private _size: string = 'md';
  private _disabled: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
    this.addEventListeners();
  }

  disconnectedCallback(): void {
    this.removeEventListeners();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case 'variant':
        this._variant = newValue;
        break;
      case 'size':
        this._size = newValue;
        break;
      case 'disabled':
        this._disabled = newValue !== null;
        break;
    }
    this.render();
  }

  private addEventListeners(): void {
    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('click', this.handleClick);
  }

  private removeEventListeners(): void {
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('click', this.handleClick);
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this._disabled) return;
    // Keyboard interaction logic matching primitive
  };

  private handleClick = (event: MouseEvent): void => {
    if (this._disabled) return;
    // Click logic
  };

  private render(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
        }
        /* Styles using CSS custom properties from @ds0/tokens/css */
        /* Map variant/size to the correct token variables */
      </style>
      <slot></slot>
    `;

    // Set ARIA attributes on host
    this.setAttribute('role', '[role]');
    this.setAttribute('tabindex', this._disabled ? '-1' : '0');
    if (this._disabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }
}

customElements.define('ds0-[name]', DS0[Name]);

export { DS0[Name] };
```

### 2.11 Web Component Index — `components/web/[name]/index.ts`

```typescript
export { DS0[Name] } from './[name]-element';
```

### 2.12 React Native Component — `components/native/[name]/[Name].tsx`

```tsx
import React, { forwardRef } from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';
import { styled } from 'nativewind';

import { use[Name] } from '@ds0/primitives';
import type { Styled[Name]Props } from '@ds0/primitives';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

/**
 * React Native [Name] component.
 * Uses NativeWind for styling consistency with the web version.
 *
 * @example
 * ```tsx
 * <[Name] variant="primary" size="md">
 *   Content
 * </[Name]>
 * ```
 */
const [Name] = forwardRef<React.ElementRef<typeof Pressable>, Styled[Name]Props>(
  ({ variant = 'primary', size = 'md', children, ...props }, ref) => {
    const { [name]Props } = use[Name](props);

    return (
      <StyledPressable
        ref={ref}
        className={/* NativeWind classes matching web variant */}
        accessibilityRole="[role]"
        accessibilityState={{ disabled: props.isDisabled }}
        {...[name]Props}
      >
        <StyledText className={/* text classes */}>
          {children}
        </StyledText>
      </StyledPressable>
    );
  }
);

[Name].displayName = '[Name]';

export { [Name] };
```

### 2.13 React Native Test — `components/native/[name]/[Name].test.tsx`

```tsx
import { render, screen } from '@testing-library/react-native';

import { [Name] } from './[Name]';

describe('[Name] (Native)', () => {
  it('renders with default props', () => {
    render(<[Name]>Content</[Name]>);
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('has correct accessibility role', () => {
    render(<[Name]>Content</[Name]>);
    expect(screen.getByRole('[role]')).toBeTruthy();
  });

  it('handles disabled state', () => {
    render(<[Name] isDisabled>Content</[Name]>);
    expect(screen.getByRole('[role]')).toBeDisabled();
  });
});
```

### 2.14 React Native Index — `components/native/[name]/index.ts`

```typescript
export { [Name] } from './[Name]';
```

### 2.15 AI Manifest — `packages/ai/manifests/[name].manifest.yaml`

```yaml
name: [Name]
category: [Actions | Data Input | Data Display | Feedback | Layout | Navigation | Overlay | Typography]
description: [One clear sentence: what this component does]

use_when:
  - [Specific scenario 1]
  - [Specific scenario 2]
  - [Specific scenario 3]

do_not_use_when:
  - [Anti-pattern 1] → use [Alternative] instead
  - [Anti-pattern 2] → use [Alternative] instead

variants:
  [variant_name]:
    intent: [What this variant communicates to the user]
    example: "[Brief usage example]"

props:
  [prop_name]:
    type: [TypeScript type]
    default: [default value]
    description: [What this prop controls]

decision_tree:
  - condition: [Question to determine if this component is right]
    yes: [Answer or next condition]
    no:
      - condition: [Follow-up question]
        yes: [Answer]
        no: [Alternative component recommendation]

accessibility:
  role: [ARIA role]
  keyboard:
    - key: [Key name]
      action: [What happens]
  screen_reader:
    - [What is announced and when]
  requirements:
    - [Specific a11y requirement]

related_components:
  [ComponentName]: [When to use this instead]

composition:
  - pattern: [Common composition pattern name]
    example: |
      <[Name]>
        <[SubComponent] />
      </[Name]>

tokens_used:
  - [token.path] — [why this token is used]

figma_component: [URL to Figma component]
storybook_path: /docs/components-[category]-[name]
```

### 2.16 Documentation — `docs/content/components/[name].mdx`

```mdx
---
title: [Name]
description: [One sentence description matching manifest]
---

import { [Name] } from '@/components/react/[name]';
import { ComponentPreview } from '@/components/docs/ComponentPreview';

## Overview

[One paragraph: what this component does, the problem it solves, and the most common use case.]

## Usage

<ComponentPreview>
  <[Name]>[Default content]</[Name]>
</ComponentPreview>

```tsx
import { [Name] } from '@ds0/react/[name]';

export function Example() {
  return <[Name]>[Default content]</[Name]>;
}
```

## Variants

[One subsection per variant with preview and code]

## Sizes

[One subsection per size with preview and code]

## States

[Disabled, loading, error, etc.]

## Composition

[Examples of this component used with other components]

## Accessibility

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | [What happens] |
| `Enter` | [What happens] |
| `Space` | [What happens] |
| `Escape` | [What happens] |

### Screen Reader

[What is announced and when]

### ARIA

[Required ARIA attributes and their values]

## API Reference

### Props

[Auto-generated from types — or manually listed]

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | The visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size |

## AI Decision Guide

**Use [Name] when:**
[Bullet list from manifest use_when]

**Don't use [Name] when:**
[Bullet list from manifest do_not_use_when with alternatives]

## Related Components

[Links to related components with brief rationale]
```

### 2.17 Figma Code Connect — `figma/[name].figma.ts`

```typescript
import figma from '@figma/code-connect';

/**
 * Maps the Figma [Name] component to the DS0 React implementation.
 * When a developer inspects this component in Figma, they see real DS0 code.
 */
figma.connect('https://figma.com/file/[FILE_ID]/[Name]', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      // Map all Figma variant values to code values
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    label: figma.string('Label'),
    disabled: figma.boolean('Disabled'),
  },
  example: (props) => (
    <[Name]
      variant={props.variant}
      size={props.size}
      disabled={props.disabled}
    >
      {props.label}
    </[Name]>
  ),
});
```

## 3. Validation Checklist

After generating all 17 files, verify:

- [ ] All 17 files exist at the correct paths
- [ ] All files follow naming conventions from CONVENTIONS.md
- [ ] Primitive has no styling imports
- [ ] Styled component uses `cva` + `cn()` pattern
- [ ] All variants defined in manifest match variants in `cva`
- [ ] All props have JSDoc comments
- [ ] All components have `displayName`
- [ ] All components use `forwardRef`
- [ ] Tests cover: rendering, interactions, keyboard, accessibility, ref forwarding
- [ ] Stories cover: default, all variants, all sizes, all states, one composition
- [ ] Manifest has: use_when, do_not_use_when, decision_tree, accessibility
- [ ] Web Component uses `ds0-` prefix
- [ ] Web Component uses CSS custom properties (not Tailwind)
- [ ] React Native component uses NativeWind
- [ ] Documentation follows the exact MDX structure
- [ ] Figma mapping covers all variants and props
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm lint` passes

## 4. Compound Component Pattern

Some components have sub-components (Select, Dialog, Tabs, etc.). For these:

### File Structure Extension

```
packages/primitives/src/select/
├── Select.tsx               # Root provider component
├── SelectTrigger.tsx        # Trigger sub-component
├── SelectContent.tsx        # Content/dropdown sub-component
├── SelectItem.tsx           # Individual item sub-component
├── Select.types.ts          # All interfaces (root + sub-components)
├── useSelect.ts             # Root state management hook
├── SelectContext.ts         # React context for sub-component communication
├── Select.test.tsx          # Tests for the composed whole
└── index.ts                 # Exports everything

components/react/select/
├── Select.tsx               # Styled root
├── SelectTrigger.tsx        # Styled trigger
├── SelectContent.tsx        # Styled content
├── SelectItem.tsx           # Styled item
├── Select.stories.tsx       # Stories showing composed usage
├── Select.test.tsx          # Integration tests
└── index.ts                 # Exports everything
```

### Context Pattern

```typescript
// packages/primitives/src/select/SelectContext.ts
import { createContext, useContext } from 'react';

interface SelectContextValue {
  isOpen: boolean;
  selectedValue: string | undefined;
  onSelect: (value: string) => void;
  onOpenChange: (open: boolean) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext(): SelectContextValue {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      'DS0: Select sub-components must be used within a <Select> parent. ' +
      'See https://ds0.systems/docs/components/select'
    );
  }
  return context;
}

export { SelectContext };
```

### Compound Export Pattern

```typescript
// components/react/select/index.ts
import { Select as SelectRoot } from './Select';
import { SelectTrigger } from './SelectTrigger';
import { SelectContent } from './SelectContent';
import { SelectItem } from './SelectItem';

const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
});

export { Select, SelectTrigger, SelectContent, SelectItem };
```
