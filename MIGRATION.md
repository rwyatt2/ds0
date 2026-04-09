# Migration Guide

This guide covers breaking changes and upgrade steps between DS0 versions.

---

## v0.1.0 (Current)

**Initial release.** This is the baseline version of DS0.

### Component API

All components follow the four-layer anatomy:
1. **Types** (`@ds0/primitives`) — TypeScript interfaces
2. **Behavior** (`@ds0/primitives`) — Headless hooks (`useButton`, `useDialog`, etc.)
3. **Design Tokens** (`@ds0/tokens`) — CSS custom properties
4. **Styled Components** (`components/react/`) — Final, styled React components

### Import Paths

```tsx
// Styled components
import { Button } from '@/components/react/button/Button';

// Headless primitives
import { useButton, cn, Slot } from '@ds0/primitives';

// Tokens
import '@ds0/tokens/css';
import '@ds0/tokens/css/dark-mode.css';
```

### Breaking Changes from Pre-Release

| Change | Before | After |
|--------|--------|-------|
| Button disabled | `disabled` | `isDisabled` |
| Alert variants | `variant="error"` | `variant="destructive"` |
| Drawer sub-components | `Drawer.Header` (missing) | `Drawer.Header` (added) |
| Error messages | Context-only strings | DS0-prefixed with doc URLs |
| Tooltip API | Shorthand `content={}` | Compound `<Tooltip.Content>` |

### Upgrade Steps

1. Update all `disabled` props to `isDisabled` on Button, IconButton
2. Update `variant="error"` to `variant="destructive"` on Alert
3. Update Tooltip to use compound API: `<Tooltip.Trigger>` + `<Tooltip.Content>`
4. Run `ds0 doctor` to validate your setup
5. Run `pnpm typecheck` to catch any remaining API mismatches

---

## Future Versions

Migration steps for future versions will be documented here as they are released.

> **Tip:** Run `ds0 doctor` after upgrading to automatically check for common migration issues.
