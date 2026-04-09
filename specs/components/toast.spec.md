# Component Spec: Toast

## 1. Overview

**Name:** Toast
**Category:** Feedback
**Description:** A temporary, non-blocking notification that appears at the edge of the screen and auto-dismisses.

## 2. Use Cases

### Use When
* Confirming a completed action (saved, sent, copied)
* Reporting non-critical errors that will retry
* Providing undo opportunities

### Don't Use When
* Critical errors requiring action → use Alert or Dialog
* Inline form validation → use form field error messages
* Persistent status indicators → use Badge or Banner

## 3. Variants

> No named variants.

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `undefined` | Toast title text |
| `description` | `string` | `undefined` | Toast description text |
| `variant` | `'default' | 'success' | 'warning' | 'destructive'` | `'default'` | Visual variant |
| `duration` | `number` | `5000` | Auto-dismiss in ms (0 = persistent) |
| `action` | `ReactNode` | `undefined` | Optional action element |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** status

### Requirements
* Must use role="status" with aria-live="polite"
* Must set aria-atomic="true"
* Close button must have aria-label

## 6. Related Components

| Component | Relationship |
|---|---|
| Alert | Persistent, inline (in-page) notifications |
| Dialog | Critical actions requiring confirmation |
