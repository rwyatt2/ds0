# Governance

DS0 is maintained by core maintainers and the community. This document outlines how decisions are made, how changes are released, and how the project evolves.

---

## Decision-Making

### Day-to-Day

- Bug fixes and minor improvements can be merged with one maintainer approval
- Architecture decisions are documented in `.ai/ARCHITECTURE.md`

### Breaking Changes & RFCs

Breaking changes follow an RFC (Request for Comments) process:

1. **Propose** — Open a GitHub Discussion in the "RFC" category describing the change, its motivation, and migration path
2. **Discuss** — Allow at least 7 days for community feedback
3. **Decide** — Core maintainers approve, request changes, or decline
4. **Implement** — Once approved, the change is implemented with a migration guide
5. **Release** — Breaking changes are batched into the next major version

> All breaking changes **must** include a migration guide in the PR description and docs.

---

## Versioning Policy

DS0 follows [Semantic Versioning 2.0.0](https://semver.org/):

| Change Type | Version Bump | Example |
|-------------|-------------|---------|
| Bug fix, docs, internal refactor | **Patch** (`x.x.1`) | Fix button focus ring |
| New component, feature, opt-in behavior | **Minor** (`x.1.0`) | Add DatePicker component |
| Removed API, renamed prop, changed default | **Major** (`1.0.0`) | Rename `color` → `variant` |

All packages in the `@ds0` scope are versioned independently using [Changesets](https://github.com/changesets/changesets).

---

## Deprecation Strategy

When a component, prop, or API is scheduled for removal:

1. **Mark as deprecated** in the current minor release with `@deprecated` JSDoc tag
2. **Console warning** at runtime when the deprecated API is used (development builds only)
3. **Document the replacement** in the deprecation notice and changelog
4. **Remove** in the next major version, at least 3 months after the deprecation notice

```tsx
/** @deprecated Use `variant` instead. Will be removed in v2.0.0. */
color?: string;
```

---

## Releases

- We use [Changesets](https://github.com/changesets/changesets) for versioning and changelog generation
- Releases are automated via GitHub Actions on merge to `main`
- Each publishable package (`@ds0/primitives`, `@ds0/tokens`, `@ds0/cli`, `@ds0/ai`) has its own version and changelog
- Pre-releases use the `next` npm dist-tag

---

## Maintainers

Core maintainers have merge access and npm publish rights. See [GitHub Contributors](https://github.com/rwyatt2/ds0/graphs/contributors) for the current list.

### Becoming a Maintainer

Active contributors who demonstrate consistent, high-quality contributions may be invited to become core maintainers. There is no formal application process — continued contribution is the path.
