# Component Spec: IconButton

## 1. Overview

**Name:** IconButton
**Category:** Actions
**Description:** A button containing only an icon, with an accessible label.

## 2. Use Cases

### Use When
* Action can be represented by a universally understood icon
* Space is limited (toolbars, table rows)

### Don't Use When
* The action is ambiguous without text → use Button

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | `—` | The icon element (required) |
| `aria-label` | `string` | `—` | Accessible name (REQUIRED) |
| `variant` | `'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline'` | `'ghost'` | — |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | — |
| `isLoading` | `boolean` | `false` | — |
| `isDisabled` | `boolean` | `false` | — |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** button

### Requirements
* aria-label is REQUIRED for icon-only buttons

## 6. Related Components

| Component | Relationship |
|---|---|
| Button | When text label is needed alongside or instead of icon |
