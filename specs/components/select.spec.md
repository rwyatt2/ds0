# Component Spec: Select

## 1. Overview

**Name:** Select
**Category:** Data Input
**Description:** A dropdown menu for selecting a single option from a list.

## 2. Use Cases

### Use When
* 6+ mutually exclusive options
* Space is limited
* Options don't need to be visible simultaneously

### Don't Use When
* 2-5 options all visible → use RadioGroup
* Multi-select → use Combobox
* Navigation → use DropdownMenu

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|

| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** combobox (trigger) / listbox (content) / option (items)



## 6. Related Components

| Component | Relationship |
|---|---|
| RadioGroup | Use for 2-5 always-visible options |
| Combobox | Use for searchable/filterable select |
