# Component Spec: Label

## 1. Overview

**Name:** Label
**Category:** Typography
**Description:** Accessible label for form inputs, renders a label element with consistent styling.

## 2. Use Cases

### Use When
* Labeling a form input (TextField, Select, Checkbox, etc.)
* Providing accessible name for interactive elements

### Don't Use When
* General text content → use Text instead
* Headings → use Heading instead

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `htmlFor` | `string` | `—` | ID of the associated input element (required) |
| `required` | `boolean` | `false` | Shows required indicator (*) |
| `disabled` | `boolean` | `false` | Applies muted styling |
| `size` | `'sm' | 'md'` | `'md'` | Label size |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** implicit via native label element

### Requirements
* Always renders label element
* htmlFor must match the associated inputs id
* When required, shows visual indicator and screen-reader text

## 6. Related Components

| Component | Relationship |
|---|---|
| Text | For general text content |
| Heading | For headings and titles |
