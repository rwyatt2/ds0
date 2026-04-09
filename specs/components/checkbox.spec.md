# Component Spec: Checkbox

## 1. Overview

**Name:** Checkbox
**Category:** Data Input
**Description:** A toggle control that allows the user to select or deselect an option.

## 2. Use Cases

### Use When
* Selecting one or more items from a list
* Toggling a single boolean option (agree to terms, remember me)
* Multi-select scenarios

### Don't Use When
* Selecting one option from mutually exclusive choices → use RadioGroup instead
* On/off toggle with immediate effect → use Switch instead
* Selecting from many options with search → use Select with multi-select

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|

| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** checkbox (implicit via native <input type="checkbox">)

### Requirements
* aria-checked set to mixed for indeterminate
* WAI-ARIA checkbox pattern

## 6. Related Components

| Component | Relationship |
|---|---|
| Switch | Immediate on/off toggle |
| RadioGroup | Single selection from mutually exclusive options |
