# Phase 1: Foundation

> **Instructions for AI:** Read ALL files in `.ai/` before starting.
> Build files in the order listed. Validate after each section.
> This spec defines EVERY file needed for the DS0 foundation.

---

## Section 1: Monorepo Configuration

### 1.01 — `package.json` (root)

```json
{
  "name": "ds0",
  "version": "0.1.0",
  "private": true,
  "description": "DS0 — The AI-Native Design System Framework",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/rwyatt2/ds0.git"
  },
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  },
  "packageManager": "pnpm@9.15.4",
  "scripts": {
    "build": "turbo run build",
    "build:tokens": "node scripts/build-tokens.mjs",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "lint:fix": "turbo run lint:fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "test:coverage": "turbo run test:coverage",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build",
    "clean": "turbo run clean && rm -rf node_modules",
    "validate": "pnpm typecheck && pnpm lint && pnpm test",
    "validate:manifests": "node scripts/validate-manifests.mjs",
    "prepare": "husky"
  }
}
```

### 1.02 — `pnpm-workspace.yaml`

```yaml
packages:
  - "packages/*"
  - "components/*"
  - "docs"
```

### 1.03 — `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "lint:fix": {},
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "test:coverage": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

### 1.04 — `tsconfig.base.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": false,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInImports": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "paths": {
      "@ds0/primitives": ["./packages/primitives/src/index.ts"],
      "@ds0/primitives/*": ["./packages/primitives/src/*"],
      "@ds0/tokens": ["./packages/tokens/src/index.ts"],
      "@ds0/tokens/*": ["./packages/tokens/src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

### 1.05 — `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 1.06 — `.prettierignore`

```
dist
node_modules
.turbo
coverage
packages/tokens/css
packages/tokens/tailwind
packages/tokens/react-native
packages/tokens/json
pnpm-lock.yaml
```

### 1.07 — `eslint.config.js`

```javascript
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // TypeScript
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],

            // React
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',

            // Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Accessibility
            'jsx-a11y/no-autofocus': 'warn',
        },
    },
    {
        ignores: ['dist/', 'node_modules/', '*.config.*', '*.mjs', 'packages/tokens/', '.storybook/'],
    },
);
```

### 1.08 — `.gitignore`

```
node_modules
dist
.turbo
*.tsbuildinfo
coverage
.vscode/*
!.vscode/settings.json
.idea
.DS_Store
Thumbs.db
.env
.env.local
.env.*.local
storybook-static
```

### 1.09 — `.nvmrc`

```
20
```

### 1.10 — `.npmrc`

```
auto-install-peers=true
strict-peer-dependencies=false
```

---

## Section 2: Package Scaffolds

### 2.01 — `packages/primitives/package.json`

```json
{
  "name": "@ds0/primitives",
  "version": "0.1.0",
  "description": "Headless, accessible UI primitives for DS0",
  "license": "MIT",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./*": {
      "types": "./dist/*/index.d.ts",
      "import": "./dist/*/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "clean": "rm -rf dist .turbo"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

### 2.02 — `packages/primitives/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

### 2.03 — `packages/primitives/tsup.config.ts`

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
});
```

### 2.04 — `packages/primitives/vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    css: false,
  },
});
```

### 2.05 — `packages/primitives/src/test-setup.ts`

```typescript
import '@testing-library/jest-dom/vitest';
```

### 2.06 — `packages/primitives/src/index.ts`

```typescript
// DS0 Primitives
// Headless, accessible UI components

// Utils
export { cn } from './utils/cn';
export { invariant } from './utils/invariant';

// Components will be exported here as they are built
// e.g., export { Button } from './button';
```

### 2.07 — `packages/primitives/src/utils/cn.ts`

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using clsx and tailwind-merge.
 * Handles conditional classes and Tailwind conflicts.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * ```ts
 * cn('px-4 py-2', isActive && 'bg-primary', className)
 * // => 'px-4 py-2 bg-primary custom-class'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

### 2.08 — `packages/primitives/src/utils/invariant.ts`

