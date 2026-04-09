# Contributing to DS0

Thank you for your interest in contributing to DS0! This guide will help you get started.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Adding a Component](#adding-a-component)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Code of Conduct](#code-of-conduct)

---

## Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | `≥ 20.0.0` |
| pnpm | `≥ 9.0.0` |

### Setup

```bash
# Fork and clone
git clone https://github.com/<your-username>/ds0.git
cd ds0

# Install dependencies
pnpm install

# Build tokens (required before anything else)
pnpm build:tokens

# Start Storybook for visual development
pnpm storybook
```

### Verify your setup

```bash
pnpm validate
```

This runs `typecheck`, `lint`, and `test` in sequence. All three must pass.

---

## Development Workflow

### Branch naming

```
feat/<component-name>         — new component or feature
fix/<component-name>-<issue>  — bug fix
docs/<topic>                  — documentation changes
tokens/<change>               — token additions or modifications
chore/<task>                  — maintenance, dependencies, CI
```

### Key scripts

| Command | When to use |
|---------|-------------|
| `pnpm storybook` | Visual component development |
| `pnpm test` | Run all tests |
| `pnpm typecheck` | Check TypeScript types |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm format` | Format with Prettier |
| `pnpm validate` | Run all checks (pre-PR) |

---

## Adding a Component

DS0 components follow a strict **four-layer anatomy**. Every new component needs files across:

1. **Primitive** — `packages/primitives/src/<name>/` — Headless hook + unstyled component
2. **Styled React** — `components/react/<name>/` — Tailwind + CVA styled component
3. **Web Component** — `components/web/<name>/` — Custom Element
4. **React Native** — `components/native/<name>/` — NativeWind styled

Plus supporting files:

- **AI Manifest** — `packages/ai/manifests/<name>.manifest.yaml`
- **Documentation** — `docs/content/components/<name>.mdx`
- **Tests** — Co-located `<Name>.test.tsx` files in each styled layer

### Step-by-step

1. **Create a spec** — Copy `specs/COMPONENT_SPEC_TEMPLATE.md` to `specs/components/<name>.spec.md` and fill it out
2. **Build the primitive** — Start with the headless hook and unstyled component
3. **Build the styled layers** — React, Web Component, React Native
4. **Write the manifest** — Follow the YAML schema in existing manifests
5. **Add documentation** — MDX page with usage examples
6. **Write tests** — Rendering, interactions, keyboard, and accessibility (jest-axe)
7. **Add stories** — Storybook stories for all variants
8. **Update the registry** — Run `pnpm generate:registry`

### Using Icons

DS0 uses [Lucide React](https://lucide.dev/) as its recommended icon library. When building components that accept icons:

```tsx
// Accept ReactNode for icon props
interface MyComponentProps {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

// Render icons alongside content
{leftIcon && <span className="ds0-icon">{leftIcon}</span>}
```

See the [README Icons section](README.md#-icons) for sizing guidelines.

### Architecture reference

Read these before contributing a component:

- [`.ai/ARCHITECTURE.md`](.ai/ARCHITECTURE.md) — Overall system architecture
- [`.ai/CONVENTIONS.md`](.ai/CONVENTIONS.md) — Naming, coding, and style conventions
- [`.ai/component-anatomy.md`](.ai/component-anatomy.md) — Component structure patterns

### Accessibility Testing

All components must meet **WCAG 2.1 AA** standards. Follow this checklist for every component PR:

#### Contrast Requirements

- All text must have a **4.5:1** contrast ratio against its background (AA normal text)
- Large text (18px+ or 14px+ bold) requires **3:1** (AA large text)
- Interactive component boundaries require **3:1** against adjacent colors
- Use browser DevTools or [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify

#### tabIndex Strategy

- **Never use positive `tabIndex` values** (e.g., `tabIndex={1}`)
- Use `tabIndex={0}` for custom interactive elements that need to be in the tab order
- Use `tabIndex={-1}` for elements that should be focusable programmatically but not via `Tab`
- Native `<button>`, `<a>`, `<input>` elements are naturally in the tab order — don't add `tabIndex`
- For roving tabindex patterns (e.g., ToggleGroup, RadioGroup), only the active item gets `tabIndex={0}`

#### Screen Reader Testing

Before merging, verify with at least one screen reader:

1. **VoiceOver (macOS)**: `Cmd + F5` to toggle — test component roles, states, and labels
2. **NVDA (Windows)**: Free download — test with Firefox for best compatibility
3. **Checklist**:
   - [ ] Component role is announced correctly (button, dialog, slider, etc.)
   - [ ] State changes are announced (expanded, collapsed, checked, selected)
   - [ ] Labels are readable and descriptive
   - [ ] Error messages are announced via `aria-live`
   - [ ] Focus moves logically and traps correctly in modals

#### Forced Colors / High-Contrast Mode

- Test with Windows High Contrast Mode (`Settings > Accessibility > Contrast Themes`)
- Ensure borders and focus indicators use `currentColor` or system colors
- Avoid conveying meaning through color alone — always pair with text or icons

---

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(button): add loading state variant
fix(select): correct keyboard navigation for disabled items
docs(dialog): add accessibility section
tokens: add elevation scale
chore: update vitest to v4
test(button): add screen reader announcement tests
```

### Scopes

Use the component name as scope. For cross-cutting changes, use:

- `tokens` — Token changes
- `cli` — CLI changes
- `docs` — Documentation changes
- No scope for root-level chore changes

---

## Pull Request Process

1. **Ensure `pnpm validate` passes** — TypeScript, lint, and all tests must be green
2. **Fill out the PR template** — Description, type of change, checklist
3. **Include screenshots** — For any visual changes
4. **Update manifests** — If component behavior or API changed
5. **Update docs** — If the public API changed
6. **Keep PRs focused** — One component or feature per PR

### PR checklist

- [ ] `pnpm validate` passes
- [ ] Tests added for new functionality
- [ ] Accessibility tested (jest-axe, keyboard navigation)
- [ ] AI manifest updated (if applicable)
- [ ] Documentation updated (if applicable)
- [ ] No `any` types, no `@ts-ignore`

---

## Versioning & Releases

DS0 uses [Changesets](https://github.com/changesets/changesets) for versioning and changelogs.

### Adding a Changeset

When your PR includes a user-facing change:

```bash
npx changeset
```

This creates a markdown file in `.changeset/` describing the change. Follow the prompts to select:
- **Package(s)** affected (`@ds0/primitives`, `@ds0/tokens`, etc.)
- **Bump type** (`patch`, `minor`, `major`)
- **Summary** of change (appears in the changelog)

### Linked Packages

`@ds0/primitives` and `@ds0/tokens` are linked — a version bump in one triggers a coordinated bump in the other.

### Release Process (Maintainers)

1. Merge the changeset PR created by the Changeset bot
2. `npx changeset version` — bumps versions and updates changelogs
3. `npx changeset publish` — publishes to npm
4. Push version tags to git

### Version Conventions

| Type | When |
|------|------|
| `patch` | Bug fixes, doc updates, internal refactors |
| `minor` | New components, new props, new variants |
| `major` | Breaking API changes (see [MIGRATION.md](MIGRATION.md)) |

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## Questions?

Open a [Discussion](https://github.com/rwyatt2/ds0/discussions) on GitHub. We're happy to help!
