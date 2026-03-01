# DS0 — The AI-Native Design System Framework

> The zero layer. The foundation everything builds from.

DS0 is an open-source design system framework that scales from freelancer to enterprise. It's built to be consumed by humans and AI equally.

## Status

🚧 **Phase 1: Foundation** — Setting up the monorepo, tokens, and build pipeline.

## Architecture

- **Primitives:** Headless, accessible React components (`@ds0/primitives`)
- **Styled Components:** Tailwind CSS styled, copy-paste via CLI
- **Tokens:** W3C DTCG format, built via StyleDictionary
- **Cross-platform:** React Native via NativeWind, Web Components
- **AI-native:** Every component has machine-readable manifests and decision trees

## Quick Start

```bash
git clone https://github.com/rwyatt2/ds0.git
cd ds0
pnpm install
pnpm build:tokens
pnpm storybook
```

## Structure

```
ds0/
├── packages/primitives/   — Headless UI components
├── packages/tokens/       — Design tokens (generated)
├── packages/cli/          — CLI tool
├── packages/ai/           — AI manifests & decision trees
├── components/react/      — Styled React components
├── components/web/        — Web Components
├── components/native/     — React Native components
├── tokens/                — Source token files
├── docs/                  — Documentation site
└── .ai/                   — AI context documents
```

## License

MIT © DS0 Contributors