```typescript
/**
 * Throws an error in development if the condition is falsy.
 * Provides clear, actionable error messages for DS0 consumers.
 *
 * @param condition - The condition to check
 * @param message - Error message if condition is falsy
 *
 * @example
 * ```ts
 * invariant(children != null, 'Button: `children` prop is required.');
 * ```
 */
export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[DS0] ${message}`);
  }
}
```

### 2.09 — `packages/tokens/package.json`

```json
{
  "name": "@ds0/tokens",
  "version": "0.1.0",
  "description": "Design tokens for DS0 — generated from source tokens via StyleDictionary",
  "license": "MIT",
  "type": "module",
  "exports": {
    "./css": "./css/variables.css",
    "./tailwind": {
      "types": "./tailwind/preset.d.ts",
      "import": "./tailwind/preset.js"
    },
    "./react-native": {
      "types": "./react-native/tokens.d.ts",
      "import": "./react-native/tokens.js"
    },
    "./json": "./json/resolved.json"
  },
  "files": ["css", "tailwind", "react-native", "json"],
  "scripts": {
    "build": "node ../../scripts/build-tokens.mjs",
    "clean": "rm -rf css tailwind react-native json .turbo"
  }
}
```

### 2.10 — `packages/cli/package.json`

```json
{
  "name": "@ds0/cli",
  "version": "0.1.0",
  "description": "CLI for DS0 — add components, init projects, validate setup",
  "license": "MIT",
  "type": "module",
  "bin": {
    "ds0": "./dist/index.js"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist .turbo"
  }
}
```

### 2.11 — `packages/cli/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

### 2.12 — `packages/cli/src/index.ts`

```typescript
#!/usr/bin/env node

/**
 * DS0 CLI
 *
 * Commands:
 *   ds0 init          — Scaffold DS0 config in your project
 *   ds0 add [name]    — Copy a component into your project
 *   ds0 diff          — Show changes since you copied
 *   ds0 doctor        — Validate your DS0 setup
 *   ds0 ai-context    — Export AI context pack
 */

console.log('🎨 DS0 CLI — Coming soon');
console.log('Run `ds0 init` to get started');
```

### 2.13 — `packages/ai/package.json`

```json
{
  "name": "@ds0/ai",
  "version": "0.1.0",
  "description": "AI context, manifests, and decision trees for DS0",
  "license": "MIT",
  "type": "module",
  "exports": {
    "./manifests": "./manifests/index.json",
    "./decision-trees": "./decision-trees/index.json",
    "./system-prompt": "./system-prompt.md"
  },
  "files": ["manifests", "decision-trees", "patterns", "system-prompt.md"]
}
```

### 2.14 — `packages/ai/system-prompt.md`

```markdown
# DS0 System Prompt

> Paste this into any AI tool to give it full knowledge of DS0.

You are working with DS0, an AI-native design system framework.

## Available Components

No components have been built yet. Check back after Phase 2.

## Token System

DS0 uses semantic design tokens. Never hardcode values.

- Colors: `primary`, `secondary`, `destructive`, `muted`, `accent`
- Every background color has a matching `-foreground` for text
- Spacing follows a 4px base unit scale
- Sizes come in `sm`, `md`, `lg`

## Recommendations

When asked to build UI, always:
1. Use DS0 components if available
2. Use semantic token classes (not raw Tailwind palette colors)
3. Follow WAI-ARIA patterns for accessibility
4. Use the `cn()` utility for conditional classes
```

### 2.15 — Placeholder `.gitkeep` files

Create these empty files to preserve directory structure:

```
packages/ai/manifests/.gitkeep
packages/ai/decision-trees/.gitkeep
packages/ai/patterns/.gitkeep
packages/tokens/css/.gitkeep
packages/tokens/tailwind/.gitkeep
packages/tokens/react-native/.gitkeep
packages/tokens/json/.gitkeep
components/react/.gitkeep
components/web/.gitkeep
components/native/.gitkeep
recipes/.gitkeep
docs/.gitkeep
```

---

## Section 3: Token Source Files

Create these files following the exact structure in `.ai/token-schema.md`.

### 3.01 — `tokens/_core/color.json`

Full color palette. Include: `white`, `black`, `gray` (50–950), `blue` (50–950), `red` (50–950), `green` (50–950), `amber` (50–950), `violet` (50–950), `indigo` (50–950), `cyan` (50–950), `teal` (50–950), `pink` (50–950), `orange` (50–950).

Every token must have `$type`, `$value`, and `$description`. See `token-schema.md` Section 3.1 for the exact format and first few colors.

### 3.02 — `tokens/_core/spacing.json`

Full spacing scale from `0` to `96`. See `token-schema.md` Section 3.2.

### 3.03 — `tokens/_core/typography.json`

Font families, weights, sizes, line heights, letter spacing. See `token-schema.md` Section 3.3.

### 3.04 — `tokens/_core/radius.json`

Full radius scale: `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`. See `token-schema.md` Section 3.4.

### 3.05 — `tokens/_core/elevation.json`

