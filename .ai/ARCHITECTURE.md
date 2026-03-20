# DS0 Architecture

> This document is the canonical reference for all architectural decisions in DS0.
> AI agents: read this file in full before making any structural decisions.

## 1. System Overview

DS0 is a **design system framework** — not a single design system, but a system for generating and customizing design systems. It operates at three levels:

1. **Primitives** — Headless, unstyled behavioral components with full accessibility
2. **Styled Components** — Opinionated Tailwind-styled components using primitives
3. **Recipes** — Composed multi-component patterns solving common UX problems

Users can adopt at any level. A freelancer grabs styled components. An enterprise uses primitives with their own theme. AI recommends at any tier based on context.

## 2. Monorepo Structure

```
ds0/
│
├── .ai/                    # AI context documents (you are reading one now)
├── .github/                # CI/CD workflows
├── .agents/                # Antigravity workflows
│
├── tokens/                 # SOURCE OF TRUTH for design tokens
│   ├── _core/              # Mathematical foundations
│   │   ├── color.json      # Raw color palette (no semantic meaning)
│   │   ├── spacing.json    # Spacing scale (4px base unit)
│   │   ├── typography.json # Font families, weights, size scale
│   │   ├── radius.json     # Border radius scale
│   │   ├── elevation.json  # Shadow definitions
│   │   └── motion.json     # Duration, easing curves
│   ├── _semantic/          # Intent-based mappings
│   │   ├── color.json      # primary, secondary, destructive, muted, etc.
│   │   └── spacing.json    # compact, comfortable, spacious density modes
│   ├── themes/             # Theme overrides
│   │   ├── default.json    # The out-of-the-box DS0 theme
│   │   └── enterprise.json # Denser, more neutral alternative
│   └── brands/             # Brand-specific overrides
│       └── _template.json  # Starting point for new brands
│
├── packages/
│   ├── primitives/         # @ds0/primitives — npm package
│   │   ├── src/
│   │   │   ├── button/
│   │   │   ├── dialog/
│   │   │   ├── select/
│   │   │   └── [component]/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── tokens/             # @ds0/tokens — npm package (GENERATED, do not hand-edit)
│   │   ├── css/            # CSS custom properties
│   │   ├── tailwind/       # tailwind.config.ts preset
│   │   ├── react-native/   # RN StyleSheet objects
│   │   ├── json/           # Flat resolved JSON (for tooling)
│   │   └── package.json
│   │
│   ├── cli/                # @ds0/cli — `npx ds0 add button`
│   │   ├── src/
│   │   │   ├── commands/
│   │   │   │   ├── init.ts
│   │   │   │   ├── add.ts
│   │   │   │   ├── diff.ts
│   │   │   │   └── doctor.ts
│   │   │   └── registry.ts
│   │   └── package.json
│   │
│   └── ai/                 # @ds0/ai — AI context package
│       ├── manifests/      # Per-component AI metadata
│       ├── decision-trees/ # Category-level decision trees
│       ├── patterns/       # UX pattern recommendations
│       ├── llm-system-prompt.md
│       └── package.json
│
├── components/
│   ├── react/              # Styled React components (copy-paste via CLI)
│   │   ├── button/
│   │   ├── dialog/
│   │   └── [component]/
│   ├── web/                # Web Component wrappers
│   │   ├── button/
│   │   └── [component]/
│   └── native/             # React Native components
│       ├── button/
│       └── [component]/
│
├── recipes/                # Composed patterns
│   ├── auth-form/
│   ├── settings-panel/
│   ├── data-table/
│   └── [recipe]/
│
├── docs/                   # Documentation site
│   ├── app/                # Next.js app directory
│   ├── content/
│   │   ├── components/     # Auto-generated from manifests + source
│   │   ├── tokens/         # Token visualization
│   │   ├── patterns/       # Pattern documentation
│   │   └── guides/         # Getting started, theming, AI usage
│   └── package.json
│
│
├── scripts/
│   ├── build-tokens.ts     # StyleDictionary build pipeline
│   ├── generate-registry.ts # Build registry.json from component files
│   └── validate-manifests.ts # Ensure all manifests are complete
│
├── specs/                  # Human-written specs for AI to build from
│   ├── phase-1-foundation.md
│   ├── phase-2-golden-component.md
│   ├── components/
│   │   ├── button.spec.md
│   │   └── [component].spec.md
│   └── recipes/
│       └── [recipe].spec.md
│
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.base.json
└── README.md
```

## 3. Design Token Pipeline

### 3.1 Token Format

