# Component Spec: Skeleton

## 1. Overview

**Name:** Skeleton
**Category:** Feedback
**Description:** Placeholder that mimics content shape while loading.

## 2. Use Cases

### Use When
* Loading content with known layout

### Don't Use When
* Unknown shape → use Spinner

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
| Spinner | When content shape is unknown |
