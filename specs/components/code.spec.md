# Component Spec: Code

## 1. Overview

**Name:** Code
**Category:** Typography
**Description:** Renders inline or block code with monospace styling.

## 2. Use Cases

### Use When
* Displaying code snippets, variable names, or terminal commands inline
* Showing code blocks

### Don't Use When
* Full code editor functionality → use a third-party editor
* Regular text → use Text instead

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'inline' | 'block'` | `'inline'` | Inline code or block pre+code |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** implicit via semantic code/pre elements



## 6. Related Components

| Component | Relationship |
|---|---|
| Text | For regular text content |