All source tokens use the **W3C Design Token Community Group (DTCG)** format:

```json
{
  "color": {
    "blue": {
      "500": {
        "$type": "color",
        "$value": "#3B82F6",
        "$description": "Primary blue, used as the base for primary semantic color"
      }
    }
  }
}
```

### 3.2 Build Pipeline

```
tokens/*.json (DTCG)
       │
       ▼
 StyleDictionary
       │
       ├──► packages/tokens/css/variables.css        (CSS custom properties)
       ├──► packages/tokens/tailwind/preset.ts       (Tailwind theme preset)
       ├──► packages/tokens/react-native/tokens.ts   (RN StyleSheet values)
       └──► packages/tokens/json/resolved.json       (Flat resolved values)
```

### 3.3 Token Resolution Order

When a component renders, tokens resolve through this cascade:

```
_core/color.json          →  blue.500 = #3B82F6
_semantic/color.json      →  primary = {color.blue.500}
themes/default.json       →  (no override, uses semantic)
brands/acme.json          →  primary = {color.indigo.600}  ← brand overrides
```

The consumer only references semantic tokens (`primary`, `destructive`, `muted`). They never reference core tokens directly in components.

## 4. Component Architecture

### 4.1 Primitive Layer

Primitives are **headless** — they manage:
- State (open/closed, selected, focused, disabled)
- Keyboard interactions (arrow keys, Enter, Escape, Tab)
- ARIA attributes (roles, labels, live regions)
- Focus management (trapping, restoration)

They expose behavior via **hooks** and **render-prop components**:

```tsx
// packages/primitives/src/button/useButton.ts
export function useButton(props: UseButtonProps): UseButtonReturn {
  // Manages disabled state, click handling, keyboard activation
  // Returns props to spread onto the rendered element
  return {
    buttonProps: {
      role: 'button',
      tabIndex: disabled ? -1 : 0,
      'aria-disabled': disabled || undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    isPressed,
    isFocused,
  };
}
```

Primitives NEVER import:
- Tailwind or any CSS
- Any visual styling
- Any theme or token values
- Any platform-specific code (DOM-only APIs are OK)

### 4.2 Styled Component Layer

Styled components compose a primitive + Tailwind utilities + tokens:

```tsx
// components/react/button/Button.tsx
import { useButton } from '@ds0/primitives';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent',
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
```

Styled components:
- ALWAYS use `cva` for variant management
- ALWAYS use `cn()` for class merging
- ALWAYS accept a `className` prop for consumer overrides
- ALWAYS forward refs
- NEVER hardcode color/spacing values — use Tailwind classes mapped to tokens

### 4.3 Web Component Layer

Web Components wrap the primitive logic for framework-agnostic consumption:

```typescript
// components/web/button/button-element.ts
class DS0Button extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled'];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    // Uses CSS custom properties from @ds0/tokens/css
    // Implements same keyboard/ARIA behavior as primitive
  }
}

customElements.define('ds0-button', DS0Button);
```

Web Components:
- ALWAYS use Shadow DOM for style encapsulation
- ALWAYS consume CSS custom properties from `@ds0/tokens/css`
- ALWAYS mirror the same ARIA behavior as the primitive
- ALWAYS support the same variants via HTML attributes

### 4.4 React Native Layer

React Native components use NativeWind (Tailwind for RN):

```tsx
// components/native/button/Button.tsx
import { useButton } from '@ds0/primitives';
import { Pressable, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

// Uses the same Tailwind classes as React web where possible
// Falls back to RN-specific utilities where needed
```

React Native components:
- ALWAYS use NativeWind for styling consistency with web
- ALWAYS use the same primitive hooks as web components
- ALWAYS handle platform-specific interactions (haptics, gestures)
- NEVER import from `react-dom`

## 5. Documentation Architecture

### 5.1 Framework

Fumadocs (Next.js-based) for:
- MDX content with live code examples
- Full-text search
- API documentation auto-generation
- Dark mode
- Versioning support

### 5.2 Content Generation

Documentation is **partially generated** from source files:

```
Source                          →  Generates
─────────────────────────────────────────────
component.manifest.yaml         →  Usage guidelines, do/don't, decision tree
component.types.ts              →  Props API table
component.stories.tsx           →  Live examples (embedded Storybook)
tokens/*.json                   →  Token reference pages
CHANGELOG.md                    →  Version history
```

Human-written content supplements the generated content:
- Getting started guides
- Theming tutorials
- Migration guides
- Design philosophy

### 5.3 AI Context Export

The docs site includes a downloadable **AI Context Pack**:

