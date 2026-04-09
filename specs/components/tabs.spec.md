# Component Spec: Tabs

## 1. Overview

**Name:** Tabs
**Category:** Navigation
**Description:** Organizes content into multiple panels, with only one panel visible at a time, selected via a tab list.

## 2. Use Cases

### Use When
* Switching between related views within the same context
* Organizing settings, configuration, or detail panels
* Showing different facets of the same data (overview, details, activity)

### Don't Use When
* Sequential steps → use a Stepper instead
* Independent pages → use navigation/routing instead
* Accordion-style expand/collapse → use Accordion instead
* Only 1 or 2 sections → probably don't need Tabs

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `undefined` | Controlled active tab value |
| `defaultValue` | `string` | `undefined` | Default active tab (required if uncontrolled) |
| `onValueChange` | `(value: string) => void` | `undefined` | Change handler called when active tab changes |
| `orientation` | `'horizontal' | 'vertical'` | `'horizontal'` | Tab list direction |
| `activationMode` | `'automatic' | 'manual'` | `'automatic'` | Auto-activate on arrow key, or require Enter/Space |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** tablist (container), tab (trigger), tabpanel (content)

### Requirements
* Roving tabindex on triggers
* aria-selected on active trigger
* aria-controls linking trigger to panel

## 6. Related Components

| Component | Relationship |
|---|---|
| Accordion | Multiple sections expandable, not mutually exclusive |
| Navigation | When tabs represent separate pages |
