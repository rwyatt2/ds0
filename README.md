# DS0 — The AI-Native Design System Framework

> **The zero layer. The foundation everything builds from.**

DS0 is an open-source design system framework that scales from freelancer to enterprise. It's built to be consumed by **humans and AI equally** — every component ships with machine-readable manifests, decision trees, and structured specs alongside the code.

[![CI](https://github.com/rwyatt2/ds0/actions/workflows/ci.yml/badge.svg)](https://github.com/rwyatt2/ds0/actions/workflows/ci.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Built with TypeScript](https://img.shields.io/badge/built%20with-TypeScript-3178C6.svg)](https://www.typescriptlang.org/)
[![Tokens: W3C DTCG](https://img.shields.io/badge/tokens-W3C%20DTCG-6d28d9.svg)](https://tr.designtokens.org/format/)


---

## ✨ Highlights

- **39 components** — Fully built across four platform layers
- **Headless primitives** — Accessible, unstyled React components (`@ds0/primitives`)
- **Styled layers** — Tailwind CSS + CVA styled components, copy-paste or install via CLI
- **Cross-platform** — React, Web Components, and React Native (via NativeWind)
- **W3C DTCG tokens** — Full design token pipeline with themes and brand overrides
- **AI-native** — Every component includes YAML manifests and decision metadata for AI code generation
- **15 recipes** — Composable patterns like login forms, dashboards, and navigation
- **CLI tooling** — `@ds0/cli` to init projects, add components, and export AI context
- **Multi-theme** — Ships with `default` and `enterprise` themes, plus a brand override system

---

## 🚀 Quick Start

### Option A: Install via CLI (recommended)

```bash
# Initialize DS0 in your project
npx @ds0/cli init

# Add a component
npx @ds0/cli add button

# Add multiple components
npx @ds0/cli add button card dialog tabs
```

### Option B: Clone & develop

```bash
# Clone
git clone https://github.com/rwyatt2/ds0.git
cd ds0

# Install dependencies
pnpm install

# Build the token pipeline
pnpm build:tokens

# Launch Storybook
pnpm storybook
```

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | `≥ 20.0.0` |
| pnpm | `≥ 9.0.0` |

---

## 🏗️ Architecture

DS0 uses a **layered architecture** — each layer builds on the one below it:

```
┌─────────────────────────────────────────────────┐
│  Recipes (Composable UI Patterns)               │  ← Full experiences
├─────────────────────────────────────────────────┤
│  Styled Components (React / Web / Native)       │  ← What you ship
├─────────────────────────────────────────────────┤
│  Primitives (@ds0/primitives)                   │  ← Headless behavior + a11y
├─────────────────────────────────────────────────┤
│  Design Tokens (@ds0/tokens)                    │  ← Visual language
├─────────────────────────────────────────────────┤
│  AI Manifests (@ds0/ai)                         │  ← Machine context
└─────────────────────────────────────────────────┘
```

### Token Flow

```
tokens/ (source W3C DTCG JSON)
  → StyleDictionary build
    → packages/tokens/ (generated CSS, JS, JSON, Tailwind)
      → consumed by all component layers
```

Tokens are organized into three tiers:

| Tier | Path | Purpose |
|------|------|---------|
| **Core** | `tokens/_core/` | Raw scales — color palettes, spacing, typography, radius, elevation |
| **Semantic** | `tokens/_semantic/` | Intent-mapped aliases — `color.action.primary`, `spacing.component.gap` |
| **Theme** | `tokens/themes/` | Theme overrides — `default.json`, `enterprise.json` |

---

## 🧩 Components

Components follow a strict **four-layer anatomy**:

| Layer | Location | Description |
|-------|----------|-------------|
| **Primitive** | `packages/primitives/src/<name>/` | Headless hook + unstyled React component |
| **Styled React** | `components/react/<name>/` | Tailwind + CVA styled, Storybook stories |
| **Web Component** | `components/web/<name>/` | Framework-agnostic Custom Element |
| **React Native** | `components/native/<name>/` | NativeWind styled, mobile-ready |

### Available Components (39)

| Component | Primitive | React | Web | Native |
|-----------|:---------:|:-----:|:---:|:------:|
| **Accordion** | ✅ | ✅ | ✅ | ✅ |
| **Alert** | ✅ | ✅ | ✅ | ✅ |
| **Aspect Ratio** | ✅ | ✅ | ✅ | ✅ |
| **Avatar** | ✅ | ✅ | ✅ | ✅ |
| **Badge** | ✅ | ✅ | ✅ | ✅ |
| **Breadcrumb** | ✅ | ✅ | ✅ | ✅ |
| **Button** | ✅ | ✅ | ✅ | ✅ |
| **Card** | ✅ | ✅ | ✅ | ✅ |
| **Checkbox** | ✅ | ✅ | ✅ | ✅ |
| **Code** | ✅ | ✅ | ✅ | ✅ |
| **Container** | ✅ | ✅ | ✅ | ✅ |
| **Dialog** | ✅ | ✅ | ✅ | ✅ |
| **Divider** | ✅ | ✅ | ✅ | — |
| **Drawer** | ✅ | ✅ | ✅ | — |
| **Form** | ✅ | ✅ | ✅ | ✅ |
| **Grid** | ✅ | ✅ | ✅ | ✅ |
| **Heading** | ✅ | ✅ | ✅ | ✅ |
| **Icon Button** | ✅ | ✅ | ✅ | ✅ |
| **Label** | ✅ | ✅ | ✅ | ✅ |
| **Link** | ✅ | ✅ | ✅ | ✅ |
| **Pagination** | ✅ | ✅ | ✅ | ✅ |
| **Popover** | ✅ | ✅ | — | — |
| **Progress** | ✅ | ✅ | ✅ | ✅ |
| **Radio Group** | ✅ | ✅ | ✅ | ✅ |
| **Select** | ✅ | ✅ | — | — |
| **Skeleton** | ✅ | ✅ | ✅ | ✅ |
| **Slider** | ✅ | ✅ | ✅ | ✅ |
| **Spinner** | ✅ | ✅ | ✅ | ✅ |
| **Stack** | ✅ | ✅ | ✅ | ✅ |
| **Switch** | ✅ | ✅ | ✅ | ✅ |
| **Table** | ✅ | ✅ | ✅ | ✅ |
| **Tabs** | ✅ | ✅ | ✅ | ✅ |
| **Text** | ✅ | ✅ | ✅ | ✅ |
| **Text Area** | ✅ | ✅ | ✅ | ✅ |
| **Text Field** | ✅ | ✅ | ✅ | ✅ |
| **Toast** | ✅ | ✅ | ✅ | ✅ |
| **Toggle** | ✅ | ✅ | ✅ | ✅ |
| **Toggle Group** | ✅ | ✅ | ✅ | ✅ |
| **Tooltip** | ✅ | ✅ | —¹ | —² |

> ¹ **Web Component not available** — Popover, Select, and Tooltip rely on complex positioning logic that doesn't translate cleanly to Custom Elements. Tracked in [#web-component-gaps](https://github.com/rwyatt2/ds0/issues).
>
> ² **React Native not available** — Divider and Drawer lack native implementations. Tracked in [#native-gaps](https://github.com/rwyatt2/ds0/issues).

### Recipes (15)

Pre-built patterns that compose DS0 components into ready-to-use experiences:

| Recipe | Description |
|--------|-------------|
| **Account Settings** | User account management form |
| **Command Palette** | Keyboard-driven command interface |
| **Dashboard Layout** | Full dashboard shell with sidebar + header |
| **Dashboard Stats** | Metric cards with charts |
| **Data Table** | Sortable, filterable data table |
| **Empty State** | Placeholder for empty content areas |
| **Error Page** | 404/500 error pages |
| **Forgot Password Form** | Password reset flow |
| **Login Form** | Authentication form |
| **Navbar** | Top navigation bar |
| **Notification Settings** | Notification preference toggles |
| **Pricing Cards** | Pricing tier comparison |
| **Profile Settings** | User profile editor |
| **Sidebar Navigation** | Collapsible side navigation |
| **Signup Form** | Registration form |

---

## ⚠️ Known Limitations (v0.1.0)

This is the initial release. The following limitations are known and being tracked:

- **Web Components**: Popover, Select, and Tooltip do not have Web Component implementations
- **React Native**: Divider and Drawer do not have native implementations
- **Figma Library**: The `figma/` directory contains code-to-Figma property mappings, but no published Figma component library file yet
- **Recipe Tests**: The 15 recipes in `recipes/` do not have automated tests yet
- **Native Tests**: Native component tests use a stub runner and have not been validated at runtime

---

## 📁 Project Structure

```
ds0/
├── .ai/                        # AI context & architecture docs
│   ├── ARCHITECTURE.md
│   ├── CONVENTIONS.md
│   ├── RULES.md
│   ├── component-anatomy.md
│   └── token-schema.md
├── components/                 # Styled component layers
│   ├── react/<name>/           #   → Styled React (Tailwind + CVA)
│   ├── web/<name>/             #   → Web Components (Custom Elements)
│   └── native/<name>/          #   → React Native (NativeWind)
├── docs/                       # Documentation site (Next.js + Fumadocs)
├── figma/                      # Figma integration scripts
├── packages/
│   ├── primitives/             # @ds0/primitives — headless components
│   ├── tokens/                 # @ds0/tokens — generated token output
│   ├── cli/                    # @ds0/cli — component installer
│   └── ai/                     # @ds0/ai — manifests & decision trees
├── recipes/                    # Composable UI patterns
├── scripts/                    # Build & validation scripts
├── specs/                      # Build specs & component specs
├── tokens/                     # Source token files (W3C DTCG)
│   ├── _core/                  #   color, spacing, typography, radius, elevation
│   ├── _semantic/              #   color, spacing aliases
│   ├── themes/                 #   default, enterprise
│   └── brands/                 #   brand overrides
├── registry.json               # Component registry for CLI
├── turbo.json                  # Turborepo pipeline config
└── tailwind.config.ts          # Tailwind CSS configuration
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all packages (via Turborepo) |
| `pnpm build:tokens` | Generate tokens from source JSON via StyleDictionary |
| `pnpm dev` | Start dev servers across all packages |
| `pnpm storybook` | Launch Storybook on port 6006 |
| `pnpm test` | Run all tests (Vitest) |
| `pnpm typecheck` | TypeScript type checking across all packages |
| `pnpm lint` | Lint all packages (ESLint) |
| `pnpm format` | Format code (Prettier) |
| `pnpm validate` | Run typecheck + lint + test in sequence |
| `pnpm validate:manifests` | Validate AI manifest YAML files |
| `pnpm clean` | Clean all build outputs and `node_modules` |

---

## 🤖 AI-Native Design

DS0 is designed to be **consumed by AI agents** as easily as by developers. Every component includes:

- **`<name>.manifest.yaml`** — Structured metadata: props, variants, slots, accessibility rules, and usage guidance
- **`.ai/` context docs** — Architecture decisions, naming conventions, and component anatomy patterns
- **`specs/`** — Machine-readable build specifications that can drive code generation

This means an AI coding assistant can read the manifests and generate correct, accessible, theme-aware component usage without guessing.

---

## 🎨 Theming

DS0 ships with a flexible theming system:

```
tokens/themes/default.json     → Base theme
tokens/themes/enterprise.json  → Enterprise variant
tokens/brands/acme.json        → Brand-level overrides
```

Themes override semantic tokens, so switching themes changes the entire visual language without touching component code.

---

## 🛠️ Tech Stack

| Category | Tools |
|----------|-------|
| **Monorepo** | pnpm workspaces + Turborepo |
| **Language** | TypeScript 5.x |
| **Components** | React 19, Custom Elements, React Native |
| **Styling** | Tailwind CSS 4, CVA, clsx, tailwind-merge |
| **Tokens** | StyleDictionary 5 (W3C DTCG format) |
| **Testing** | Vitest, Testing Library, jest-axe |
| **Docs** | Fumadocs (Next.js), Storybook |
| **CLI** | Commander, Chalk, Ora |
| **Linting** | ESLint, Prettier |
| **CI/CD** | GitHub Actions |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-component`)
3. Follow the conventions in `.ai/CONVENTIONS.md`
4. Use the component spec template in `specs/COMPONENT_SPEC_TEMPLATE.md`
5. Ensure `pnpm validate` passes with zero errors
6. Open a Pull Request

Please note this project follows a [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 📄 License

MIT © [DS0 Contributors](https://github.com/rwyatt2/ds0/graphs/contributors)