Shadow scale: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`. See `token-schema.md` Section 3.5.

### 3.06 — `tokens/_core/motion.json`

Duration scale and easing curves. See `token-schema.md` Section 3.6.

### 3.07 — `tokens/_semantic/color.json`

Semantic color mappings: `background`, `foreground`, `primary`, `secondary`, `accent`, `destructive`, `success`, `warning`, `muted`, `card`, `popover`, `border`, `input`, `ring`. Every background has a `-foreground` pair. See `token-schema.md` Section 4.1.

### 3.08 — `tokens/_semantic/spacing.json`

Density modes: `compact`, `comfortable`, `spacious`. See `token-schema.md` Section 4.2.

### 3.09 — `tokens/themes/default.json`

Default theme overrides. See `token-schema.md` Section 5.1.

### 3.10 — `tokens/themes/enterprise.json`

Enterprise theme overrides. See `token-schema.md` Section 5.2.

### 3.11 — `tokens/brands/_template.json`

Brand template. See `token-schema.md` Section 6.1.

---

## Section 4: Build Scripts

### 4.01 — `scripts/build-tokens.mjs`

```javascript
/**
 * DS0 Token Build Pipeline
 *
 * Reads source tokens from tokens/ directory
 * Uses StyleDictionary to generate:
 *   - CSS custom properties   → packages/tokens/css/variables.css
 *   - Tailwind preset         → packages/tokens/tailwind/preset.js
 *   - React Native tokens     → packages/tokens/react-native/tokens.js
 *   - Resolved JSON           → packages/tokens/json/resolved.json
 */

import StyleDictionary from 'style-dictionary';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const tokenSources = [
  `${ROOT}/tokens/_core/*.json`,
  `${ROOT}/tokens/_semantic/*.json`,
  `${ROOT}/tokens/themes/default.json`,
];

// --- CSS Custom Properties ---

const cssConfig = {
  source: tokenSources,
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'ds0',
      buildPath: `${ROOT}/packages/tokens/css/`,
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: { outputReferences: true },
        },
      ],
    },
  },
};

// --- Tailwind Preset ---

StyleDictionary.registerFormat({
  name: 'tailwind/preset',
  format: function ({ dictionary }) {
    const colors = {};
    const spacing = {};
    const borderRadius = {};
    const fontSize = {};
    const fontFamily = {};
    const fontWeight = {};
    const lineHeight = {};
    const letterSpacing = {};
    const transitionDuration = {};
    const transitionTimingFunction = {};

    dictionary.allTokens.forEach((token) => {
      const cssVar = `var(--ds0-${token.path.join('-')})`;

      if (token.path[0] === 'color' && token.path.length === 2) {
        colors[token.path[1]] = cssVar;
      } else if (token.path[0] === 'color' && token.path.length === 3) {
        const key = `${token.path[1]}-${token.path[2]}`;
        colors[key] = cssVar;
      }
      if (token.path[0] === 'spacing') spacing[token.path[1]] = cssVar;
      if (token.path[0] === 'radius') borderRadius[token.path[1]] = cssVar;
      if (token.path[0] === 'fontSize') fontSize[token.path[1]] = cssVar;
      if (token.path[0] === 'fontFamily') fontFamily[token.path[1]] = cssVar;
      if (token.path[0] === 'fontWeight') fontWeight[token.path[1]] = cssVar;
      if (token.path[0] === 'lineHeight') lineHeight[token.path[1]] = cssVar;
      if (token.path[0] === 'letterSpacing') letterSpacing[token.path[1]] = cssVar;
      if (token.path[0] === 'duration') transitionDuration[token.path[1]] = cssVar;
      if (token.path[0] === 'easing') transitionTimingFunction[token.path[1]] = cssVar;
    });

    const preset = {
      theme: {
        extend: {
          colors,
          spacing,
          borderRadius,
          fontSize,
          fontFamily,
          fontWeight,
          lineHeight,
          letterSpacing,
          transitionDuration,
          transitionTimingFunction,
        },
      },
    };

    return [
      '// AUTO-GENERATED by DS0 token pipeline — do not edit manually',
      '// Source: tokens/**/*.json → StyleDictionary → this file',
      '',
      '/** @type {import("tailwindcss").Config} */',
      `export default ${JSON.stringify(preset, null, 2)};`,
      '',
    ].join('\n');
  },
});

const tailwindConfig = {
  source: tokenSources,
  platforms: {
    tailwind: {
      transformGroup: 'js',
      buildPath: `${ROOT}/packages/tokens/tailwind/`,
      files: [
        {
          destination: 'preset.js',
          format: 'tailwind/preset',
        },
      ],
    },
  },
};

// --- React Native ---

const rnConfig = {
  source: tokenSources,
  platforms: {
    'react-native': {
      transformGroup: 'react-native',
      buildPath: `${ROOT}/packages/tokens/react-native/`,
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/module-flat',
        },
      ],
    },
  },
};

