# Support

## Getting Help

| Channel | Use For | Response Time |
|---------|---------|---------------|
| [Documentation](https://ds0.systems) | API reference, guides, examples | Instant |
| [GitHub Discussions](https://github.com/rwyatt2/ds0/discussions) | Questions, ideas, show & tell | 1–3 business days |
| [GitHub Issues](https://github.com/rwyatt2/ds0/issues) | Bug reports only | 1–5 business days |

## Before You Ask

1. **Search existing discussions and issues** — your question may already be answered
2. **Run `ds0 doctor`** — this validates your setup and catches common problems
3. **Check your Node version** — DS0 requires Node 20+
4. **Provide a minimal reproduction** — a CodeSandbox or small repo helps us help you faster

## FAQ

### How do I install DS0?

```bash
npx ds0 init
```

See [QUICKSTART.md](QUICKSTART.md) for a full walkthrough.

### How do I add a component?

```bash
npx ds0 add button card dialog
```

### How do I use dark mode?

```tsx
import '@ds0/tokens/css/dark-mode.css';
```

Then wrap your app with `<ThemeProvider>`. See the [ThemeProvider docs](https://ds0.systems/docs/utils/theme-provider).

### My types don't match after upgrading

Run `ds0 doctor` to check your setup, then see [MIGRATION.md](MIGRATION.md) for breaking changes.

### How do I contribute?

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, conventions, and PR process.

## Reporting a Bug

When filing an issue, please include:

1. **DS0 version** (`npx ds0 --version`)
2. **Node version** (`node --version`)
3. **Package manager** (pnpm, npm, yarn)
4. **Browser and OS**
5. **Steps to reproduce** — ideally a minimal reproduction
6. **Expected behavior** vs. **actual behavior**
7. **Screenshots** if visual

## Security Issues

For security vulnerabilities, **do not open a public issue**. Email security concerns directly to the maintainers. See [SECURITY.md](SECURITY.md) if available.

## Community Guidelines

- Be respectful and constructive
- Search before asking
- Provide context and reproductions
- Help others when you can
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
