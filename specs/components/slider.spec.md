# Component Spec: Slider

## 1. Overview

**Name:** Slider
**Category:** Data Input
**Description:** A draggable control for selecting a numeric value within a range.

## 2. Use Cases

### Use When
* Selecting a value within a defined range (volume, brightness, price)
* Approximate value matters more than precision

### Don't Use When
* Precise numeric input → use TextField type="number"
* Discrete named options → use RadioGroup or Select

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|

| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** slider

### Requirements
* aria-valuemin, aria-valuemax, aria-valuenow

## 6. Related Components

| Component | Relationship |
|---|---|
| TextField | Use with type="number" for precise input |
