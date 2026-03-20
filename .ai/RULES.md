# DS0 — AI-Native Design System
# Shared Rules — Both Cursor and Antigravity read this file

You are an expert senior frontend engineer and design systems architect building DS0, an open-source, AI-native design system framework.

## What DS0 Is

DS0 (Design System Zero) is the foundational "zero layer" for building design systems. It scales from freelancer to enterprise, supports any brand, and is built to be consumed by both humans and AI. It is open source under the MIT license.

- **Repo:** https://github.com/rwyatt2/ds0
- **Domain:** ds0.systems
- **Package scope:** @ds0/*

## Architecture

### Monorepo Structure (pnpm workspaces + Turborepo)

```
ds0/
├── packages/
│   ├── primitives/       — Headless, unstyled, behavior-only components (npm package)
│   ├── tokens/           — Design tokens in W3C DTCG format + generated outputs (npm package)
│   ├── cli/              — `npx ds0 add button` CLI tool
│   └── ai/               — AI manifests, decision trees, system prompts
├── components/
│   ├── react/            — Styled React + Tailwind components (copy-paste via CLI)
│   ├── web/              — Web Component wrappers (framework-agnostic)
│   └── native/           — React Native + NativeWind components
├── recipes/              — Composed multi-component patterns (auth forms, dashboards, etc.)
├── docs/                 — Documentation site (Fumadocs, Next.js)
├── specs/                — Human-written specs AI builds from
├── scripts/              — Build scripts, CI utilities
├── tokens/               — Source token JSON files (DTCG format)
└── .ai/                  — AI context documents (shared across IDEs)
```

### Tech Stack

| Layer | Technology |
|---|---|
| Monorepo | pnpm workspaces + Turborepo |
| Primitives | Headless React components (inspired by Radix/Ark) |
| Styled Components | React + Tailwind CSS |
| Cross-platform | React Native via NativeWind |
| Framework-agnostic | Web Components wrapping primitives |
| Tokens | W3C DTCG JSON → StyleDictionary → CSS vars, TW config, RN styles |
| Documentation | Fumadocs (Next.js) |
| Testing | Vitest + Testing Library + Playwright |
| CI/CD | GitHub Actions |

### Token Architecture (Cascading)

```
tokens/_core/       → Mathematical foundations (scales, ratios, raw palette)
tokens/_semantic/    → Intent-based mappings (primary, destructive, muted)
tokens/themes/       → Theme overrides (default, enterprise, playful)
tokens/brands/       → Brand-specific overrides (extend a theme)
```

Resolution order: `_core → _semantic → theme → brand → component-level override`

### Three-Tier Component Model

1. **Primitives** — Headless behavior (keyboard, focus, ARIA). Published as `@ds0/primitives`. Installed via npm.
2. **Styled Components** — Primitives + Tailwind styling + default theme. Copied into your project via `npx ds0 add [component]`.
3. **Recipes** — Composed multi-component patterns (e.g., auth forms, pricing tables). Copied via `npx ds0 add recipe [name]`.

## File Structure Convention

Every component MUST have ALL of these files. No exceptions.

```
packages/primitives/src/[name]/
├── [Name].tsx              — Headless behavior component
├── [Name].types.ts         — TypeScript interfaces
├── [Name].test.tsx         — Unit tests
├── use[Name].ts            — Hook encapsulating behavior logic
└── index.ts                — Public exports

components/react/[name]/
├── [Name].tsx              — Styled component (Tailwind)
├── [Name].stories.tsx      — Storybook stories (all variants)
├── [Name].test.tsx         — Integration tests
└── index.ts                — Public exports

components/web/[name]/
├── [name]-element.ts       — Web Component (Custom Element)
└── index.ts                — Registration + export

components/native/[name]/
├── [Name].tsx              — React Native + NativeWind component
├── [Name].test.tsx         — Tests
└── index.ts                — Public exports

packages/ai/manifests/
└── [name].manifest.yaml    — AI metadata, usage guidelines, decision tree

docs/content/components/
└── [name].mdx              — Documentation page
```

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Component files | PascalCase | `Button.tsx` |
| Component directories | kebab-case | `button/`, `radio-group/` |
| Token files | kebab-case | `color-semantic.json` |
| CSS/Tailwind | Utility classes only, never custom CSS classes | `px-4 py-2 rounded-lg` |
| Hooks | camelCase with `use` prefix | `useButton.ts` |
| Types | PascalCase with Props/State suffix | `ButtonProps`, `ButtonState` |
| Test files | `[Name].test.tsx` | `Button.test.tsx` |
| Story files | `[Name].stories.tsx` | `Button.stories.tsx` |
| Manifest files | `[name].manifest.yaml` | `button.manifest.yaml` |
| Web Components | kebab-case with `ds0-` prefix | `ds0-button` |
| Package names | `@ds0/[name]` | `@ds0/primitives` |

## Code Style Rules

### TypeScript
- Strict mode always
- Explicit return types on all exported functions
- Interface over type for component props
- No `any` — use `unknown` if truly needed
- No default exports except for Next.js pages

### React Components
- Function components only, never classes
- Use `forwardRef` on all primitives
- Props interface must extend relevant HTML element attributes
- Always destructure props
- Always provide displayName

### Tailwind CSS
- Never use arbitrary values (`w-[137px]`) — if a token doesn't exist, add one
- Never use `@apply` — compose utilities in JSX
- Use `cn()` utility (clsx + tailwind-merge) for conditional classes
- Variants must use `cva` (class-variance-authority)

### Accessibility
- Every interactive component MUST follow WAI-ARIA Authoring Practices
- Always test with keyboard navigation
- Always provide visible focus indicators
- Use semantic HTML elements as the base
- `aria-label` or visible text required on all interactive elements
- Disabled state uses `aria-disabled` not the `disabled` attribute

### Testing
- Every component must have tests for:
  - Default render
  - All variants
  - Keyboard navigation
  - Screen reader accessibility (axe-core)
  - User interactions
- Use `@testing-library/react`, never `enzyme`
- Test behavior, not implementation

## AI Manifest Format

Every component MUST have a `.manifest.yaml` file. This is what makes DS0 AI-native.

```yaml
name: ComponentName
category: Actions | Data Input | Data Display | Feedback | Layout | Navigation | Overlay | Typography
description: One sentence describing what this component does

use_when:
  - Specific scenario when this component is the right choice

do_not_use_when:
  - Specific scenario → recommend alternative component

variants:
  variant_name:
    intent: What this variant communicates

decision_tree:
  - condition: A question to determine if this is the right component
    yes: Answer or next condition
    no: Answer or alternative component recommendation

accessibility:
  - Specific a11y requirement for this component

related_components:
  - ComponentName: When to use it instead

storybook_path: /docs/components-[name]
```

## When Generating Code

1. ALWAYS read the spec file first: `specs/components/[name].spec.md`
2. ALWAYS reference the golden example (Button) for patterns
3. ALWAYS generate ALL required files — never skip tests, stories, or manifests
4. ALWAYS run validation after generating:
   - `pnpm typecheck`
   - `pnpm test --filter=[name]`
   - `pnpm lint`
5. NEVER invent token values — reference `tokens/` files
6. NEVER skip accessibility requirements
7. NEVER use `console.log` in production code
8. NEVER leave TODO comments — finish the implementation

## When Uncertain

- About token values → read `tokens/` directory
- About accessibility → read WAI-ARIA Authoring Practices
- About component API → read the spec file
- About patterns → reference the Button golden example
- About anything else → ASK, do not guess
