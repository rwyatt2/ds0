# DS0 Design System — Fix Plan Context Package

> **Created:** March 24, 2026
> **Purpose:** Give an AI agent complete context to execute phased fixes on DS0.
> **Source:** Comprehensive audit across architecture, tokens, components, DX, a11y, docs, AI features, testing, and CI/CD.

---

## ⚠️ CRITICAL RULES FOR THE AI AGENT

1. **DO NOT skip phases.** Execute Phase A → B → C → D in strict order.
2. **DO NOT move to the next phase** without running ALL validation tests AND getting explicit user approval.
3. **Run end-to-end tests** after every significant change. Build, test, verify in browser.
4. **Ask the user before proceeding** at each phase gate. Show proof: commands run, tests passed, screenshots.
5. **If something fails**, fix it before moving on. Never leave a phase with broken tests.

---

## System Overview

DS0 is a design system framework with a layered architecture:

```
Primitives (headless hooks)  →  @ds0/primitives
     ↓
Styled Components (React)   →  components/react/[name]/
     ↓
Web Components              →  components/web/[name]/
     ↓
React Native                →  components/native/[name]/
     ↓
Recipes (composed patterns) →  recipes/[name]/
```

**Monorepo:** pnpm + Turborepo
**Tokens:** W3C DTCG format → StyleDictionary → CSS/Tailwind/RN/JSON
**Styling:** Tailwind CSS + CVA (class-variance-authority)
**Docs:** Fumadocs (Next.js) at `docs/`
**AI:** YAML manifests at `packages/ai/manifests/`
**CLI:** `packages/cli/` (not yet published)
**Components:** 39 total across 8 categories

---

## Current State: What's Broken

### 🔴 Critical Issues (6)

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | **Tailwind preset commented out** | `tailwind.config.ts:9` — the line `// presets: [ds0Preset]` | Components use token class names (`bg-primary`) but they don't resolve to actual token values |
| 2 | **Components can't be imported** | `@ds0/primitives` — no `dist/`, missing `default` export condition, docs `package.json` missing dependency | No consumer app can import any DS0 component |
| 3 | **System prompt stale** | `packages/ai/system-prompt.md:9` — says "No components have been built yet" | AI agents get incorrect info about what's available |
| 4 | **Decision trees empty** | `packages/ai/decision-trees/` — only `.gitkeep` | Claimed feature doesn't exist |
| 5 | **38/39 component specs missing** | `specs/components/` — only `button.spec.md` exists | Can't do spec-driven component generation |
| 6 | **CLI not published** | `packages/cli/` — not on npm registry | Primary adoption path `npx @ds0/cli init` doesn't work |

### 🟡 High Issues (8)

| # | Issue | Location |
|---|-------|----------|
| 7 | Web Components have 0 tests | `components/web/` — no `.test.ts` files |
| 8 | No visual regression testing | CI pipeline (`ci.yml`) — mentioned in ARCHITECTURE.md but not in workflows |
| 9 | `asChild` prop documented but not built | Manifests reference it, no `Slot` component exists |
| 10 | Dark mode theme exists but no switching | `tokens/themes/dark.json` exists, no ThemeProvider |
| 11 | Recipes use relative imports | `recipes/login-form/LoginForm.tsx` — uses `../../components/react/card` |
| 12 | No Getting Started guide | `docs/content/` — referenced but minimal |
| 13 | Doc quality varies 20x | `button.mdx` = 5KB, `spinner.mdx` = 255B, `grid.mdx` = 235B |
| 14 | Doc previews are fake | `docs/components/previews/components/ButtonPreview.tsx` — hand-written HTML, not real components |

### 🟢 Low Issues (5)

| # | Issue | Location |
|---|-------|----------|
| 15 | No coverage thresholds | `vitest.config.ts` — no `coverage.thresholds` |
| 16 | Security audit soft-fails | `.github/workflows/ci.yml` — `continue-on-error: true` |
| 17 | tsup entry points incomplete | `packages/primitives/tsup.config.ts` — only `index.ts` + `button` |
| 18 | No ESLint plugin for token enforcement | Components don't prevent raw Tailwind palette usage |
| 19 | Native layer missing 1 test | `components/native/dialog/` — no test file |

