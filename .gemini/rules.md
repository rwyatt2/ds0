# DS0 — Antigravity / Gemini Rules
# This file points to the shared rules. Do NOT edit rules here.

Read and follow ALL instructions in `.ai/RULES.md` before every task.
Read any additional context files in the `.ai/` directory as needed.

## Antigravity-Specific Instructions

- When building a component, use the workflows in `.agents/workflows/` if available
- After generating code, use the built-in terminal to validate:
  - `pnpm typecheck`
  - `pnpm test --filter=[component]`
  - `pnpm lint`
- Use the browser agent to visually verify Storybook output:
  - Run `pnpm storybook`
  - Navigate to the component
  - Verify all variants render correctly
- When running parallel tasks via Agent Manager, ensure each agent reads `.ai/RULES.md` first
