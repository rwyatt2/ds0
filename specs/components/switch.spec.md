# Component Spec: Switch

## 1. Overview

**Name:** Switch
**Category:** Data Input
**Description:** A toggle control for settings that take immediate effect, like enabling/disabling a feature.

## 2. Use Cases

### Use When
* On/off toggles that take immediate effect
* Settings, preferences, feature flags

### Don't Use When
* Change doesn't take effect until form submission → use Checkbox
* Selecting from multiple options → use RadioGroup or Select

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|

| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** switch

### Requirements
* role="switch" on button element
* aria-checked reflects current state

## 6. Related Components

| Component | Relationship |
|---|---|
| Checkbox | Use when change requires form submission |
