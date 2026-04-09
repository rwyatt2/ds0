# Component Spec: Accordion

## 1. Overview

**Name:** Accordion
**Category:** Data Display
**Description:** A vertically stacked set of collapsible sections, each with a trigger that expands/collapses its content.

## 2. Use Cases

### Use When
* FAQ sections
* Settings or configuration panels with many sections
* Reducing visual complexity by hiding optional content
* Progressive disclosure of information

### Don't Use When
* Only one section visible at a time AND it's navigation → use Tabs instead
* Two-pane layout → use a layout component instead
* Content should always be visible → don't hide it

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `'single' | 'multiple'` | `'single'` | Single or multiple items open at once |
| `value` | `string | string[]` | `undefined` | Controlled expanded value(s) |
| `defaultValue` | `string | string[]` | `undefined` | Uncontrolled default expanded value(s) |
| `collapsible` | `boolean` | `true` | Whether all items can be closed (single mode only) |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** region (content), button (trigger)

### Requirements
* aria-expanded on triggers
* aria-controls linking trigger to content
* role="region" on content with aria-labelledby

## 6. Related Components

| Component | Relationship |
|---|---|
| Tabs | When switching between views (mutually exclusive, navigation-style) |
