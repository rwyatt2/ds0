# Component Spec: Spinner

## 1. Overview

**Name:** Spinner
**Category:** Feedback
**Description:** Animated loading indicator.

## 2. Use Cases

### Use When
* Content is loading
* Action is processing

### Don't Use When
* Can show progress percentage → use Progress
* Known shape → use Skeleton

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
| Skeleton | When loading area shape is known |
