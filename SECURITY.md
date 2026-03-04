# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 0.1.x   | ✅ Current release |
| < 0.1   | ❌ Not supported   |

## Reporting a Vulnerability

**Please do not open public issues for security vulnerabilities.**

### How to Report

1. **Email**: [security@ds0.systems](mailto:security@ds0.systems)
2. **GitHub Security Advisory**: Open a [private security advisory](https://github.com/rwyatt2/ds0/security/advisories/new)

### What to Include

- Steps to reproduce the vulnerability
- Impact assessment (severity, scope)
- Affected package(s) and version(s)
- Proposed fix (if you have one)

### Response Timeline

| Action | SLA |
|--------|-----|
| Acknowledgment | Within 48 hours |
| Initial assessment | Within 5 business days |
| Fix for critical issues | Within 14 days |
| Fix for other issues | Within 30 days |
| Public disclosure | After fix is released |

### Scope

The following are in scope for security reports:

- **@ds0/primitives** — Core headless components
- **@ds0/cli** — CLI tool (local filesystem access)
- **@ds0/tokens** — Token build pipeline
- **ds0-docs** — Documentation site
- **Build scripts** — `scripts/` directory

### Out of Scope

- Third-party dependencies (report upstream; we track via Dependabot)
- Social engineering attacks
- Denial of service attacks against the documentation site

## Security Practices

- Dependencies are scanned weekly via [Dependabot](.github/dependabot.yml)
- CI pipeline runs `pnpm audit` on every pull request
- All packages use `pnpm install --frozen-lockfile` to prevent lockfile manipulation
