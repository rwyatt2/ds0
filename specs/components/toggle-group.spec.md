# Component Spec: ToggleGroup

## 1. Overview

**Name:** ToggleGroup
**Category:** Actions
**Description:** A set of two-state buttons where one or more can be toggled on, with shared visual styling.

## 2. Use Cases

### Use When
* Toolbar formatting options (bold, italic, underline)
* View mode switching (grid, list)
* Filter selection
* Alignment controls

### Don't Use When
* Navigation → use Tabs instead
* Radio selection without toggle-off → use RadioGroup
* Single toggle → use Toggle

## 3. Variants

| Variant | Intent | Example |
|---|---|---|
| `default` | Standard toggles without border | <ToggleGroup type='single'><ToggleGroup.Item value='a'>A</ToggleGroup.Item></ToggleGroup> |
| `outline` | Toggles with visible border | <ToggleGroup variant='outline' type='single'><ToggleGroup.Item value='a'>A</ToggleGroup.Item></ToggleGroup> |

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `'single' | 'multiple'` | `'single'` | Single or multiple selection |
| `variant` | `'default' | 'outline'` | `'default'` | Visual style |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | Size of all items |
| `orientation` | `'horizontal' | 'vertical'` | `'horizontal'` | Layout direction |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** group (container), radio or button (items)

### Requirements
* Roving tabindex
* aria-pressed or aria-checked on items
* role="group" on container

## 6. Related Components

| Component | Relationship |
|---|---|
| RadioGroup | When selection cannot be toggled off |
| Tabs | When switching between views/panels |
