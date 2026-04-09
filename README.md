# DS0 — The AI-Native Design System Framework

> **The zero layer. The foundation everything builds from.**

DS0 is an open-source design system framework that scales from freelancer to enterprise. It's built to be consumed by **humans and AI equally** — every component ships with machine-readable manifests, decision trees, and structured specs alongside the code.

[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![built with TypeScript](https://img.shields.io/badge/built%20with-TypeScript-3178C6.svg)](https://www.typescriptlang.org/)
[![tokens: W3C DTCG](https://img.shields.io/badge/tokens-W3C%20DTCG-6d28d9.svg)](https://tr.designtokens.org/format/)
[![components: 95](https://img.shields.io/badge/components-95-10b981.svg)](#-components)
[![recipes: 17](https://img.shields.io/badge/recipes-17-f59e0b.svg)](#recipes-17)

---

## ✨ Highlights

- **95 components** — Fully built across four platform layers
- **Headless primitives** — Accessible, unstyled React components (`@ds0/primitives`)
- **Styled layers** — Tailwind CSS + CVA styled components, copy-paste or install via CLI
- **Cross-platform** — React, Web Components, and React Native (via NativeWind)
- **W3C DTCG tokens** — Full design token pipeline with themes and brand overrides
- **AI-native** — Every component includes YAML manifests and decision trees for AI code generation
- **17 recipes** — Composable patterns like login forms, dashboards, data grids, and charts
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

## 📦 Import Paths

### Styled Components (what you ship)

```tsx
// Import from the component directory
import { Button } from '@/components/react/button/Button';
import { Card } from '@/components/react/card/Card';
import { Dialog } from '@/components/react/dialog/Dialog';
import { DataTable } from '@/components/react/data-table/DataTable';
```

### Headless Primitives

```tsx
// Import from the @ds0/primitives package
import { useButton, useDialog, useTooltip } from '@ds0/primitives';
import { Slot } from '@ds0/primitives';       // asChild pattern
import { cn } from '@ds0/primitives';         // Class merging  
import { invariant } from '@ds0/primitives';  // Dev-mode assertions
```

### Tokens

```tsx
// CSS custom properties (import in your app root)
import '@ds0/tokens/css';

// Dark mode overrides
import '@ds0/tokens/css/dark-mode.css';

// Tailwind preset (use in tailwind.config.ts)
import ds0Preset from '@ds0/tokens/tailwind';

// Resolved JSON (for tooling)
import tokens from '@ds0/tokens/json';
```

### Recipes

```tsx
// Import from the recipe directory
import { LoginForm } from '@/recipes/login-form/LoginForm';
import { DashboardLayout } from '@/recipes/dashboard-layout/DashboardLayout';
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

### Available Components (95)

#### Actions

| Component | Primitive | React | Web | Native |
|-----------|:---------:|:-----:|:---:|:------:|
| **Button** | ✅ | ✅ | ✅ | ✅ |
| **Icon Button** | ✅ | ✅ | ✅ | ✅ |
| **Toggle** | ✅ | ✅ | ✅ | ✅ |
| **Toggle Group** | ✅ | ✅ | ✅ | ✅ |

#### Data Input

| Component | Primitive | React | Web | Native |
|-----------|:---------:|:-----:|:---:|:------:|
| **Text Field** | ✅ | ✅ | ✅ | ✅ |
| **Text Area** | ✅ | ✅ | ✅ | ✅ |
| **Input** | ✅ | ✅ | ✅ | ✅ |
| **Select** | ✅ | ✅ | ✅ | ✅ |
| **Checkbox** | ✅ | ✅ | ✅ | ✅ |
| **Radio Group** | ✅ | ✅ | ✅ | ✅ |
| **Switch** | ✅ | ✅ | ✅ | ✅ |
| **Slider** | ✅ | ✅ | ✅ | ✅ |
| **Combobox** | ✅ | ✅ | ✅ | ✅ |
| **Color Picker** | ✅ | ✅ | ✅ | ✅ |
| **Date Picker** | ✅ | ✅ | ✅ | ✅ |
| **File Upload** | ✅ | ✅ | ✅ | ✅ |
| **Rating** | ✅ | ✅ | ✅ | ✅ |
| **Rich Text** | ✅ | ✅ | ✅ | ✅ |
| **Form** | ✅ | ✅ | ✅ | ✅ |

#### Data Display

| Component | Primitive | React | Web | Native |
|-----------|:---------:|:-----:|:---:|:------:|
| **Badge** | ✅ | ✅ | ✅ | ✅ |
| **Avatar** | ✅ | ✅ | ✅ | ✅ |
| **Avatar Group** | ✅ | ✅ | ✅ | ✅ |
| **Card** | ✅ | ✅ | ✅ | ✅ |
| **Table** | ✅ | ✅ | ✅ | ✅ |
| **Data Table** | ✅ | ✅ | ✅ | ✅ |
| **Accordion** | ✅ | ✅ | ✅ | ✅ |
| **Stat Card** | ✅ | ✅ | ✅ | ✅ |
| **Status Dot** | ✅ | ✅ | ✅ | ✅ |
| **Tag** | ✅ | ✅ | ✅ | ✅ |
| **Carousel** | ✅ | ✅ | ✅ | ✅ |
| **Code Block** | ✅ | ✅ | ✅ | ✅ |
| **Diff Viewer** | ✅ | ✅ | ✅ | ✅ |
| **Heat Map** | ✅ | ✅ | ✅ | ✅ |
| **JSON Viewer** | ✅ | ✅ | ✅ | ✅ |
| **Kanban Board** | ✅ | ✅ | ✅ | ✅ |
| **Masonry Grid** | ✅ | ✅ | ✅ | ✅ |
| **Product Card** | ✅ | ✅ | ✅ | ✅ |
| **Pricing Table** | ✅ | ✅ | ✅ | ✅ |
| **Sparkline** | ✅ | ✅ | ✅ | ✅ |
| **Chart** | ✅ | ✅ | ✅ | ✅ |
| **Changelog** | ✅ | ✅ | ✅ | ✅ |
| **Timeline** | ✅ | ✅ | ✅ | ✅ |
| **Terminal** | ✅ | ✅ | ✅ | ✅ |

#### Feedback

| Component | Primitive | React | Web | Native |
|-----------|:---------:|:-----:|:---:|:------:|
| **Alert** | ✅ | ✅ | ✅ | ✅ |
| **Alert Dialog** | ✅ | ✅ | ✅ | ✅ |
| **Toast** | ✅ | ✅ | ✅ | ✅ |
| **Notification** | ✅ | ✅ | ✅ | ✅ |
| **Banner** | ✅ | ✅ | ✅ | ✅ |
| **Progress** | ✅ | ✅ | ✅ | ✅ |
| **Spinner** | ✅ | ✅ | ✅ | ✅ |
| **Skeleton** | ✅ | ✅ | ✅ | ✅ |
| **Confetti** | ✅ | ✅ | ✅ | ✅ |
| **Empty State** | ✅ | ✅ | ✅ | ✅ |
| **Error Boundary** | ✅ | ✅ | ✅ | ✅ |
| **Cookie Consent** | ✅ | ✅ | ✅ | ✅ |

#### Layout

| Component | Primitive | React | Web | Native |
|-----------|:---------:|:-----:|:---:|:------:|
| **Stack** | ✅ | ✅ | ✅ | ✅ |
| **Grid** | ✅ | ✅ | ✅ | ✅ |
| **Container** | ✅ | ✅ | ✅ | ✅ |
| **Divider** | ✅ | ✅ | ✅ | ✅ |
| **Aspect Ratio** | ✅ | ✅ | ✅ | ✅ |
| **Splitter** | ✅ | ✅ | ✅ | ✅ |
| **App Shell** | ✅ | ✅ | ✅ | ✅ |
| **Sidebar** | ✅ | ✅ | ✅ | ✅ |
| **Dock** | ✅ | ✅ | ✅ | ✅ |
| **Sticky** | ✅ | ✅ | ✅ | ✅ |
| **Scroll Area** | ✅ | ✅ | ✅ | ✅ |

#### Navigation

| Component | Primitive | React | Web | Native |
|-----------|:---------:|:-----:|:---:|:------:|
| **Tabs** | ✅ | ✅ | ✅ | ✅ |
| **Breadcrumb** | ✅ | ✅ | ✅ | ✅ |
| **Pagination** | ✅ | ✅ | ✅ | ✅ |
| **Link** | ✅ | ✅ | ✅ | ✅ |
| **Navigation Menu** | ✅ | ✅ | ✅ | ✅ |
| **Menubar** | ✅ | ✅ | ✅ | ✅ |
| **Context Menu** | ✅ | ✅ | ✅ | ✅ |
| **Dropdown Menu** | ✅ | ✅ | ✅ | ✅ |
| **Stepper** | ✅ | ✅ | ✅ | ✅ |
| **Back To Top** | ✅ | ✅ | ✅ | ✅ |

#### Overlay

| Component | Primitive | React | Web | Native |
|-----------|:---------:|:-----:|:---:|:------:|
| **Dialog** | ✅ | ✅ | ✅ | ✅ |
| **Popover** | ✅ | ✅ | ✅ | ✅ |
| **Tooltip** | ✅ | ✅ | ✅ | ✅ |
| **Drawer** | ✅ | ✅ | ✅ | ✅ |
| **Collapsible** | ✅ | ✅ | ✅ | ✅ |
| **Command Palette** | ✅ | ✅ | ✅ | ✅ |
| **Chat Bubble** | ✅ | ✅ | ✅ | ✅ |

#### Typography

| Component | Primitive | React | Web | Native |
|-----------|:---------:|:-----:|:---:|:------:|
| **Heading** | ✅ | ✅ | ✅ | ✅ |
| **Text** | ✅ | ✅ | ✅ | ✅ |
| **Label** | ✅ | ✅ | ✅ | ✅ |
| **Code** | ✅ | ✅ | ✅ | ✅ |

#### Specialized

| Component | Primitive | React | Web | Native |
|-----------|:---------:|:-----:|:---:|:------:|
| **Calendar** | ✅ | ✅ | ✅ | ✅ |
| **Cart** | ✅ | ✅ | ✅ | ✅ |
| **Countdown Timer** | ✅ | ✅ | ✅ | ✅ |
| **Infinite Scroll** | ✅ | ✅ | ✅ | ✅ |
| **Map** | ✅ | ✅ | ✅ | ✅ |
| **Tour** | ✅ | ✅ | ✅ | ✅ |
| **Tree View** | ✅ | ✅ | ✅ | ✅ |
| **Virtualized List** | ✅ | ✅ | ✅ | ✅ |

### Recipes (17)

Pre-built patterns that compose DS0 components into ready-to-use experiences:

| Recipe | Description |
|--------|-------------|
| **Account Settings** | User account management form |
| **Chart** | Composable data visualization with multiple chart types |
| **Command Palette** | Keyboard-driven command interface |
| **Dashboard Layout** | Full dashboard shell with sidebar + header |
| **Dashboard Stats** | Metric cards with charts |
| **Data Grid** | Advanced data grid with sorting, filtering, and inline editing |
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

## 🎯 Icons

DS0 recommends **[Lucide React](https://lucide.dev/)** as its icon library. Lucide provides 1,500+ beautifully consistent icons with tree-shaking support.

### Installation

```bash
pnpm add lucide-react
```

### Usage with DS0 Components

```tsx
import { Button } from '@/components/react/button/Button';
import { Plus, ArrowRight } from 'lucide-react';

// Left icon
<Button leftIcon={<Plus size={16} />}>Add Item</Button>

// Right icon
<Button rightIcon={<ArrowRight size={16} />}>Continue</Button>

// Icon-only button
import { IconButton } from '@/components/react/icon-button/IconButton';
import { X } from 'lucide-react';

<IconButton icon={<X size={16} />} aria-label="Close" />
```

### Icon Sizing Guide

| Component Size | Icon Size |
|---------------|-----------|
| `sm` | `14px` |
| `md` | `16px` |
| `lg` | `20px` |

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