// --- Resolved JSON ---

const jsonConfig = {
  source: tokenSources,
  platforms: {
    json: {
      transformGroup: 'js',
      buildPath: `${ROOT}/packages/tokens/json/`,
      files: [
        {
          destination: 'resolved.json',
          format: 'json/flat',
        },
      ],
    },
  },
};

// --- Build ---

async function build() {
  console.log('\n🎨 DS0 Token Pipeline\n');

  try {
    const configs = [
      { name: 'CSS custom properties', config: cssConfig },
      { name: 'Tailwind preset', config: tailwindConfig },
      { name: 'React Native tokens', config: rnConfig },
      { name: 'Resolved JSON', config: jsonConfig },
    ];

    for (const { name, config } of configs) {
      console.log(`📦 Building ${name}...`);
      const sd = new StyleDictionary(config);
      await sd.buildAllPlatforms();
    }

    console.log('\n✅ All tokens built successfully!\n');
  } catch (error) {
    console.error('\n❌ Token build failed:', error.message);
    process.exit(1);
  }
}

build();
```

### 4.02 — `scripts/validate-manifests.mjs`

```javascript
/**
 * DS0 Manifest Validator
 *
 * Ensures every component manifest has all required fields.
 * Run via: pnpm validate:manifests
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const REQUIRED_FIELDS = [
  'name',
  'category',
  'description',
  'use_when',
  'do_not_use_when',
  'variants',
  'accessibility',
  'related_components',
];

async function validate() {
  console.log('\n🔍 DS0 Manifest Validator\n');

  const manifests = await glob('packages/ai/manifests/*.manifest.yaml', {
    cwd: ROOT,
  });

  if (manifests.length === 0) {
    console.log('ℹ️  No manifests found yet. This is expected before Phase 2.');
    return;
  }

  let hasErrors = false;

  for (const manifestPath of manifests) {
    const fullPath = join(ROOT, manifestPath);
    const content = readFileSync(fullPath, 'utf-8');
    const manifest = yaml.load(content);

    const missing = REQUIRED_FIELDS.filter((field) => !manifest[field]);

    if (missing.length > 0) {
      console.error(`❌ ${manifestPath}: Missing fields: ${missing.join(', ')}`);
      hasErrors = true;
    } else {
      console.log(`✅ ${manifestPath}`);
    }
  }

  if (hasErrors) {
    console.error('\n❌ Manifest validation failed');
    process.exit(1);
  } else {
    console.log('\n✅ All manifests valid!\n');
  }
}

validate();
```

---

## Section 5: Storybook Configuration

### 5.01 — `.storybook/main.ts`

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../components/react/**/*.stories.@(ts|tsx)',
    '../recipes/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
```

### 5.02 — `.storybook/preview.ts`

```typescript
import type { Preview } from '@storybook/react';

import '../packages/tokens/css/variables.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default preview;
```

---

## Section 6: GitHub Actions

### 6.01 — `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  validate:
    name: Validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build tokens
        run: pnpm build:tokens

      - name: Type check
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Validate manifests
        run: pnpm validate:manifests

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: validate
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build all packages
        run: pnpm build

      - name: Build Storybook
        run: pnpm storybook:build
```

---

## Section 7: Tailwind Config

### 7.01 — `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/react/**/*.{ts,tsx}',
    './recipes/**/*.{ts,tsx}',
    './docs/**/*.{ts,tsx,mdx}',
  ],
  // presets: [ds0Preset], // Uncomment after first token build
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

---

## Section 8: README

### 8.01 — `README.md`

```markdown
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

\```bash
git clone https://github.com/rwyatt2/ds0.git
cd ds0
pnpm install
pnpm build:tokens
pnpm storybook
\```

## Structure

\```
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
\```

## License

MIT © DS0 Contributors
```

---

## Section 9: Validation

After creating ALL files above, run these commands in order:

```bash
# 1. Install dependencies
pnpm install

# 2. Build tokens
pnpm build:tokens

# 3. Type check
pnpm typecheck

# 4. Lint
pnpm lint

# 5. Run tests
pnpm test
```

All 5 commands must pass with zero errors before Phase 1 is complete.

---

## Section 10: Dev Dependencies

Run at the repo root:

```bash
pnpm add -Dw typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import eslint-config-prettier prettier turbo tsup vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/react @types/react-dom react react-dom style-dictionary glob js-yaml @storybook/react-vite @storybook/addon-essentials @storybook/addon-a11y @storybook/addon-interactions storybook clsx tailwind-merge class-variance-authority tailwindcss postcss autoprefixer husky jest-axe @types/jest-axe
```
