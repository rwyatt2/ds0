# DS0 Quick Start Guide

> **Get from zero to rendering your first DS0 component in under 5 minutes.**

---

## 1. Clone & Install

```bash
git clone https://github.com/rwyatt2/ds0.git
cd ds0
pnpm install
```

> **Prerequisites:** Node.js ≥ 20.0.0 and pnpm ≥ 9.0.0. See `.nvmrc` for the exact Node version.

---

## 2. Build Tokens

DS0 uses a **W3C DTCG token pipeline** powered by StyleDictionary. Before anything else, generate the compiled tokens:

```bash
pnpm build:tokens
```

This produces:

| Output | Location |
|--------|----------|
| CSS custom properties | `packages/tokens/css/variables.css` |
| Tailwind preset | `packages/tokens/tailwind/preset.js` |
| React Native tokens | `packages/tokens/react-native/tokens.js` |
| Resolved JSON | `packages/tokens/json/resolved.json` |

---

## 3. Render Your First Component

### Create a simple page using DS0's Button:

```tsx
import { Button } from '@/components/react/button/Button';

export default function App() {
    return (
        <div style={{ padding: '2rem' }}>
            <Button variant="primary" size="md" onClick={() => alert('DS0!')}>
                Hello DS0
            </Button>
        </div>
    );
}
```

### Import Patterns

DS0 components are imported directly from their directory:

```tsx
// Styled React components — these are what you use in your app
import { Button } from '@/components/react/button/Button';
import { Card } from '@/components/react/card/Card';
import { Dialog } from '@/components/react/dialog/Dialog';

// Headless primitives — use these if you need custom styling
import { ButtonPrimitive } from '@ds0/primitives';
import { useButton } from '@ds0/primitives';

// Tokens — use these for consistent design values
import '@ds0/tokens/css';  // CSS custom properties
```

---

## 4. Add Icons

DS0 uses [Lucide React](https://lucide.dev/) as its recommended icon library:

```bash
pnpm add lucide-react
```

Use icons with any component that accepts `leftIcon` / `rightIcon` props:

```tsx
import { Button } from '@/components/react/button/Button';
import { Plus, ArrowRight } from 'lucide-react';

<Button leftIcon={<Plus size={16} />}>Add Item</Button>
<Button rightIcon={<ArrowRight size={16} />} variant="secondary">Next</Button>
```

For icon-only buttons, use `IconButton`:

```tsx
import { IconButton } from '@/components/react/icon-button/IconButton';
import { X } from 'lucide-react';

<IconButton icon={<X size={16} />} aria-label="Close dialog" />
```

---

## 5. Launch Storybook

Explore all 39 components visually:

```bash
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) in your browser.

---

## 6. Validate Your Setup

Run the full validation suite to confirm everything works:

```bash
pnpm validate
```

This runs `typecheck`, `lint`, and `test` in sequence. All three must pass ✅

---

## Next Steps

| Resource | Description |
|----------|-------------|
| [README.md](README.md) | Full project overview, architecture, and component list |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to add components and submit PRs |
| [.ai/ARCHITECTURE.md](.ai/ARCHITECTURE.md) | Layered architecture deep-dive |
| [.ai/CONVENTIONS.md](.ai/CONVENTIONS.md) | Naming and coding conventions |
| [.ai/component-anatomy.md](.ai/component-anatomy.md) | Component structure patterns |

---

## Troubleshooting

### `pnpm build:tokens` fails

Make sure you have the latest dependencies:

```bash
pnpm install
```

### TypeScript errors in your editor

DS0 uses `tsconfig.base.json` with path aliases. Ensure your editor uses the workspace TypeScript version:

1. Open VS Code settings
2. Set `typescript.tsdk` to `node_modules/typescript/lib`

### Missing component styles

Import the token CSS at the root of your app:

```tsx
import '@ds0/tokens/css';
```
