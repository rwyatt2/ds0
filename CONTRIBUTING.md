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
- **Figma Mapping** — `figma/<name>.figma.ts`
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

### Architecture reference

Read these before contributing a component:

- [`.ai/ARCHITECTURE.md`](.ai/ARCHITECTURE.md) — Overall system architecture
- [`.ai/CONVENTIONS.md`](.ai/CONVENTIONS.md) — Naming, coding, and style conventions
- [`.ai/component-anatomy.md`](.ai/component-anatomy.md) — Component structure patterns

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

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## Questions?

Open a [Discussion](https://github.com/rwyatt2/ds0/discussions) on GitHub. We're happy to help!
