# Component Spec: Popover

## 1. Overview

**Name:** Popover
**Category:** Overlay
**Description:** A non-modal overlay anchored to a trigger, for contextual content.

## 2. Use Cases

### Use When
* Showing additional info without leaving the page
* Rich interactive content triggered by click

### Don't Use When
* Brief label-like info → use Tooltip
* Blocking interaction → use Dialog

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
| Tooltip | Use for brief, non-interactive info |
| Dialog | Use for modal, blocking overlay |
