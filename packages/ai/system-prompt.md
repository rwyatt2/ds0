# DS0 System Prompt

> Paste this into any AI tool to give it full knowledge of DS0.

You are working with **DS0**, an AI-native design system framework built on React, Tailwind CSS, and W3C design tokens.

## Available Components (39)

Import from `@ds0/primitives`:

```tsx
import { Button, Card, Stack, TextField } from '@ds0/primitives';
```

### Actions
| Component | Description |
|-----------|-------------|
| `Button` | Primary action trigger. Variants: `primary`, `secondary`, `destructive`, `ghost`, `outline`. Sizes: `sm`, `md`, `lg`. |
| `IconButton` | Icon-only button with required `aria-label`. |
| `Toggle` | A two-state button (pressed/unpressed). |
| `ToggleGroup` | A group of toggles where one or multiple can be selected. |

### Data Display
| Component | Description |
|-----------|-------------|
| `Accordion` | Collapsible content sections. Compound: `Accordion.Item`, `.Trigger`, `.Content`. |
| `Avatar` | User avatar with image + fallback. `Avatar.Image`, `.Fallback`. |
| `Badge` | Status indicator label. Variants: `default`, `secondary`, `destructive`, `outline`. |
| `Card` | Container for grouped content. Compound: `Card.Header`, `.Title`, `.Description`, `.Content`, `.Footer`. |
| `Table` | Data table. Compound: `Table.Header`, `.Body`, `.Row`, `.Head`, `.Cell`. |

### Data Input
| Component | Description |
|-----------|-------------|
| `Checkbox` | Binary/indeterminate check input. |
| `Form` | Form wrapper with validation. Compound: `Form.Field`, `.Label`, `.Control`, `.Message`. |
| `RadioGroup` | Single-select from multiple options. `RadioGroup.Item`. |
| `Select` | Dropdown selection. `Select.Trigger`, `.Content`, `.Item`. |
| `Slider` | Numeric range input. |
| `Switch` | On/off toggle switch. |
| `TextArea` | Multi-line text input. |
| `TextField` | Single-line text input with label, error, description support. |

### Feedback
| Component | Description |
|-----------|-------------|
| `Alert` | Inline message. Variants: `default`, `destructive`. `Alert.Title`, `.Description`. |
| `Progress` | Determinate/indeterminate progress bar. |
| `Skeleton` | Loading placeholder. |
| `Spinner` | Animated loading indicator. Sizes: `sm`, `md`, `lg`. |
| `Toast` | Temporary notification. Use `useToast()` hook. |

### Layout
| Component | Description |
|-----------|-------------|
| `AspectRatio` | Constrains child to an aspect ratio. |
| `Container` | Max-width centered wrapper. |
| `Divider` | Horizontal/vertical separator. |
| `Grid` | CSS grid layout helper. |
| `Stack` | Flex layout. `direction="horizontal"` or `"vertical"`. `gap`, `align`, `justify`. |

### Navigation
| Component | Description |
|-----------|-------------|
| `Breadcrumb` | Breadcrumb trail. `Breadcrumb.List`, `.Item`, `.Link`, `.Separator`. |
| `Link` | Anchor element with variants. |
| `Pagination` | Page navigation with previous/next + page numbers. |
| `Tabs` | Tabbed content. `Tabs.List`, `.Trigger`, `.Content`. |

### Overlay
| Component | Description |
|-----------|-------------|
| `Dialog` | Modal dialog. `Dialog.Trigger`, `.Content`, `.Header`, `.Footer`, `.Close`. |
| `Drawer` | Slide-out panel. Same compound API as Dialog. |
| `Popover` | Floating content anchored to trigger. `Popover.Trigger`, `.Content`. |
| `Tooltip` | Hover/focus hint. `Tooltip.Trigger`, `.Content`. |

### Typography
| Component | Description |
|-----------|-------------|
| `Code` | Inline code display. |
| `Heading` | Semantic heading (h1–h6). `level` prop controls element and styling. |
| `Label` | Form label with `htmlFor` support. |
| `Text` | Body text. `size`, `color`, `weight`, `as` props. |

## Token System

DS0 uses **semantic design tokens** in W3C DTCG format. Never hardcode color/spacing values.

- **Colors**: `primary`, `secondary`, `destructive`, `muted`, `accent`, `success`, `warning`. Each has a `-foreground` counterpart for text.
- **Surfaces**: `background`, `foreground`, `card`, `popover`, `border`, `input`, `ring`.
- **Spacing**: 4px base unit scale (0–96 + `px`).
- **Radius**: `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`, `component`.
- **Typography**: `fontFamily` (sans, mono), `fontSize` (xs–6xl), `fontWeight` (regular–bold), `lineHeight`, `letterSpacing`.
- **Motion**: `duration` (instant–slowest), `easing` (linear, ease-in, ease-out, ease-in-out, spring).

Use Tailwind classes: `bg-primary`, `text-primary-foreground`, `rounded-lg`, `gap-4`, etc.

## Utility

```tsx
import { cn } from '@ds0/primitives';

// Merge classes conditionally
<Button className={cn('w-full', isCompact && 'h-8')} />
```

## Common Patterns

**Card with form:**
```tsx
<Card>
  <Card.Header>
    <Card.Title>Sign In</Card.Title>
  </Card.Header>
  <Card.Content>
    <Stack gap="4">
      <TextField label="Email" type="email" />
      <TextField label="Password" type="password" />
      <Button className="w-full">Sign In</Button>
    </Stack>
  </Card.Content>
</Card>
```

## Rules

1. Always use DS0 components — never create raw `<button>`, `<input>`, etc.
2. Use semantic token classes (`bg-primary`) — never raw Tailwind palette (`bg-blue-600`).
3. Follow WAI-ARIA patterns. All components are accessible by default.
4. Use `cn()` for conditional class merging.
5. Compound components use dot notation: `Card.Header`, `Dialog.Content`, etc.
