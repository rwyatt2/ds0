# Component Spec: TextArea

## 1. Overview

**Name:** TextArea
**Category:** Data Input
**Description:** A multi-line text input for collecting longer-form content like comments, descriptions, or messages.

## 2. Use Cases

### Use When
* Multi-line text entry (comments, descriptions, bios, messages)
* Content that may span multiple paragraphs
* Feedback forms, support tickets

### Don't Use When
* Single-line input → use TextField instead
* Rich text with formatting → use a third-party editor

## 3. Variants

| Variant | Intent | Example |
|---|---|---|
| `size` | — | — |
| `resize` | — | — |

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `—` | Visible label text (required) |
| `rows` | `number` | `3` | Visible rows |
| `maxLength` | `number` | `—` | Maximum character count |
| `showCount` | `boolean` | `false` | Shows character count below |
| `resize` | `'none' | 'vertical' | 'horizontal' | 'both'` | `'vertical'` | Resize behavior |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** textbox (implicit via native <textarea> element)

### Requirements
* Same ARIA pattern as TextField

## 6. Related Components

| Component | Relationship |
|---|---|
| TextField | Single-line text input |
| Label | Used internally for the textarea label |
