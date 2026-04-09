# Component Spec: Progress

## 1. Overview

**Name:** Progress
**Category:** Feedback
**Description:** A visual bar indicating the completion status of a task or process.

## 2. Use Cases

### Use When
* File uploads and downloads
* Form completion percentage
* Step completion in a multi-step process
* Loading with a known percentage

### Don't Use When
* Unknown duration loading → use Spinner
* Placeholder for loading content → use Skeleton

## 3. Variants

| Variant | Intent | Example |
|---|---|---|
| `default` | Standard primary color progress bar | <Progress value={50} /> |
| `success` | Indicates successful completion or target met | <Progress value={100} variant='success' /> |
| `warning` | Indicates approaching a limit or warning threshold | <Progress value={80} variant='warning' /> |
| `destructive` | Indicates critical usage or error state | <Progress value={90} variant='destructive' /> |

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Current value (0 to max) |
| `max` | `number` | `100` | Maximum value |
| `label` | `string` | `undefined` | Accessible label |
| `showValue` | `boolean` | `false` | Display percentage text |
| `variant` | `'default' | 'success' | 'warning' | 'destructive'` | `'default'` | Color variant |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | Bar thickness |
| `indeterminate` | `boolean` | `false` | Unknown progress (animated) |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** progressbar

### Requirements
* Must use role="progressbar"
* Must set aria-valuenow (omit for indeterminate)
* Must set aria-valuemin=0 and aria-valuemax
* Must set aria-valuetext with human-readable value
* Must set aria-label for accessible name

## 6. Related Components

| Component | Relationship |
|---|---|
| Spinner | Unknown duration loading indicator |
| Skeleton | Placeholder for loading content |
