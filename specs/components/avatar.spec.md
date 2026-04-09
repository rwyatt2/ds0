# Component Spec: Avatar

## 1. Overview

**Name:** Avatar
**Category:** Data Display
**Description:** Displays a user's profile image, initials, or a fallback icon.

## 2. Use Cases

### Use When
* User profiles, comments, chat messages
* Team member lists

### Don't Use When
* Generic images → use <img> directly

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|

| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** img (when showing fallback)

### Requirements
* alt text on <img>
* aria-label on container when showing fallback

## 6. Related Components

> See component documentation.
