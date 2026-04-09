# Component Spec: AspectRatio

## 1. Overview

**Name:** AspectRatio
**Category:** Layout
**Description:** Constrains children to a specific width-to-height ratio.

## 2. Use Cases

### Use When
* Embedding images or videos at specific ratios (16:9, 4:3, 1:1)
* Maintaining consistent media proportions in layouts

### Don't Use When
* Free-form content with natural height → use standard layout

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|

| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** none (purely presentational)

### Requirements
* No ARIA attributes needed
* Children handle their own accessibility

## 6. Related Components

> See component documentation.
