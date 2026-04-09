# Component Spec: Tooltip

## 1. Overview

**Name:** Tooltip
**Category:** Overlay
**Description:** A brief text label that appears on hover or focus.

## 2. Use Cases

### Use When
* Providing additional context for an icon or truncated text
* Brief, non-interactive information

### Don't Use When
* Rich interactive content → use Popover
* Forms or confirmations → use Dialog

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|

| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** tooltip



## 6. Related Components

| Component | Relationship |
|---|---|
| Popover | Use for rich interactive content |