---

## Audit Scores (Current)

| Dimension | Score | Target |
|-----------|:-----:|:------:|
| Architecture | 9.0 | 9.5 |
| Token System | 7.5 | 9.0 |
| Component Quality | 7.0 | 9.0 |
| Accessibility | 7.5 | 9.0 |
| Testing | 7.0 | 9.0 |
| Documentation | 5.0 | 9.0 |
| Developer Experience | 6.0 | 9.0 |
| AI-Native Features | 5.5 | 9.0 |
| CI/CD & Governance | 7.0 | 9.0 |
| **Overall** | **6.8** | **9.2** |

---

## PHASE A: Critical Fixes (2 Weeks)

> **Goal:** Make the components usable. Fix the broken plumbing.
> **Issues addressed:** #1, #2, #3, #4, #17

### A1. Fix Workspace Package Resolution

**Problem:** `@ds0/primitives` can't be imported by consumer apps.

**Steps:**
1. Open `packages/primitives/package.json`
2. Update `exports` to include `"default"` condition pointing to source:
   ```json
   "exports": {
     ".": {
       "types": "./dist/index.d.ts",
       "import": "./dist/index.js",
       "default": "./src/index.ts"
     }
   }
   ```
3. Open `packages/primitives/tsup.config.ts`
4. Add ALL component directories to the `entry` array (not just `index.ts` and `button`)
5. Run `pnpm build` from monorepo root — verify all packages build
6. Open `docs/package.json` — add `"@ds0/primitives": "workspace:*"` to dependencies
7. Open `docs/next.config.mjs` — add `transpilePackages: ['@ds0/primitives']`
8. Also add `class-variance-authority` to docs dependencies if missing
9. Run `pnpm install` from root
10. Run `pnpm --filter ds0-docs dev` — verify docs site starts without errors

**Test:** Navigate to `http://localhost:3000/audit/login` — the TaskFlow login page must render. Test files exist at:
- `docs/app/audit/login/page.tsx`
- `docs/app/audit/dashboard/page.tsx`
- `docs/app/audit/settings/page.tsx`

### A2. Connect the Tailwind Preset

**Problem:** `tailwind.config.ts` line 9 has the preset commented out.

**Steps:**
1. Ensure tokens are built: `node scripts/build-tokens.mjs`
2. Verify `packages/tokens/tailwind/preset.ts` exists with semantic color mappings
3. Open `tailwind.config.ts` — uncomment line 9: `presets: [ds0Preset]`
4. Add the import at top of file: `import { ds0Preset } from './packages/tokens/tailwind/preset';` (adjust actual path to match the real file)
5. Run `pnpm dev` in docs — verify components render with correct colors (not default Tailwind blues)

**Test:** Inspect a `<Button variant="primary">` in browser DevTools — `bg-primary` class should resolve to the token value from `tokens/_semantic/color.json`, NOT default Tailwind blue.

### A3. Update System Prompt

**Problem:** `packages/ai/system-prompt.md` says "No components have been built yet"

**Steps:**
1. Generate a component registry from the 39 existing components
2. Rewrite `system-prompt.md` with:
   - Full component list grouped by category
   - Import path examples
   - Token system overview
   - Common composition patterns
3. Keep it under 4000 tokens for LLM context window efficiency

**Test:** Read the updated file. It must list all 39 components with correct categories.

### A4. Fix tsup Entry Points

**Problem:** `packages/primitives/tsup.config.ts` only includes 2 entry points.

**Steps:**
1. Scan `packages/primitives/src/` for all component directories
2. Add each as an entry point in tsup config
3. Rebuild: `cd packages/primitives && npx tsup`
4. Verify `dist/` contains directories for all components

**Test:** `ls packages/primitives/dist/` should show all component directories.

### ✅ PHASE A VALIDATION GATE

Run these commands/checks. ALL must pass. Show results to user.

