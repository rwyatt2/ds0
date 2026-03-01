---
name: Create DS0 Component
description: Scaffolds a complete DS0 component from a spec file
inputs:
  - component_name: The name of the component in kebab-case (e.g., radio-group)
---

## Instructions

You are building a component for DS0. Follow these steps exactly.

### Step 1 — Read Context

Read these files before writing any code:
- `.ai/RULES.md` — All project conventions
- `.ai/component-anatomy.md` — Required file structure
- `specs/components/{{component_name}}.spec.md` — The spec for this component

### Step 2 — Study the Golden Example

Read ALL files in these directories to understand the pattern:
- `packages/primitives/src/button/`
- `components/react/button/`
- `components/web/button/`
- `components/native/button/`
- `packages/ai/manifests/button.manifest.yaml`
- `docs/content/components/button.mdx`
- `figma/button.figma.ts`

Your output must follow the identical structure and conventions.

### Step 3 — Generate All Files

Create every file listed below. Do not skip any.

1. `packages/primitives/src/{{component_name}}/{{ComponentName}}.tsx`
2. `packages/primitives/src/{{component_name}}/{{ComponentName}}.types.ts`
3. `packages/primitives/src/{{component_name}}/use{{ComponentName}}.ts`
4. `packages/primitives/src/{{component_name}}/{{ComponentName}}.test.tsx`
5. `packages/primitives/src/{{component_name}}/index.ts`
6. `components/react/{{component_name}}/{{ComponentName}}.tsx`
7. `components/react/{{component_name}}/{{ComponentName}}.stories.tsx`
8. `components/react/{{component_name}}/{{ComponentName}}.test.tsx`
9. `components/react/{{component_name}}/index.ts`
10. `components/web/{{component_name}}/{{component_name}}-element.ts`
11. `components/web/{{component_name}}/index.ts`
12. `components/native/{{component_name}}/{{ComponentName}}.tsx`
13. `components/native/{{component_name}}/{{ComponentName}}.test.tsx`
14. `components/native/{{component_name}}/index.ts`
15. `packages/ai/manifests/{{component_name}}.manifest.yaml`
16. `docs/content/components/{{component_name}}.mdx`
17. `figma/{{component_name}}.figma.ts`

### Step 4 — Validate

Run these commands in the terminal:
```bash
pnpm typecheck
pnpm test --filter={{component_name}}
pnpm lint
```

Fix any errors before marking complete.

### Step 5 — Visual Verification

1. Run `pnpm storybook` in the terminal
2. Open the browser to `http://localhost:6006`
3. Navigate to the component story
4. Verify all variants render correctly
5. Take a screenshot to confirm
