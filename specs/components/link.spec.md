# Component Spec: Link

## 1. Overview

**Name:** Link
**Category:** Navigation
**Description:** An anchor element for navigating to a URL or page.

## 2. Use Cases

### Use When
* Navigating to another page or URL
* Inline text links

### Don't Use When
* Triggering an action → use Button

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|

| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** link (implicit via native <a>)

### Requirements
* External links add target="_blank" and rel="noopener noreferrer"
* External links include "(opens in new tab)" for screen readers

## 6. Related Components

| Component | Relationship |
|---|---|
| Button | Use for actions, not navigation |