```bash
# 1. Full build
pnpm build

# 2. Import resolution test
node -e "import('@ds0/primitives').then(m => console.log('Exports:', Object.keys(m).length))"

# 3. Token connection test
# Start docs dev server
pnpm --filter ds0-docs dev
# Navigate browser to /audit/login — must render without errors
# Inspect Button — bg-primary must resolve to token value

# 4. System prompt check
grep -c "Button" packages/ai/system-prompt.md  # Should be > 0

# 5. All TaskFlow pages render
# /audit/login — renders login card
# /audit/dashboard — renders dashboard with stats + table
# /audit/settings — renders settings with tabs + switches
```

**⛔ STOP HERE. Present validation results to user. Get explicit approval before Phase B.**

---

## PHASE B: Developer Experience (3 Weeks)

> **Goal:** Junior dev can build in <30 minutes.
> **Issues addressed:** #6, #11, #12

### B1. Publish CLI to npm

1. Review `packages/cli/src/` — verify `init`, `add`, `diff`, `doctor` commands work
2. Test `init` locally: `node packages/cli/src/index.ts init`
3. Test `add` locally: `node packages/cli/src/index.ts add button`
4. Fix any bugs found
5. Publish to npm as `@ds0/cli`

### B2. Getting Started Guide

1. Write `docs/content/docs/getting-started/quickstart.mdx`
2. Steps: install → init → add component → customize → run
3. Include troubleshooting section
4. Add CodeSandbox/StackBlitz template link

### B3. Fix Component Import Model

1. Decide on canonical import path: `@ds0/react/button` or copied-local model
2. If copied-local: CLI must copy AND install `@ds0/primitives` as dependency
3. If package: create `@ds0/react` package with barrel exports
4. Update all docs to use the chosen import path

### B4. Fix Recipe Imports

1. Change all relative imports in `recipes/` to package imports
2. Verify recipes build with updated imports

### ✅ PHASE B VALIDATION GATE

```bash
# 1. CLI cold start
npx @ds0/cli init ./test-project && cd test-project
npx @ds0/cli add button
npm run dev  # Must start without errors

# 2. Copy-paste test
# Button component renders in test project

# 3. Doctor validation
npx @ds0/cli doctor  # 0 issues

# 4. Quickstart guide test
# Follow the guide from scratch — must work end-to-end
```

**⛔ STOP. Present results to user. Get approval before Phase C.**

---

## PHASE C: Documentation & AI (3 Weeks)

> **Goal:** All components fully documented. AI features work.
> **Issues addressed:** #4, #5, #13, #14

### C1. Complete All Component Docs

Bring all 39 docs to Button-level quality. Each must have:
- Overview, Usage, Variants, Sizes, States
- Composition examples, Accessibility section
- API Reference table, AI Decision Guide, Related Components

**Priority order:** Start with the 15 stubs under 1KB:
`spinner.mdx`, `grid.mdx`, `container.mdx`, `divider.mdx`, `stack.mdx`, `label.mdx`, `code.mdx`, `skeleton.mdx`, `aspect-ratio.mdx`, `heading.mdx`, `text.mdx`, `icon-button.mdx`, `slider.mdx`, `toggle.mdx`, `breadcrumb.mdx`

### C2. Replace Fake Previews

Replace ALL files in `docs/components/previews/components/` with real DS0 component imports.

Example — `ButtonPreview.tsx` currently uses raw `<button>` HTML. Replace with:
```tsx
import { Button } from '@ds0/primitives'; // or the correct import path
```

### C3. Populate Decision Trees

Create YAML files in `packages/ai/decision-trees/` for all 8 categories:
- `actions.yaml`, `data-input.yaml`, `data-display.yaml`, `feedback.yaml`
- `layout.yaml`, `navigation.yaml`, `overlay.yaml`, `typography.yaml`

### C4. Build AI Context Pack Export

Implement `packages/cli/src/commands/ai-context.ts`:
- Exports single JSON with: components, tokens, decision trees, patterns
- Command: `npx @ds0/cli ai-context > ds0-context.json`

### C5. Write Missing Component Specs

Create specs in `specs/components/` for all 38 missing components.

### ✅ PHASE C VALIDATION GATE

