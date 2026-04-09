# Component Spec: Toggle

## 1. Overview

**Name:** Toggle
**Category:** Actions
**Description:** A two-state button that can be on or off, like a standalone toggle in a toolbar.

## 2. Use Cases

### Use When
* Toggling a single boolean option with a button-like appearance
* Toolbar formatting buttons (bold, italic) as standalone buttons
* Muting/unmuting, bookmarking, favoriting

### Don't Use When
* On/off for a setting → use Switch (more semantically clear)
* Selecting one from a group → use ToggleGroup or RadioGroup
* Triggering a one-time action → use Button

## 3. Variants

| Variant | Intent | Example |
|---|---|---|
| `default` | Standard toggle with transparent background | <Toggle>Bold</Toggle> |
| `outline` | Toggle with visible border for more visual weight | <Toggle variant='outline'>Bold</Toggle> |

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `pressed` | `boolean` | `undefined` | Controlled pressed state |
| `defaultPressed` | `boolean` | `false` | Uncontrolled default pressed state |
| `onPressedChange` | `(pressed: boolean) => void` | `undefined` | Called when pressed state changes |
| `variant` | `'default' | 'outline'` | `'default'` | Visual style variant |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | Toggle size |
| `isDisabled` | `boolean` | `false` | Whether the toggle is disabled |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** button

### Requirements
* Must use aria-pressed="true" or "false"
* Must use aria-disabled="true" when disabled
* Must set data-state="on" or "off" for CSS targeting

## 6. Related Components

| Component | Relationship |
|---|---|
| Switch | Settings toggle with track+thumb visual |
| ToggleGroup | Multiple toggles in a group |
| Button | Non-toggle action |
