# DS0 — The AI-Native Design System Framework

> **The zero layer. The foundation everything builds from.**

DS0 is an open-source design system framework that scales from freelancer to enterprise. It's built to be consumed by **humans and AI equally** — every component ships with machine-readable manifests, decision trees, and structured specs alongside the code.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Built with TypeScript](https://img.shields.io/badge/built%20with-TypeScript-3178C6.svg)](https://www.typescriptlang.org/)
[![Tokens: W3C DTCG](https://img.shields.io/badge/tokens-W3C%20DTCG-6d28d9.svg)](https://tr.designtokens.org/format/)

---

## ✨ Highlights

- **Headless primitives** — Accessible, unstyled React components (`@ds0/primitives`)
- **Styled layers** — Tailwind CSS + CVA styled components, ready to copy-paste via CLI
- **Cross-platform** — React, Web Components, and React Native (via NativeWind)
- **W3C DTCG tokens** — Full design token pipeline with themes and brand overrides
- **AI-native** — Every component includes YAML manifests and decision metadata for AI code generation
- **Multi-theme** — Ships with `default` and `enterprise` themes, plus a brand override system

---

## 🚀 Quick Start

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
│   ├── react/button/           #   → Styled React (Tailwind + CVA)
│   ├── web/button/             #   → Web Components (Custom Elements)
│   └── native/button/          #   → React Native (NativeWind)
├── docs/content/               # Component documentation (MDX)
├── figma/                      # Figma integration scripts
├── packages/
│   ├── primitives/             # @ds0/primitives — headless components
│   ├── tokens/                 # @ds0/tokens — generated token output
│   ├── cli/                    # @ds0/cli — component installer
│   └── ai/                     # @ds0/ai — manifests & decision trees
├── scripts/                    # Build & validation scripts
│   ├── build-tokens.mjs
│   ├── validate-manifests.mjs
│   └── sync-to-figma.mjs
├── specs/                      # Build specs & component specs
│   ├── phase-1-foundation.md
│   ├── phase-2-golden-component.md
│   └── components/button.spec.md
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

## 🧩 Components

Components follow a strict **four-layer anatomy**:

| Layer | Location | Description |
|-------|----------|-------------|
| **Primitive** | `packages/primitives/src/<name>/` | Headless hook + unstyled React component |
| **Styled React** | `components/react/<name>/` | Tailwind + CVA styled, Storybook stories |
| **Web Component** | `components/web/<name>/` | Framework-agnostic Custom Element |
| **React Native** | `components/native/<name>/` | NativeWind styled, mobile-ready |

### Available Components

| Component | Primitive | React | Web | Native | Docs |
|-----------|:---------:|:-----:|:---:|:------:|:----:|
| **Button** | ✅ | ✅ | ✅ | ✅ | ✅ |

> More components coming soon — Input, Card, Modal, and more.

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

- **`button.manifest.yaml`** — Structured metadata: props, variants, slots, accessibility rules, and usage guidance
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
| **Docs** | Storybook 10, MDX |
| **Linting** | ESLint, Prettier |
| **CI/CD** | GitHub Actions |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-component`)
3. Follow the conventions in `.ai/CONVENTIONS.md`
4. Use the component spec template in `specs/COMPONENT_SPEC_TEMPLATE.md`
5. Ensure `pnpm validate` passes with zero errors
6. Open a Pull Request

---

## 📄 License

MIT © [DS0 Contributors](https://github.com/rwyatt2/ds0/graphs/contributors)
