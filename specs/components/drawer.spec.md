# Component Spec: Drawer

## 1. Overview

**Name:** Drawer
**Category:** Overlay
**Description:** A slide-out panel attached to an edge of the screen.

## 2. Use Cases

### Use When
* Navigation menus on mobile
* Side panel settings or filters
* Supplementary content that doesn't require full modal focus

### Don't Use When
* Confirming actions → use Dialog
* Brief contextual info → use Popover or Tooltip

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `—` | Controlled open state |
| `defaultOpen` | `boolean` | `false` | — |
| `onOpenChange` | `(open: boolean) => void` | `—` | — |
| `side` | `'left' | 'right' | 'top' | 'bottom'` | `'right'` | — |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** dialog



## 6. Related Components

| Component | Relationship |
|---|---|
| Dialog | Use for centered modal overlays |
| Popover | Use for non-modal contextual content |
