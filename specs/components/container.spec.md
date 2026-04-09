# Component Spec: Container

## 1. Overview

**Name:** Container
**Category:** Layout
**Description:** Centers content with max-width and padding.

## 2. Use Cases

### Use When
* Page-level content wrapping

### Don't Use When
* Full-bleed backgrounds
* Nested layout → use Stack or Grid

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|

| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** Semantic HTML



## 6. Related Components

| Component | Relationship |
|---|---|
| Stack | For flex layouts |
| Grid | For grid layouts |