```
ds0-ai-context/
├── system-prompt.md          # Ready-to-paste LLM system prompt
├── component-registry.json   # All components with metadata
├── decision-trees.json       # All decision trees merged
├── token-reference.json      # All resolved token values
└── pattern-library.json      # All patterns with examples
```

This lets anyone using DS0 give their AI tool complete system knowledge in one file.

## 6. CLI Architecture

### 6.1 Commands

```bash
npx ds0 init                    # Scaffolds DS0 config in your project
npx ds0 add button              # Copies Button component into your project
npx ds0 add recipe auth-form    # Copies auth-form recipe
npx ds0 diff                    # Shows changes since you copied
npx ds0 doctor                  # Validates your DS0 setup
npx ds0 ai-context              # Exports AI context pack
```

### 6.2 Registry

The CLI reads from `registry.json`, which maps component names to files:

```json
{
  "components": {
    "button": {
      "name": "Button",
      "category": "Actions",
      "files": [
        "components/react/button/Button.tsx",
        "components/react/button/index.ts"
      ],
      "dependencies": ["@ds0/primitives"],
      "devDependencies": [],
      "registryDependencies": []
    }
  }
}
```

### 6.3 Init Process

`npx ds0 init` does:
1. Detects your framework (Next.js, Vite, Remix, etc.)
2. Installs `@ds0/primitives` and `@ds0/tokens`
3. Creates `ds0.config.ts` with your preferences
4. Adds the Tailwind preset to your `tailwind.config.ts`
5. Creates `lib/utils.ts` with the `cn()` helper
6. Creates `components/ds0/` directory for copied components

## 7. Testing Strategy

### 7.1 Layers

| Layer | Tool | What It Tests |
|---|---|---|
| Unit | Vitest + Testing Library | Individual component behavior |
| Accessibility | axe-core via Testing Library | ARIA compliance, contrast, roles |
| Visual | Playwright + screenshots | Rendering correctness, variant appearance |
| Integration | Playwright | Multi-component interactions |
| Token | Custom script | Token resolution, no undefined references |

### 7.2 Required Tests Per Component

Every component MUST have tests covering:

```typescript
describe('Button', () => {
  // Rendering
  it('renders with default props');
  it('renders all variants');
  it('renders all sizes');
  it('renders with custom className');

  // Behavior
  it('calls onClick when clicked');
  it('does not call onClick when disabled');
  it('activates on Enter key');
  it('activates on Space key');

  // Accessibility
  it('has no axe violations');
  it('has correct role');
  it('has correct aria-disabled when disabled');
  it('is focusable via Tab');
  it('is not focusable when disabled');

  // Ref forwarding
  it('forwards ref to DOM element');
});
```

## 8. CI/CD Pipeline

### 8.1 On Pull Request

```yaml
- Lint (ESLint + Prettier)
- Type check (tsc --noEmit)
- Unit tests (Vitest)
- Accessibility tests (axe-core)
- Build all packages
- Validate all manifests are complete
- Validate no token references are broken
```

### 8.2 On Merge to Main

```yaml
- All PR checks
- Visual regression tests (Playwright screenshots)
- Build documentation site
- Publish to npm (if version bumped)
- Deploy docs site
```

### 8.3 On Release

```yaml
- Publish packages to npm
- Generate changelog
- Create GitHub release
- Deploy docs site to production
- Notify (Discord/Twitter/etc.)
```

## 9. Decision Log

All significant architectural decisions are recorded here.

| # | Decision | Rationale | Date |
|---|---|---|---|
| 001 | pnpm + Turborepo for monorepo | pnpm is fastest, Turborepo caches builds. No runtime cost. | 2026-03-01 |
| 002 | W3C DTCG token format | Emerging standard, best tooling support via StyleDictionary | 2026-03-01 |
| 003 | Tailwind CSS for styled components | Best AI generation accuracy, utility classes map 1:1 to tokens | 2026-03-01 |
| 004 | Headless primitives + styled layer | Separation allows framework-agnostic behavior reuse | 2026-03-01 |
| 005 | Copy-paste via CLI (shadcn model) | Users own the code, full customization, no version lock-in | 2026-03-01 |
| 006 | AI manifests in YAML | Human-readable, AI-parseable, version-controllable | 2026-03-01 |
| 007 | MIT License | Maximum adoption, no friction for enterprise | 2026-03-01 |
| 008 | Fumadocs for documentation | Next.js based, MDX support, search, dark mode, free | 2026-03-01 |
| 009 | NativeWind for React Native | Same Tailwind classes as web, single mental model | 2026-03-01 |