```bash
# 1. Doc completeness
find docs/content/components -name "*.mdx" -size -1k  # Must return 0 files

# 2. Preview authenticity
grep -rL "from.*@ds0" docs/components/previews/components/  # Must return 0 files

# 3. Decision trees exist
ls packages/ai/decision-trees/*.yaml | wc -l  # Must be >= 8

# 4. AI context export
npx @ds0/cli ai-context | python3 -m json.tool > /dev/null  # Valid JSON

# 5. AI agent test
# Give an AI the context pack. Ask it to generate a login form.
# It must produce working code with correct imports.
```

**⛔ STOP. Present results to user. Get approval before Phase D.**

---

## PHASE D: Scale & Polish (4 Weeks)

> **Goal:** Production-ready for teams of any size.
> **Issues addressed:** #7, #8, #9, #10, #15, #16, #19

### D1. Visual Regression Testing
- Set up Chromatic or Playwright screenshots in CI
- Baseline all 39 components × all variants × light + dark

### D2. Dark Mode & Theming
- Build `ThemeProvider` component
- Wire `tokens/themes/dark.json`
- Add dark mode toggle to docs
- Write theming guide

### D3. Web Component Tests
- Write tests for all 39 web components (currently 0)

### D4. Density System
- Build functional `DensityProvider`
- Test all components at compact/comfortable/spacious

### D5. `asChild` Implementation
- Build `Slot` component in primitives
- Add `asChild` to Button, Link, etc.

### D6. CI Hardening
- Security audit: remove `continue-on-error: true`
- vitest: add coverage thresholds (80% minimum)
- Add E2E smoke tests
- Fix native Dialog test (missing file)

### ✅ PHASE D VALIDATION GATE (FINAL)

```bash
# 1. Visual regression in CI
# Make a trivial visual change → CI should catch it

# 2. Dark mode
# Toggle dark mode on docs → all pages render correctly

# 3. Web component tests
pnpm test --filter web  # All pass

# 4. Coverage
pnpm test:coverage  # >= 80% on all packages

# 5. Full re-audit
# Re-run the Phase 1 scoring → must be >= 9.0/10

# 6. Junior dev re-test
# Fresh user follows quickstart → builds a form in < 30 min
```

**⛔ FINAL STOP. Present re-audit results. Get user sign-off.**

---

## Key Files Reference

| Purpose | Path |
|---------|------|
| Architecture docs | `.ai/ARCHITECTURE.md` |
| Conventions | `.ai/CONVENTIONS.md` |
| Component anatomy template | `.ai/component-anatomy.md` |
| Token schema | `.ai/token-schema.md` |
| Tailwind config (**FIX LINE 9**) | `tailwind.config.ts` |
| Primitives package | `packages/primitives/package.json` |
| Primitives tsup config | `packages/primitives/tsup.config.ts` |
| Primitives barrel export | `packages/primitives/src/index.ts` |
| Token build script | `scripts/build-tokens.mjs` |
| System prompt (**STALE**) | `packages/ai/system-prompt.md` |
| Decision trees (**EMPTY**) | `packages/ai/decision-trees/` |
| AI patterns | `packages/ai/patterns/` |
| CI workflow | `.github/workflows/ci.yml` |
| Docs app | `docs/` |
| Docs next config | `docs/next.config.mjs` |
| Fake previews (**REPLACE**) | `docs/components/previews/components/` |
| Audit test pages | `docs/app/audit/login/page.tsx`, `dashboard/page.tsx`, `settings/page.tsx` |
| Button spec (only example) | `specs/components/button.spec.md` |
| Button manifest (gold standard) | `packages/ai/manifests/button.manifest.yaml` |
| Button docs (gold standard) | `docs/content/components/button.mdx` |
| LoginForm recipe (composition example) | `recipes/login-form/LoginForm.tsx` |

---

## What "Done" Looks Like

1. `pnpm build` passes with 0 errors
2. `pnpm test` passes with ≥80% coverage
3. `npx @ds0/cli init` works for a brand new user
4. All 39 component docs are ≥3KB with full sections
5. All doc previews use real DS0 component imports
6. AI agent given the context pack generates working code
7. Dark mode toggle works across all docs pages
8. Visual regression prevents unintended changes
9. Overall audit score ≥ 9.0/10
10. Junior developer can build a form in < 30 minutes
