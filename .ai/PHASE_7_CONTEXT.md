# Phase 7 Context Package

> **Carry this file to a new chat to resume Phase 7 work.**
> Read this file first, then execute the remaining tasks.

---

## Project: DS0 — AI-Native Design System Framework

- **Repo**: `https://github.com/rwyatt2/ds0.git`
- **Local path**: `/Users/mnstr/.gemini/antigravity/scratch/ds0`
- **Monorepo**: pnpm workspaces + Turborepo
- **Language**: TypeScript 5.x
- **Version**: `0.1.0` (pre-launch)

## What's Already Built (Phases 1–6)

| Phase | Status | Summary |
|-------|--------|---------|
| **1 — Foundation** | ✅ Done | Monorepo, tokens (W3C DTCG), StyleDictionary, Tailwind config, ESLint, Prettier, Vitest, Husky, CI |
| **2 — Golden Component** | ✅ Done | Button across all 4 layers (primitive, React, Web Component, React Native) |
| **3 — Components** | ✅ Done | 39 components across all layers. See full list below |
| **4 — Docs Site** | ✅ Done | Next.js + Fumadocs at `docs/`, auto-generated MDX from manifests |
| **5 — Recipes** | ✅ Done | 15 composable UI patterns (login, dashboard, settings, etc.) |
| **6 — CLI** | ✅ Done | `@ds0/cli` with commands: init, add, diff, doctor, ai-context, list |

### 39 Components (all have Primitive + Styled React layers)

Accordion, Alert, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Card, Checkbox, Code, Container, Dialog, Divider, Drawer, Form, Grid, Heading, Icon Button, Label, Link, Pagination, Popover, Progress, Radio Group, Select, Skeleton, Slider, Spinner, Stack, Switch, Table, Tabs, Text, Text Area, Text Field, Toast, Toggle, Toggle Group, Tooltip

**Web Components (36)**: All above except Popover, Select, Tooltip  
**React Native (35)**: All above except Divider, Drawer, Popover, Select, Tooltip

### 15 Recipes

Account Settings, Command Palette, Dashboard Layout, Dashboard Stats, Data Table, Empty State, Error Page, Forgot Password Form, Login Form, Navbar, Notification Settings, Pricing Cards, Profile Settings, Sidebar Navigation, Signup Form

### 4 Publishable Packages (ALL public)

| Package | Path | Description |
|---------|------|-------------|
| `@ds0/primitives` | `packages/primitives/` | Headless, accessible UI primitives |
| `@ds0/tokens` | `packages/tokens/` | Generated design tokens (CSS, JS, JSON, Tailwind) |
| `@ds0/cli` | `packages/cli/` | CLI tool (init, add, diff, doctor, ai-context, list) |
| `@ds0/ai` | `packages/ai/` | AI manifests & decision trees |

---

## Phase 7 — What Needs to Be Done

### ✅ COMPLETED in this chat

1. **README.md** — Fully rewritten with all 39 components, 15 recipes, CLI usage, badges, updated architecture diagram
2. **CONTRIBUTING.md** — Created with setup, workflow, component contribution guide, commit conventions, PR process

### ❌ REMAINING — Part 1: Repo Files

3. **CODE_OF_CONDUCT.md** — Create using Contributor Covenant v2.1. Use `ds0@example.com` as contact placeholder
4. **CHANGELOG.md** — Create using [Keep a Changelog](https://keepachangelog.com/) format. Initial `0.1.0` entry covering full foundation build
5. **.gitignore** — Add entries: `.env.production`, `*.tgz`, `.vercel`, `out/`

### ❌ REMAINING — Part 2: GitHub Config

6. **`.github/ISSUE_TEMPLATE/bug_report.yml`** — YAML issue form with: description, repro steps, expected/actual, environment, component affected
7. **`.github/ISSUE_TEMPLATE/feature_request.yml`** — YAML issue form with: problem, proposed solution, alternatives, component/area
8. **`.github/ISSUE_TEMPLATE/config.yml`** — Contact links (Discussions)
9. **`.github/PULL_REQUEST_TEMPLATE.md`** — Description, type checkboxes, checklist
10. **`SECURITY.md`** — Security disclosure policy, supported versions, reporting instructions
11. **`.github/FUNDING.yml`** — GitHub Sponsors + Open Collective placeholders

### ❌ REMAINING — Part 3: npm Publishing & Release CI/CD

12. **Update package.json files** — Add `publishConfig`, `repository`, `homepage`, `bugs`, `keywords`, `sideEffects` to all 4 packages:
    - `packages/primitives/package.json`
    - `packages/tokens/package.json`
    - `packages/cli/package.json`
    - `packages/ai/package.json`
13. **`.github/workflows/release.yml`** — Triggered on GitHub Release `v*` tag. Checkout → pnpm install → build → publish to npm with `NPM_TOKEN` secret + provenance
14. **`.github/workflows/canary.yml`** — Triggered on push to main. Publishes canary versions with `canary` npm tag
15. **Changesets setup**:
    - `.changeset/config.json` — linked packages, access: public, baseBranch: main
    - `.changeset/README.md` — contributor instructions
    - Root `package.json` — add `@changesets/cli` devDep + `changeset`, `version`, `release` scripts

### ❌ REMAINING — Part 4: Landing Page Polish

16. **`docs/app/page.tsx`** — Hero section with tagline + CTA, feature grid (AI-Native, Cross-Platform, Tokens, CLI, A11y, Theming), component showcase, install snippet
17. **`docs/app/layout.tsx`** — SEO meta tags (title, description, og:image), favicon
18. **Landing page styles** — Hero gradients, animations, feature card styles (in existing or new CSS file)
19. **`docs/public/og-image.png`** — Generate OG image for social sharing

### ❌ REMAINING — Part 5: Launch Checklist

20. **`specs/phase-7-launch-checklist.md`** — Pre-launch validation (pnpm validate, storybook build, docs build, links, npm metadata, GitHub settings) + Launch day steps (GitHub Release v0.1.0, npm publish, docs deploy, announcements)

---

## Key Existing Files to Reference

| File | Purpose |
|------|---------|
| `.ai/CONVENTIONS.md` | All naming, coding, commit, and style conventions |
| `.ai/ARCHITECTURE.md` | System architecture decisions |
| `package.json` | Root monorepo config (private: true) |
| `.github/workflows/ci.yml` | Existing CI workflow (validate + build jobs) |
| `docs/package.json` | Docs site config (Next.js + Fumadocs) |
| `registry.json` | Component registry for CLI |

## Verification After All Parts Complete

```bash
pnpm validate                    # typecheck + lint + test
cd docs && pnpm build            # docs site builds
npm pack --dry-run               # in each package dir to verify files config
```
